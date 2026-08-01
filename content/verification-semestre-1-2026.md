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

## 2. Numéro de téléphone — contradiction à lever

- Les deux rapports trimestriels portent en pied de page : **(221) 33 805 91 39**
- Le site affiche : **+221 33 868 91 29**
  (dans `content/newsletter-semestre-1-2026.ts`, champ `organisation.phoneDisplay`)

Les deux numéros ne peuvent pas être corrects simultanément. Un numéro erroné en
pied de page d'un site institutionnel est une perte de contacts directe.

---

## 3. Adresse postale — désormais établie, à reporter

Les rapports donnent l'adresse complète :

> 6781 Sicap Liberté 6, 2ᵉ étage gauche, Dakar, Sénégal

Elle n'apparaît nulle part sur le site. Deux endroits à compléter :
- le champ `organisation` de `content/newsletter-semestre-1-2026.ts` ;
- le balisage `OrganizationSchema` de [components/structured-data.tsx](../components/structured-data.tsx),
  dont le bloc `PostalAddress` ne contient aujourd'hui que la ville et le pays.
  Une adresse postale complète est l'un des signaux que Google utilise pour
  rattacher un site à une organisation réelle.

---

## 4. Réseaux sociaux — deux jeux d'URL divergents

`OrganizationSchema` déclare des comptes qui ne correspondent pas à ceux du
fichier de contenu :

| Réseau | Déclaré dans le balisage | Déclaré dans le contenu |
|---|---|---|
| Facebook | `facebook.com/jgensenegal` | `facebook.com/JGENSenegal` |
| Instagram | `instagram.com/jgensenegal` | `instagram.com/jgen.sn` |
| LinkedIn | `linkedin.com/company/jgensenegal` | `linkedin.com/company/jgen-women-global-entrepreneurship` |

Un `sameAs` qui pointe vers un compte inexistant affaiblit le rattachement de
l'organisation plutôt qu'il ne le renforce. Il faut retenir un seul jeu.

---

## 5. Date de fondation — incohérence

`OrganizationSchema` déclare `foundingDate: "2020"`. Les deux rapports indiquent
que J-GEN œuvre « depuis plus de dix ans », ce qui situe la fondation en 2015 ou
avant. À corriger dans [components/structured-data.tsx](../components/structured-data.tsx).

---

## 6. Adresse e-mail de contact

Les rapports mentionnent deux adresses : `jgensenegal@gmail.com` et `info@jgen.sn`.
Le site n'expose que `info@jgen.sn`. À confirmer : est-ce bien l'adresse de
contact publique à privilégier ?

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

## 8. Atelier Beijing +30 — aucun article écrit

Le rapport T2 mentionne, sous « Activités institutionnelles et de plaidoyer »,
une seule ligne : « Un Atelier de restitution du rapport des 30 ans de Beijing ».

Ni date, ni lieu, ni participants, ni contenu. **Aucun article n'a été écrit sur
cette activité** : il n'y avait pas matière à autre chose qu'un texte creux.

Si vous disposez d'un compte rendu de cet atelier, c'est un sujet à fort
potentiel — Beijing +30 est une échéance internationale largement recherchée.

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

## 12. Visuels manquants — 9 articles

Ces articles sont complets et publiables, mais sans image. Un article sans
visuel perd en partage social et en taux de clic.

| Article | Visuel souhaitable |
|---|---|
| `cercles-de-guerison-niakhar-38-survivantes-violences-sexuelles` | Cercle de guérison à Niakhar — **aucune photo ELLES AUSSI disponible** |
| `dialogues-intergenerationnels-grand-dakar-ouakam-violences` | Dialogue intergénérationnel, Biscuiterie ou Ouakam |
| `enrolement-soixante-jeunes-leaders-justice-reproductive` | Séance d'enrôlement des jeunes leaders |
| `etude-perceptions-communaute-yoff-dssr-vbg` | Atelier de restitution de l'étude à Yoff |
| `liggeeyal-eleg-fatick-teinture-patisserie-trois-gie` | Formation teinture ou pâtisserie à Fatick, Diouroup ou Niakhar |
| `feuille-de-route-comite-pilotage-assises-nationales-citoyennes` | Atelier d'installation du comité de pilotage |
| `deuxieme-atelier-defenseurs-droits-humains-saly-mars-2026` | Atelier DDH à Saly, 10-12 mars 2026 |
| `quatre-dispositions-discriminatoires-code-famille-senegalais` | Visuel de plaidoyer Code de la famille |
| `ce-que-les-jeunes-filles-de-yoff-disent-des-violences` | Cercle de sororité (une autre vue que celle déjà utilisée) |

**Comment les ajouter** : déposez les fichiers dans `public/newsletters/semestre-1/`,
complétez le tableau `ALT_TEXTS` de
[scripts/upload-newsletter-assets.ts](../scripts/upload-newsletter-assets.ts),
puis lancez `npx sanity exec scripts/upload-newsletter-assets.ts --with-user-token`.
Les images se rattachent ensuite depuis le Studio.

Le générateur d'e-mail signale par ailleurs un visuel attendu et absent :
`atelier-defenseurs-saly`.

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
