export function BelgiumTvaGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">Comment utiliser ce calculateur de TVA belge</h2>
        <p className="mt-2">
          Entrez un montant en euros (€). Choisissez le taux légal du SPF Finances (21% standard, 12% intermédiaire ou 6% réduit) ou entrez un pourcentage personnalisé. Basculez entre calcul direct (HT vers TTC) et calcul inversé (TTC vers HT).
        </p>
        <p className="mt-2">
          Le calculateur affiche instantanément le montant Hors Taxes, le montant de la TVA et le Total Toutes Taxes Comprises. Les résultats sont arrondis au centime d&apos;euro le plus proche pour correspondre aux exigences de facturation.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Taux de TVA officiels en Belgique (SPF Finances)</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Taux standard (21%) :</strong> Taux normal applicable par défaut à la plupart des biens de consommation, voitures, prestations de services et produits manufacturés.</li>
          <li><strong>Taux intermédiaire (12%) :</strong> Applicable notamment aux repas servis dans les restaurants et débits de boissons, au charbon et à certains logements sociaux.</li>
          <li><strong>Taux réduit (6%) :</strong> Concerne les denrées alimentaires de base, les produits pharmaceutiques, les livres, l&apos;eau et les travaux de rénovation de logements privés de plus de 10 ans.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Cas d&apos;utilisation courants</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Facturation freelance :</strong> Calculez rapidement la TVA à ajouter sur vos honoraires pour établir des factures conformes au SPF Finances.</li>
          <li><strong>Vérification de tickets de caisse :</strong> Vérifiez le montant HT et la TVA sur vos reçus de restaurant (12%) ou de supermarché (6% sur alimentaire).</li>
          <li><strong>Devis et estimations :</strong> Établissez des devis TTC précis pour vos clients en ajoutant automatiquement le taux applicable.</li>
          <li><strong>Comptabilité simplifiée :</strong> Extrayez le montant HT d&apos;une facture TTC pour votre déclaration périodique de TVA.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Exemples de calcul</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Ajout de 21% sur 100 € HT :</strong> Montant HT = 100,00 €, TVA = 21,00 €, Total TTC = 121,00 €.</li>
          <li><strong>Calcul inversé sur 121 € TTC :</strong> Montant HT = 121 ÷ 1,21 = 100,00 €, TVA = 21,00 €.</li>
          <li><strong>Taux réduit de 6% sur 50 € HT :</strong> TVA = 50 × 0,06 = 3,00 €, Total TTC = 53,00 €.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Conseils pratiques</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Vérifiez toujours le taux applicable à votre catégorie de produit ou service sur le site du SPF Finances — les taux peuvent varier selon la nature exacte de la prestation.</li>
          <li>Utilisez le calcul inversé pour retrouver le montant HT à partir du prix affiché en magasin (qui est toujours TTC en Belgique).</li>
          <li>Ce calculateur fournit une aide arithmétique et ne constitue pas un conseil fiscal ou juridique.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Formules de calcul</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Ajouter la TVA (HT vers TTC) :</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">TVA = HT × (Taux ÷ 100)</code> et <code className="rounded bg-line px-1 py-0.5 text-xs">TTC = HT + TVA</code>.</li>
          <li><strong>Calcul inversé (TTC vers HT) :</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">HT = TTC ÷ (1 + Taux ÷ 100)</code>. Pour le taux standard de 21%, diviser par 1,21.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Confidentialité</h2>
        <p className="mt-2">
          Le traitement est réalisé à 100% dans la mémoire de votre navigateur. Vos données de facturation, montants et informations commerciales restent strictement confidentielles sur votre appareil. Aucune donnée n&apos;est transmise ou enregistrée.
        </p>
      </section>
    </div>
  );
}
