export function FranceTvaGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">Comment utiliser ce calculateur de TVA</h2>
        <p className="mt-2">
          Saisissez un montant en euros (€). Sélectionnez l&apos;un des quatre taux de TVA officiels français (20%, 10%, 5.5% ou 2.1%) ou saisissez un taux personnalisé. Cochez la case pour effectuer le calcul inversé (TTC vers HT). Le calculateur affiche immédiatement le montant Hors Taxes (HT), le montant de la TVA et le Total Toutes Taxes Comprises (TTC).
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Grille des taux de TVA en France (DGFIP)</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Taux normal (20%) :</strong> S&apos;applique à la majorité des ventes de biens, prestations de services, appareils électroniques et honoraires professionnels.</li>
          <li><strong>Taux intermédiaire (10%) :</strong> Concerne les restaurants, les transports de voyageurs, les travaux de rénovation de logements d&apos;habitation et les musées.</li>
          <li><strong>Taux réduit (5.5%) :</strong> Concerne les produits alimentaires de première nécessité, les livres (papier et numériques), les abonnements gaz et électricité, et les cantines scolaires.</li>
          <li><strong>Taux particulier (2.1%) :</strong> Réservé aux médicaments remboursables par la Sécurité sociale, aux publications de presse inscrites à la CPPAP et aux redevances audiovisuelles.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Formules de calcul mathématique</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Ajouter la TVA (HT vers TTC) :</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">TVA = HT × (Taux ÷ 100)</code> et <code className="rounded bg-line px-1 py-0.5 text-xs">TTC = HT + TVA</code>.</li>
          <li><strong>Calculer la TVA inversée (TTC vers HT) :</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">HT = TTC ÷ (1 + Taux ÷ 100)</code> (pour un taux de 20%, diviser par 1.20). La TVA est égale à <code className="rounded bg-line px-1 py-0.5 text-xs">TTC − HT</code>.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Confidentialité et sécurité des données</h2>
        <p className="mt-2">
          Tous les calculs financiers s&apos;exécutent localement dans votre navigateur web. Aucun montant de facture, chiffre d&apos;affaires ou donnée d&apos;entreprise n&apos;est enregistré ou transmis sur un serveur distant.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Pourquoi cet outil existe</h2>
        <p className="mt-2">
          Les indépendants, artisans, comptables et particuliers en France ont régulièrement besoin de calculer rapidement la TVA sans publicité intrusive, sans formulaire d&apos;inscription et avec une stricte précision au centime d&apos;euro.
        </p>
      </section>
    </div>
  );
}
