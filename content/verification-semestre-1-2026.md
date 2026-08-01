# Liste de vérification — contenus du semestre 1 2026

Points à trancher par J-GEN Sénégal avant publication. Chacun est localisé pour
que la correction se fasse au bon endroit.

Aucun de ces points n'a été comblé par une supposition : lorsqu'un rapport ne
permettait pas d'établir un fait, l'article ne le mentionne pas.

---

## 1. Graphie des programmes — à confirmer

Les deux rapports emploient des graphies concurrentes. Les formes retenues
ci-dessous s'appuient sur les **banderoles photographiées lors des activités**,
qui constituent la graphie publique effective des projets.

| Retenu | Autres formes rencontrées | Source de l'arbitrage |
|---|---|---|
| **KIIRAY** | « KIIRAAY » (rapport T1) | Banderole « LANCEMENT DES ACTIVITÉS DU PROGRAMME KIIRAY » |
| **LIGGEEYAL ËLËG** | « LIGGEYAL ELEG », « LIGGGEYAL ËLËG », « LIGGEYAAL ELEG », « Liggeyal eleg » (rapport T1) | Banderoles « LIGGEEVAL ÈLËG » des sessions de formation, et graphie déjà en base Sanity |
| **Naatal Jaboot Gui** | « Naatal Ndiabote Gui », « NAATAL NDIABOT GUI » (T1), « Naatal Jaboot Gi » (T2) | Graphie déjà en base Sanity |
| **Bajenu Gox** | « Badienou Gox », « badiane gox », « badienes gox » | Forme majoritaire dans le T2 |

**Attention** : le fichier [content/newsletter-semestre-1-2026.ts](newsletter-semestre-1-2026.ts)
utilise encore **« Liggeyal Ëlëg »** (un seul E), alors que Sanity et les articles
utilisent **« LIGGEEYAL ËLËG »**. Il faut aligner les deux une fois la graphie
officielle arrêtée.

---

## 2. Numéro de téléphone — TRANCHÉ, à confirmer une dernière fois

Le numéro des deux rapports a été retenu : **+221 33 805 91 39**, en remplacement
du **+221 33 868 91 29** affiché jusqu'ici. Appliqué à quatre endroits :

- `content/newsletter-semestre-1-2026.ts` (`organisation.phoneDisplay` / `phoneHref`) ;
- [app/contact/page.tsx](../app/contact/page.tsx) ;
- [components/contact.tsx](../components/contact.tsx) ;
- le balisage `OrganizationSchema`.

⚠️ **Un numéro de téléphone public est une porte d'entrée : passez-lui un appel
de vérification avant publication.** S'il fallait revenir en arrière, ces quatre
emplacements sont les seuls concernés.

---

## 3. Adresse postale — TRANCHÉ

L'adresse des rapports a été reportée :

> 6781 Sicap Liberté 6, 2ᵉ étage gauche, Dakar, Sénégal

Elle figure désormais dans `content/newsletter-semestre-1-2026.ts` et dans le
bloc `PostalAddress` du balisage `OrganizationSchema`, qui ne contenait
auparavant que la ville et le pays.

---

## 4. Réseaux sociaux — TRANCHÉ

Le balisage `OrganizationSchema` déclarait trois comptes qui n'existent pas. Il
reprend désormais exactement les URL du header et du footer :

- `https://www.facebook.com/JGENSenegal/`
- `https://www.instagram.com/jgen.sn/`
- `https://www.linkedin.com/company/jgen-women-global-entrepreneurship`

Ces trois valeurs doivent rester synchronisées avec le header et le footer : un
commentaire le rappelle dans le fichier.

---

## 5. Date de fondation — TRANCHÉ

`foundingDate` passe de `"2020"` à **`"2016"`**, cohérent avec le « depuis plus
de dix ans » des deux rapports.

Vous aviez formulé cette date avec un point d'interrogation : si l'année exacte
diffère, elle se corrige en un endroit unique,
[components/structured-data.tsx](../components/structured-data.tsx).

---

## 6. Adresse e-mail de contact

Les rapports mentionnent deux adresses : `jgensenegal@gmail.com` et `info@jgen.sn`.
Le site n'expose que `info@jgen.sn`, qui a été retenue dans le balisage. À
confirmer : est-ce bien l'adresse de contact publique à privilégier ?

---

## 7. Dates des Assises nationales citoyennes — confirmées, mais à verrouiller

Le rapport T1 indique explicitement des Assises **prévues du 25 au 27 novembre 2026**.
Cette date figure désormais dans les articles et sur la page programme
Naatal Jaboot Gui.

L'incertitude signalée précédemment est donc levée sur le fond, mais la date
reste **prévisionnelle**. Si elle bouge, trois endroits sont à mettre à jour :
- l'article `reunion-orientation-assises-nationales-citoyennes-mars-2026` ;
- l'article `quatre-dispositions-discriminatoires-code-famille-senegalais` ;
- le champ `assisesPlannedDates` de `content/newsletter-semestre-1-2026.ts`.

---

## 8. Atelier Beijing +30 — article écrit, deux manques

Un article a été rédigé à partir de la publication Facebook de J-GEN Sénégal :
`restitution-rapport-alternatif-beijing-30-senegal`.

Il établit l'objet de l'atelier (restitution du rapport alternatif de la société
civile sur les douze domaines critiques du Programme d'action de Beijing), les
participants, l'ambition politique du rapport, et les partenaires — la GIZ à
travers le projet REDTRA et la Foundation for a Just Society.

La banderole photographiée établit désormais **le lieu et le mois** : l'atelier
s'est tenu à l'**Hôtel Ndiambour, à Dakar**, un **mardi de juin 2026**. L'article
et son visuel ont été mis à jour en conséquence.

**Il manque encore le quantième exact.** Le chiffre est masqué sur la photo.
L'article dit donc « en juin 2026 » sans préciser le jour. Les mardis de juin
2026 sont les 2, 9, 16, 23 et 30 ; le 23 est le plus probable puisque la
restitution de l'enquête de Yoff a eu lieu le mercredi 24 — mais **je ne l'ai pas
inscrit sans confirmation de votre part**.

C'est le sujet au plus fort potentiel de recherche de tout le lot — Beijing +30
est une échéance internationale largement documentée. Il mérite d'être enrichi
en priorité : nombre de participants, organisations présentes nommément,
principales recommandations du rapport, et lien de téléchargement du rapport
alternatif s'il est public.

**Nouveaux partenaires à intégrer** : la GIZ (projet REDTRA) et la Foundation
for a Just Society n'apparaissaient dans aucun des deux rapports trimestriels ni
dans la liste des partenaires du site. À ajouter à la page partenaires.

---

## 9. Date sur la banderole de l'atelier Bajenu Gox

La banderole photographiée pour l'atelier national des Bajenu Gox porte
« Du 06 au 07 Mai **2025** à Dakar », alors que le rapport T2 situe cet atelier
au deuxième trimestre **2026**.

L'article `bajenu-gox-feuille-de-route-violences-basees-sur-le-genre` ne donne
donc **aucune date précise** pour cet atelier, seulement le trimestre. À
compléter si vous disposez des dates exactes.

---

## 10. PAS À PAS — écart entre cible et réalisation

Le tableau des indicateurs du T1 fait apparaître, pour l'enrôlement des jeunes
leaders : **cible prévue 450, cible réalisée 60**.

Les articles publics mentionnent les 60 jeunes enrôlés sans évoquer l'écart —
ce qui n'est ni faux ni trompeur pour un article d'actualité. Vous devez
néanmoins savoir que cet écart figure dans le rapport, au cas où un bailleur ou
un journaliste le relèverait.

---

## 11. ELLES AUSSI — statut du projet

La phase 2 courait de **juillet 2025 à mars 2026** et est donc achevée. Le statut
`completed` de la page programme est correct en l'état.

**Question** : une phase 3 est-elle engagée ou prévue ? Si oui, le statut doit
passer à « En cours » et la période être mise à jour.

---

## 12. Visuels manquants — 5 articles

Sept visuels ont été ajoutés et rattachés. Restent cinq articles sans image :

| Article | Visuel souhaitable |
|---|---|
| `cercles-de-guerison-niakhar-38-survivantes-violences-sexuelles` | Cercle de guérison à Niakhar — **aucune photo ELLES AUSSI dans le dépôt** |
| `liggeeyal-eleg-fatick-teinture-patisserie-trois-gie` | Formation teinture ou pâtisserie **côté Fatick** — `euleug.jpg` et `patisserie.jpg` portent tous deux la mention Kaolack |
| `deuxieme-atelier-defenseurs-droits-humains-saly-mars-2026` | Atelier DDH à Saly, 10-12 mars 2026 — signalé introuvable |
| `dialogues-intergenerationnels-grand-dakar-ouakam-violences` | Dialogue intergénérationnel, Biscuiterie ou Ouakam |
| `enrolement-soixante-jeunes-leaders-justice-reproductive` | Séance d'enrôlement des jeunes leaders |

### Deux constats sur les fichiers fournis

- **`jvssr1.jpeg` et `jvssr2.jpeg` sont le même fichier.** Sanity déduplique par
  empreinte et leur a attribué un identifiant identique. L'un des deux peut être
  supprimé du dépôt.
- **`patisserie.jpg` n'est pas utilisé.** Il montre bien une formation de
  LIGGEEYAL ËLËG, mais côté Kaolack, où l'article porte déjà `euleug.jpg` dont la
  banderole nomme le GIE et le métier. Il reste disponible pour la galerie du
  programme.

**Comment ajouter les visuels manquants** : déposez les fichiers dans
`public/newsletters/semestre-1/`, ajoutez une ligne par image dans le tableau
`ALT_TEXTS` de [scripts/upload-newsletter-assets.ts](../scripts/upload-newsletter-assets.ts),
puis lancez `npx sanity exec scripts/upload-newsletter-assets.ts --with-user-token`.
Le script est idempotent : le relancer ne crée pas de doublons.

---

## 13. Auteurs parasites dans Sanity

Deux documents `author` semblent ne pas devoir exister :

- **« Nicole Kristof »** — a toutes les caractéristiques d'une donnée de
  démonstration héritée d'un gabarit de départ.
- **« Plaidoyer »** — ressemble à une catégorie créée par erreur comme auteur.

Aucun des deux n'est utilisé par les articles produits. À supprimer après
vérification qu'ils ne signent aucun article existant.

---

## 14. Ordre de publication à respecter

Les nouveaux articles référencent le programme **KIIRAY** et trois nouvelles
catégories (**Autonomisation économique**, **Gouvernance locale**, **Bajenu Gox**)
qui n'existent encore qu'en brouillon. Ces références sont posées en **liens
faibles**, ce qui permet de publier dans n'importe quel ordre sans erreur.

Pour que les liens s'affichent correctement, publiez néanmoins dans cet ordre :

1. les **3 catégories** et le **programme KIIRAY** ;
2. les **6 programmes** mis à jour ;
3. les **articles**, par vagues de trois ou quatre sur deux à trois semaines.

L'étalement des publications est délibéré : dix-huit articles mis en ligne le
même jour se lisent comme un déversement de contenu, ce que les moteurs de
recherche traitent moins favorablement qu'une parution régulière.
