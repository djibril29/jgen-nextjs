# Newsletter semestrielle — Janvier à juin 2026

Cette newsletter existe sous deux formes, alimentées par **un seul fichier de contenu** :

| Forme | Fichier | Adresse |
|---|---|---|
| Page web complète | `app/newsletter/semestre-1-2026/page.tsx` | `/newsletter/semestre-1-2026` |
| E-mail (Mailchimp) | `emails/newsletter-semestre-1-2026.tsx` | `generated-emails/newsletter-semestre-1-2026.html` |

> **Le contenu ne se modifie qu'à un seul endroit :**
> `content/newsletter-semestre-1-2026.ts`.
> La page, le template e-mail et le script y puisent tous. Ne recopiez jamais un
> texte éditorial dans un composant.

---

## 1. Lancer la page web

```bash
npm run dev
```

Puis ouvrez **http://localhost:3000/newsletter/semestre-1-2026**

La page est statique : elle ne fait aucun appel à Sanity et se pré-rend au build.

Elle est aussi accessible depuis le menu du site : **Actualités → Newsletter semestrielle**.

## 2. Prévisualiser le template e-mail

```bash
npm run email:dev
```

Puis ouvrez **http://localhost:3001** et choisissez `newsletter-semestre-1-2026`.

Le port 3001 a été retenu parce qu'aucun script du projet ne l'utilise
(`npm run dev` occupe le 3000).

> **Si le port 3001 est déjà pris** (un second serveur Next, par exemple),
> React Email bascule automatiquement sur le port libre suivant et l'annonce dans
> la console :
> `⚠ Port 3001 is already in use, trying 3002` puis
> `Running preview at: http://localhost:3002`.
> **Fiez-vous toujours à l'URL affichée dans la console.**

L'aperçu se recharge à chaque enregistrement et propose des vues bureau et mobile.

### Ce que contient l'e-mail

L'e-mail reprend le déroulé de la page web, en plus court :

1. en-tête, titre, introduction et bouton principal ;
2. visuel de couverture (zone `hero_image`, remplaçable dans Mailchimp) ;
3. les cinq chiffres clés marqués `inEmail: true` ;
4. **les activités du semestre** — les quatre axes d'intervention, et sous chacun
   d'eux **chaque projet** : une photographie, sa légende, le territoire couvert,
   un résumé de deux ou trois phrases (`emailSummary`) et **un bouton vers la page
   du programme** (`programHref`) ;
5. **les temps forts** — même principe, refermés par un lien vers la section
   correspondante de la page web ;
6. rappel vers le bilan complet et vers `/programs`, mot de conclusion, pied de page.

Une même photographie n'est jamais utilisée deux fois : le cliché du 8 mars sert
de couverture, le temps fort correspondant s'ouvre donc sans image. Un projet
sans photographie s'ouvre sur un bandeau typographique portant son nom (voir §6).

## 3. Générer le HTML pour Mailchimp

```bash
npm run email:generate
```

Le script produit deux fichiers :

```
generated-emails/newsletter-semestre-1-2026.html   ← à coller dans Mailchimp
generated-emails/newsletter-semestre-1-2026.txt    ← version texte brut
```

Il enchaîne : rendu → mise en forme → conversion des zones éditables →
**validation stricte** → écriture.

**Si la validation échoue, aucun fichier n'est écrit** et le script se termine
avec un code de sortie non nul, en listant précisément les problèmes.

Le script refuse notamment un HTML qui contiendrait `localhost`, `127.0.0.1`,
`/_next/`, une balise `<script>`, un `data-mc-edit` non converti, un chemin
relatif (`src="/…"` ou `href="/…"`), une URL `TODO_URL` ou un lien vide. Il
vérifie aussi la présence du doctype, du `<title>`, du preheader, du lien vers la
page complète, des quatre merge tags Mailchimp et des cinq zones `mc:edit`
(présentes **et** uniques).

Les fonctions de transformation et de validation sont isolées dans
`scripts/newsletter-html.ts` afin de rester importables et testables sans
déclencher de rendu.

### Poids du HTML

Le script affiche le poids du fichier produit et **refuse de l'écrire au-delà de
102 ko**, seuil à partir duquel Gmail tronque le message et masque tout ce qui
suit — dont le lien de désabonnement. Un avertissement apparaît dès 80 % de cette
limite : Mailchimp allonge encore les liens en y ajoutant son suivi, il faut donc
garder de la marge. L'e-mail actuel pèse environ 55 ko.

Ce poids ne concerne que le HTML. Les photographies, elles, sont chargées depuis
le site au moment de l'ouverture (voir §6 sur leur compression).

---

## 4. Mode opératoire Mailchimp (« Paste in Code »)

1. Exécuter `npm run email:generate`.
2. Ouvrir `generated-emails/newsletter-semestre-1-2026.html`.
3. **Sélectionner tout le contenu** du fichier et le copier
   (`Cmd+A` puis `Cmd+C`).
4. Dans Mailchimp : *Campaigns → Create → Email → Regular*, choisir l'audience,
   puis à l'étape *Content* sélectionner **Code your own → Paste in code**.
5. Coller l'intégralité du HTML dans l'éditeur, en remplaçant le contenu par défaut.
6. **Enregistrer** (*Save & Close*).
7. Vérifier l'**aperçu ordinateur** et l'**aperçu mobile** (*Preview → Enter preview mode*).
8. Envoyer un **e-mail de test** (*Preview → Send a test email*).
9. Contrôler la réception sur **Gmail**, **Outlook** et **un téléphone**.
10. Cliquer sur **tous les liens** un par un.
11. Vérifier le **lien de désabonnement** et celui des préférences.
12. Vérifier l'affichage des **images** (voir §6 : le site doit être déployé).
13. Vérifier que l'**adresse physique** de l'organisation s'affiche bien en pied de page.

### Zones modifiables depuis Mailchimp

Cinq blocs restent éditables directement dans l'interface Mailchimp, sans
repasser par le code :

| `mc:edit` | Contenu |
|---|---|
| `hero_title` | Titre principal |
| `hero_intro` | Introduction |
| `hero_image` | Emplacement du visuel principal |
| `main_cta` | Texte du bouton d'appel à l'action |
| `editorial_footer` | Conclusion éditoriale |

Attention : une modification faite dans Mailchimp **n'est pas répercutée dans le
dépôt**. Pour un changement durable, modifiez `content/newsletter-semestre-1-2026.ts`
puis régénérez.

### Merge tags utilisés

`*|ARCHIVE|*` (version navigateur) · `*|UPDATE_PROFILE|*` (préférences) ·
`*|UNSUB|*` (désabonnement) · `*|HTML:LIST_ADDRESS_HTML|*` (adresse postale).

`*|FNAME|*` n'est **volontairement pas utilisé** : la salutation est générique
(« Chères partenaires, chers partenaires, »), afin de ne jamais produire un
« Bonjour , » disgracieux pour les contacts sans prénom renseigné.

---

## 5. Modifier les contenus

Tout se passe dans **`content/newsletter-semestre-1-2026.ts`**.

| Ce que vous voulez changer | Clé à modifier |
|---|---|
| Titre, surtitre, période | `header` |
| Introduction (page longue / e-mail court) | `intro.web` / `intro.email` |
| Chiffres clés | `statistics` — `inEmail: true` retient le chiffre dans l'e-mail |
| Grandes orientations | `orientations` |
| Axes d'intervention | `axes` |
| Projets et réalisations | `projects` (constante en haut du fichier) |
| Temps forts | `highlights` |
| Chronologie | `timeline` |
| Enseignements / perspectives | `lessons` / `perspectives` |
| Conclusion | `conclusion` |
| Libellés des boutons | `cta` |
| Coordonnées, réseaux sociaux | `organisation` |
| Métadonnées SEO | `meta` |

Après toute modification touchant l'e-mail : **relancer `npm run email:generate`**.

Deux garde-fous éditoriaux à préserver :

- Les réalisations du **premier** et du **deuxième** trimestre restent séparées
  (`achievements[].period`). Ne les fusionnez pas.
- Les **120 bénéficiaires** de Liggeyal Ëlëg sont une **cible**, exportée à part
  (`LIGGEYAL_ELEG_TARGET`) et jamais comptée parmi les chiffres clés. Aucun
  « total de bénéficiaires » n'est calculé en additionnant des données hétérogènes.

---

## 6. Remplacer ou ajouter les images

### Où déposer les fichiers

Le dossier actuellement utilisé est **`public/newsletters/semestre-1/`**.

Le résolveur lit et **fusionne** tous les dossiers de cette liste (par ordre de
priorité), de sorte qu'aucune variante de nommage ne fasse disparaître un visuel :

```
public/newsletters/semestre-1/          ← dossier en place aujourd'hui
public/newsletters/semestre-1-2026/
public/newsletter/semestre-1/
public/newsletter/semestre-1-2026/
public/newsletters/
public/newsletter/
```

### L'extension n'a pas d'importance

Le résolveur (`lib/newsletter-image.ts`) identifie les visuels par leur **nom de
base** et accepte `.jpg`, `.jpeg`, `.png`, `.webp` et `.avif`, sans tenir compte
de la casse. Déposer `cover.png`, `cover.jpg` ou `Cover.JPEG` produit le même
résultat, **sans aucune modification de code**.

### État des visuels

Une photographie par activité est reprise dans l'e-mail. Le nom de base indiqué
est celui du champ `image.name` correspondant, dans le fichier de contenu.

| Nom de base | Visuel | Repris dans l'e-mail |
|---|---|---|
| `8mars` | Couverture + image de partage (Open Graph) | ✅ en couverture |
| `elles-aussi` | Cercles de guérison, Niakhar (**ELLES AUSSI**) | ⬜ **à fournir** |
| `kiiray` | Lancement officiel du programme (**KIIRAY**) | ✅ |
| `pas-a-pas` | Formation des jeunes leaders aux DSSR (**PAS À PAS**) | ✅ |
| `jvssr1` | Cercle de sororité, Yoff (**JVSSR**) | ✅ |
| `euleug` | Formation aux métiers d'un GIE (**Liggeyal Ëlëg**) | ✅ |
| `naatal1` | Rassemblement communautaire (**Naatal Jaboot Gui**) | ✅ |
| `assises1` | Réunion d'orientation (**Assises**) | ✅ (média secondaire) |
| `copil` | Comité de pilotage (**Assises nationales citoyennes**) | ✅ |
| `beijing30` | Atelier de restitution du rapport Beijing +30 | ✅ |
| `atelier-defenseurs-saly` | Atelier des défenseur·e·s, Saly | ⬜ **à fournir** |
| `bejenugox`, `kiiray1`, `pas-a-pas2`, `pas-a-pas3`, `perception`, `cercles`, `patisserie`, `codefamille` | Visuels secondaires | Page web uniquement |
| `bajenugox2`, `jvssr2` | Doublons | 🟡 en réserve, référencés nulle part |

Deux visuels manquent donc encore : sans eux, **ELLES AUSSI** s'ouvre sur un
bandeau typographique et le temps fort de Saly sur un simple filet jaune. Déposer
`elles-aussi.jpg` et `atelier-defenseurs-saly.jpg` suffit à les illustrer, sans
aucune modification de code.

`npm run email:generate` affiche à chaque exécution la liste à jour des visuels
manquants **et** des fichiers présents que plus aucun contenu ne référence
(utile pour repérer une faute de frappe dans un nom de fichier).

Ces noms sont **modifiables** : ils se changent en une ligne dans le champ
`image.name` du projet ou du temps fort concerné, dans le fichier de contenu.

> ⚠️ **À confirmer :** `bejenugox` a été rattaché à **KIIRAY** (atelier national du
> T2 sur le rôle des Bajenu Gox). Les Bajenu Gox interviennent aussi comme
> association encadrante dans **Liggeyal Ëlëg** — à arbitrer par J-GEN.

> 💡 **Poids des fichiers :** pensez à compresser les visuels avant dépôt. La page
> web les optimise automatiquement via `next/image`, mais **l'e-mail utilise le
> fichier d'origine**. Les huit photographies de l'e-mail pèsent aujourd'hui
> environ 1,5 Mo au total : les compresser sous 150 Ko chacune accélérerait
> nettement l'affichage sur une connexion mobile.

### Tant qu'une image n'est pas fournie

- **Page web** : un bloc décoratif aux couleurs de J-GEN prend sa place. C'est un
  parti pris graphique, pas un message d'erreur — la page reste complète et
  élégante sans aucune photographie.
- **E-mail** : **aucune balise `<img>` n'est insérée**. On ne produit jamais une
  URL qui renverrait une erreur 404. Un projet reçoit à la place un bandeau
  typographique portant son nom ; un temps fort, un filet jaune.
- Le script liste à chaque exécution les visuels encore manquants.

### ⚠️ Déployer avant d'envoyer

Les images de l'e-mail utilisent des **URL absolues** pointant vers le site en
production (`https://jgen.sn/newsletter/…`). Un fichier présent seulement en
local ne sera **pas** visible par les destinataires.

**Ordre à respecter : déposer les images → déployer le site → générer le HTML →
envoyer la campagne.**

---

## 7. Configurer l'URL du site

L'URL publique est centralisée dans **`lib/site.ts`**, qui lit deux variables
(voir `.env.example`) :

```bash
NEXT_PUBLIC_SITE_URL=https://jgen.sn   # lue par Next.js (navigateur + serveur)
NEWSLETTER_SITE_URL=https://jgen.sn    # repli pour le script Node de génération
```

Le script `email:generate` s'exécute hors du bundle Next et ne voit pas
nécessairement `NEXT_PUBLIC_SITE_URL` : `NEWSLETTER_SITE_URL` existe pour ce cas.
**Gardez les deux identiques en production.** Sans variable définie, le repli
documenté est `https://jgen.sn`.

Le script **refuse de générer** si l'URL contient `localhost` ou `127.0.0.1`.

Le bouton principal de l'e-mail pointe vers la page complète avec les paramètres
de campagne :

```
https://jgen.sn/newsletter/semestre-1-2026
  ?utm_source=mailchimp
  &utm_medium=email
  &utm_campaign=newsletter_semestre_1_2026
```

Toutes les URL sont construites avec l'API `URL`, jamais par concaténation.

---

## 8. Éléments restant à valider par J-GEN

Ces points sont également listés, avec leur contexte, dans le tableau
`validationNotes` du fichier de contenu.

| Sujet | À faire |
|---|---|
| **Graphie des programmes** | Les rapports emploient des formes concurrentes (« Naatal Ndiabote Gui » / « Naatal Jaboot Gui » / « Naatal Jaboot Gi », « KIIRAY » / « KIIRAAY », « Bajenu Gox » / « Badienou Gox »). Aucune graphie officielle n'existait sur le site. Les formes provisoires retenues — **Naatal Jaboot Gui**, **KIIRAY**, **Bajenu Gox**, **Liggeyal Ëlëg** — doivent être confirmées. |
| **Dates des Assises** | Les rapports annoncent les Assises « prévues du 25 au 27 novembre 2026 ». C'est une **information future**, affichée comme telle avec un avertissement. À vérifier avant publication. |
| **Visuels et crédits** | Il manque encore une photographie d'**ELLES AUSSI** et une de l'**atelier de Saly**. Voir §6. Communiquer également les crédits photographiques. |
| **Adresse postale** | Le site ne mentionne que « Dakar, Sénégal ». Mailchimp exige une **adresse physique complète**, à renseigner dans les paramètres de l'audience — elle est injectée par `*|HTML:LIST_ADDRESS_HTML|*`. |
| **URL des pages projets** | Les six pages programmes et `/assises` existent désormais : chaque activité de l'e-mail a son bouton (`programHref`). Vérifier que ces pages sont bien publiées avant l'envoi. |
| **Bénéficiaires Liggeyal Ëlëg** | Communiquer le nombre effectivement accompagné lorsqu'il sera consolidé (120 est une cible). |

---

## 9. Envoi de test — liste de contrôle

- [ ] `npm run email:generate` se termine sans erreur
- [ ] Poids du HTML annoncé **sans avertissement** de troncature
- [ ] Aperçu **ordinateur** correct dans Mailchimp
- [ ] Aperçu **mobile** correct dans Mailchimp
- [ ] E-mail de test reçu sur **Gmail**
- [ ] E-mail de test reçu sur **Outlook**
- [ ] E-mail de test reçu sur **un téléphone**
- [ ] Le **preheader** s'affiche dans la liste des messages
- [ ] Lien « Voir cet e-mail dans votre navigateur » fonctionnel
- [ ] Tous les liens vers le site aboutissent sur la bonne section
- [ ] Les **sept boutons d'activité** ouvrent bien la page de leur programme
- [ ] Le message n'est **pas tronqué** dans Gmail (pied de page visible)
- [ ] Lien de **désabonnement** fonctionnel
- [ ] Lien de **mise à jour des préférences** fonctionnel
- [ ] **Adresse physique** affichée en pied de page
- [ ] **Images** visibles (site déployé au préalable)
- [ ] E-mail lisible **images désactivées**
- [ ] Version **texte brut** cohérente

---

## 10. Architecture des fichiers

```
content/newsletter-semestre-1-2026.ts        Source unique du contenu (typée)
lib/site.ts                                  URL du site + paramètres UTM
lib/newsletter-image.ts                      Résolution des visuels (extension libre)

app/newsletter/semestre-1-2026/page.tsx      Page web + métadonnées SEO
components/newsletter/                       Composants de section de la page
  newsletter-figure.tsx                        Image ou placeholder de marque
  newsletter-hero.tsx
  newsletter-stats.tsx
  newsletter-orientations.tsx
  newsletter-axes.tsx
  newsletter-highlights.tsx
  newsletter-timeline.tsx
  newsletter-outlook.tsx
  newsletter-cta.tsx

emails/newsletter-semestre-1-2026.tsx        Template React Email
scripts/newsletter-html.ts                   Conversion + validation (fonctions pures)
scripts/generate-newsletter-semestre-1-2026.tsx  Script de génération
generated-emails/                            Fichiers produits (.html et .txt)
```

### Dépendances ajoutées

`react-email@^6.9.1`, `@react-email/ui@^6.9.1` et `tsx`, toutes en
**devDependencies** : la génération d'e-mail est une tâche d'outillage, elle
n'alourdit ni le bundle du site ni le build de production.

`@react-email/ui` est l'interface du serveur d'aperçu. Sans elle, `npm run email:dev`
s'arrête sur une question interactive (« the package "@react-email/ui" must be
installed »). Elle est donc déclarée explicitement, pour que la commande démarre
directement chez tout le monde.

> **Note d'installation :** le dépôt présente un conflit de peer dependencies
> **préexistant** (`next-sanity@11.4.2` réclame Next ≥ 15 alors que le projet est
> en Next 14.2.33). Toute installation doit donc se faire avec
> `npm install --legacy-peer-deps`.
