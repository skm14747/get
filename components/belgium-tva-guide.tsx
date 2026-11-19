export function BelgiumTvaGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">Comment utiliser ce calculateur de TVA belge</h2>
        <p className="mt-2">
          Entrez un montant en euros (€). Choisissez le taux légal du SPF Finances (21% standard, 12% intermédiaire ou 6% réduit) ou entrez un pourcentage personnalisé. Basculez entre calcul direct (HT vers TTC) et calcul inversé (TTC vers HT).
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
        <h2 className="text-xl font-semibold">Exemples de calcul</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Ajout de 21% sur 100 € HT :</strong> Montant HT = 100,00 €, TVA = 21,00 €, Total TTC = 121,00 €.</li>
          <li><strong>Calcul inversé sur 121 € TTC :</strong> Montant HT = 121 ÷ 1,21 = 100,00 €, TVA = 21,00 €.</li>
          <li><strong>Taux réduit de 6% sur 50 € HT :</strong> TVA = 50 × 0,06 = 3,00 €, Total TTC = 53,00 €.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Confidentialité</h2>
        <p className="mt-2">
          Le traitement est réalisé à 100% dans la mémoire de votre navigateur. Vos données de facturation restent strictement confidentielles sur votre appareil.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Pourquoi cet outil existe</h2>
        <p className="mt-2">
          Contrairement aux calculateurs généralistes qui mélangent les réglementations fiscales, cet outil applique spécifiquement le barème belge du SPF Finances avec une stricte exactitude comptable.
        </p>
      </section>
    </div>
  );
}
