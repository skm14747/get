/**
 * Blog post catalog. Each post links to 1-3 tools and is available in all locales.
 * Posts are pure data: no MDX, no filesystem reads.
 */

export type BlogPost = {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  toolIds: string[];
  locale: Record<string, BlogLocale>;
};

export type BlogLocale = {
  title: string;
  description: string;
  body: string;
};

export const blogPosts: readonly BlogPost[] = [
  /* ───────────────────────────────────────────────────
   * Post 1: Why 20% + 10% Off != 30% Off
   * ─────────────────────────────────────────────────── */
  {
    slug: "stacked-discounts-math",
    publishedAt: "2026-11-19",
    toolIds: ["discount-calculator", "percentage-calculator"],
    locale: {
      en: {
        title: "Why 20% + 10% Off Is Not 30% Off",
        description: "Sequential discounts reduce the already marked-down price. Learn the math behind stacked markdowns and find the real final price.",
        body: `
A store offering 20% off plus an extra 10% off gives you 28% off, not 30%. On a $100 purchase, you pay $72 instead of $70. The second cut applies only to the already discounted price, not the original sticker tag.

## Why sequential discounts do not add up

Sequential markdowns apply one at a time. The retailer cuts the original price once, then takes the next percentage off whatever is left:

1. **Original sticker:** $100
2. **First cut (20% off):** $100 × 0.80 = **$80**
3. **Second cut (10% off the $80 balance):** $80 × 0.90 = **$72**
4. **Final price:** $72. Your real discount is **28%**.

You lose 2% of the original item value because the second cut acted on $80 rather than $100.

## How do you calculate stacked discounts?

Use this single formula for any two sequential discounts of **a%** and **b%**:

**Total discount = a + b − (a × b ÷ 100)**

For 20% and 10%:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

For 50% plus an extra 20%:
50 + 20 − (1,000 ÷ 100) = 70 − 10 = **60%** (not 70%)

For two consecutive 30% coupons:
30 + 30 − (900 ÷ 100) = 60 − 9 = **51%** (not 60%)

## Where stores use stacked discounts to mislead shoppers

Retail marketing teams rely on mental addition because consumers naturally add 20 and 10 to get 30:

- **Clearance rack promotions:** "Take an extra 25% off already reduced clearance." If the item was marked down 40%, you get 55% off total, not 65%.
- **Staff discounts on sale stock:** A 15% staff discount applied to a 30% sale saves you 40.5%, not 45%.
- **Coupon stacking promotions:** Stacking two 20% discount codes yields 36% off, not 40%.

## Calculate your actual savings

Run the numbers through our [discount calculator](/discount-calculator). Enter your starting price, the initial percentage, and any stacked coupons to get the final bill, total cash saved, and actual combined percentage.

To double-check raw percentages or margin calculations, verify them in the [percentage calculator](/percentage-calculator).
`,
      },
      es: {
        title: "Por qué 20% + 10% de descuento no equivale al 30%",
        description: "Los descuentos acumulados se aplican sobre el precio ya rebajado. Conoce la fórmula exacta para calcular el ahorro real.",
        body: `
Una tienda que ofrece un 20% de descuento más un 10% adicional te da un 28% de descuento total, no un 30%. En una compra de 100 €, pagas 72 € en lugar de 70 €. El segundo porcentaje se resta únicamente del importe ya rebajado.

## Por qué los descuentos sucesivos no se suman

Las rebajas consecutivas se calculan en cadena. El comercio aplica la primera rebaja sobre el importe inicial y luego calcula la segunda sobre el saldo restante:

1. **Precio original:** 100 €
2. **Primera rebaja (20% menos):** 100 € × 0.80 = **80 €**
3. **Segunda rebaja (10% sobre los 80 € restantes):** 80 € × 0.90 = **72 €**
4. **Pago final:** 72 €. Tu ahorro real es del **28%**.

Pierdes 2 puntos porcentuales porque el segundo descuento operó sobre 80 € y no sobre los 100 € iniciales.

## ¿Cómo calcular descuentos acumulados?

Aplica esta fórmula para dos porcentajes sucesivos de **a%** y **b%**:

**Descuento total = a + b − (a × b ÷ 100)**

Para 20% y 10%:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

Para 50% más 20% extra:
50 + 20 − (1.000 ÷ 100) = 70 − 10 = **60%** (no 70%)

## Dónde se usa esta estrategia comercial

- **Rebajas de liquidación:** "20% adicional sobre prendas ya rebajadas un 30%". El ahorro final es del 44%, no del 50%.
- **Descuentos de empleado combinados:** Un 10% extra sobre un 40% de oferta suma un 46%, nunca un 50%.

## Calcula tu ahorro exacto

Comprueba cualquier precio con nuestra [calculadora de descuentos](/es/calculadora-de-descuentos).
`,
      },
      fr: {
        title: "Pourquoi 20% + 10% de remise ne font pas 30%",
        description: "Les remises successives s'appliquent sur le montant déjà réduit. Découvrez la formule exacte pour calculer votre économie réelle.",
        body: `
Un magasin proposant 20% de réduction puis 10% supplémentaires vous accorde 28% de remise totale, et non 30%. Pour un article à 100 €, vous payez 72 € au lieu de 70 €. La deuxième réduction s'applique uniquement sur le prix intermédiaire.

## Pourquoi les remises cumulées ne s'additionnent pas

Les réductions en cascade se calculent étape par étape. Le commerçant applique le premier pourcentage au prix de départ, puis calcule le second sur le solde restant:

1. **Prix initial:** 100 €
2. **Première remise (20% de moins):** 100 € × 0.80 = **80 €**
3. **Deuxième remise (10% sur les 80 € restants):** 80 € × 0.90 = **72 €**
4. **Prix payé:** 72 €. Votre remise réelle est de **28%**.

## Comment calculer des remises cumulées ?

Voici la formule pour deux réductions successives de **a%** et **b%**:

**Remise réelle = a + b − (a × b ÷ 100)**

Pour 20% et 10%:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

Pour 50% plus 20%:
50 + 20 − (1 000 ÷ 100) = 70 − 10 = **60%**

## Calculez votre économie

Vérifiez n'importe quel prix d'article avec notre [calculateur de remise](/fr/calculateur-de-remise).
`,
      },
      de: {
        title: "Warum 20% + 10% Rabatt nicht 30% ergeben",
        description: "Gestaffelte Rabatte werden nacheinander berechnet. Erfahren Sie die genaue Formel für Ihre tatsächliche Ersparnis.",
        body: `
Ein Geschäft mit 20% Rabatt plus 10% Zusatzrabatt gewährt Ihnen 28% Gesamtnachlass, nicht 30%. Bei einem Einkauf von 100 € zahlen Sie 72 € statt 70 €. Der zweite Rabatt gilt nur für den bereits reduzierten Zwischenbetrag.

## Warum Rabatte nicht einfach addiert werden können

Stufenrabatte greifen nacheinander. Der Händler zieht zuerst den ersten Prozentsatz vom Grundpreis ab und berechnet den zweiten Nachlass vom Restbetrag:

1. **UVP:** 100 €
2. **Erster Rabatt (20% Abzug):** 100 € × 0.80 = **80 €**
3. **Zweiter Rabatt (10% auf die verbleibenden 80 €):** 80 € × 0.90 = **72 €**
4. **Endpreis:** 72 €. Ihr tatsächlicher Rabatt liegt bei **28%**.

## Wie berechnet man gestaffelte Rabatte?

Die mathematische Formel für zwei aufeinanderfolgende Rabatte **a%** und **b%** lautet:

**Gesamtrabatt = a + b − (a × b ÷ 100)**

Für 20% und 10%:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

## Berechnen Sie Ihre Ersparnis

Prüfen Sie jeden Einkauf mit unserem [Rabattrechner](/de/rabattrechner).
`,
      },
      "pt-BR": {
        title: "Por que 20% + 10% de desconto não é 30%",
        description: "Descontos sucessivos incidem sobre o valor já rebaixado. Entenda a matemática dos descontos acumulados e calcule o valor real.",
        body: `
Uma loja que oferece 20% de desconto mais 10% adicionais concede 28% de abatimento real, e não 30%. Em um produto de R$ 100, você paga R$ 72 em vez de R$ 70. O segundo percentual incide sobre o saldo já descontado.

## Por que descontos acumulados não se somam

Descontos em sequência são calculados em etapas:

1. **Preço original:** R$ 100
2. **Primeiro corte (20% de desconto):** R$ 100 × 0.80 = **R$ 80**
3. **Segundo corte (10% sobre os R$ 80):** R$ 80 × 0.90 = **R$ 72**
4. **Valor final:** R$ 72. Seu desconto real foi de **28%**.

## Como calcular descontos em sequência?

Fórmula para dois descontos sucessivos de **a%** e **b%**:

**Desconto real = a + b − (a × b ÷ 100)**

Para 20% e 10%:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

## Calcule sua economia

Faça o cálculo direto com nossa [calculadora de descontos](/pt-BR/calculadora-de-descontos).
`,
      },
      ar: {
        title: "لماذا خصم 20% + 10% لا يساوي 30%",
        description: "الخصومات المتتالية تحسب على السعر المخفض مسبقًا. تعرف على المعادلة الدقيقة لحساب التوفير الفعلي.",
        body: `
عندما يقدم متجر خصم 20% متبوعًا بخصم إضافي 10%، فإن الخصم الإجمالي الفعلي هو 28% وليس 30%. على فاتورة بقيمة 100 دولار، ستدفع 72 دولارًا بدلاً من 70 دولارًا، لأن النسبة الثانية تحسب على القيمة المتبقية بعد التخفيض الأول.

## لماذا لا تجمع نسب الخصم جمعًا مباشرًا

تطبق الخصومات المتتابعة بالتسلسل:

1. **السعر الأصلي:** 100 دولار
2. **الخصم الأول (20%):** 100 × 0.80 = **80 دولارًا**
3. **الخصم الثاني (10% على مبلغ الـ 80 المتبقي):** 80 × 0.90 = **72 دولارًا**
4. **المبلغ النهائي المدفوع:** 72 دولارًا. التوفير الحقيقي هو **28%**.

## كيف تحسب الخصومات المركبة؟

المعادلة الرياضية لأي خصمين متتابعين بنسبة **أ%** و **ب%**:

**الخصم الفعلي = أ + ب − (أ × ب ÷ 100)**

20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

## احسب توفيرك الآن

تحقق من أي سعر عبر [حاسبة الخصم](/ar/حاسبة-الخصم).
`,
      },
      ja: {
        title: "20%引き + さらに10%引きが30%引きにならない理由",
        description: "重複する割引は値下げ後の価格に適用されます。連続割引の計算式と実際の支払額を解説します。",
        body: `
20%引きに加えてさらに10%引きと表示されている場合、実際の割引率は30%ではなく28%です。10,000円の商品の場合、支払額は7,000円ではなく7,200円になります。2回目の割引は元の価格ではなく、すでに値下げされた金額に適用されるためです。

## 連続割引が単純計算できない仕組み

二重の割引は順番に計算されます:

1. **定価:** 10,000円
2. **1回目の割引 (20%引):** 10,000円 × 0.80 = **8,000円**
3. **2回目の割引 (残る8,000円から10%引):** 8,000円 × 0.90 = **7,200円**
4. **最終支払額:** 7,200円。実質割引率は **28%** です。

## 重複割引の計算式

連続する2つの割引率 **a%** と **b%** の実効割引率は次の式で求められます:

**実効割引率 = a + b − (a × b ÷ 100)**

20%と10%の場合:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

## 実際の支払額を計算する

正確な支払額と節約額は[割引計算機](/ja/割引計算機)ですぐに確認できます。
`,
      },
      hi: {
        title: "20% + 10% की छूट कुल 30% क्यों नहीं होती",
        description: "क्रमिक छूट पहले से घटी हुई कीमत पर लागू होती है। सही गणित समझें और अपनी वास्तविक बचत निकालें।",
        body: `
यदि कोई दुकान 20% छूट के बाद अतिरिक्त 10% छूट देती है, तो वास्तविक कुल छूट 28% होती है, 30% नहीं। ₹100 की खरीदारी पर आप ₹70 के बजाय ₹72 चुकाते हैं। दूसरी छूट हमेशा पहले घटी हुई रकम पर लगती है, मूल मूल्य पर नहीं।

## क्रमिक छूट सीधे क्यों नहीं जुड़ती

क्रमिक छूट चरणबद्ध तरीके से कटती है:

1. **मूल मूल्य:** ₹100
2. **पहली छूट (20% कम):** ₹100 × 0.80 = **₹80**
3. **दूसरी छूट (बचे ₹80 पर 10% कम):** ₹80 × 0.90 = **₹72**
4. **अंतिम भुगतान:** ₹72। आपकी वास्तविक बचत **28%** है।

## क्रमिक छूट की गणना का सूत्र

दो क्रमिक छूटों **a%** और **b%** के लिए सूत्र:

**वास्तविक छूट = a + b − (a × b ÷ 100)**

20% और 10% के लिए:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

## अपनी बचत जांचें

सटीक गणना के लिए हमारे [छूट कैलकुलेटर](/hi/छूट-कैलकुलेटर) का उपयोग करें।
`,
      },
      id: {
        title: "Mengapa Diskon 20% + 10% Bukan Berarti Diskon 30%",
        description: "Diskon bertingkat dihitung dari harga yang sudah dipotong. Pahami rumus perhitungan diskon bertumpuk dan penghematan aslinya.",
        body: `
Toko yang menawarkan diskon 20% ditambah diskon tambahan 10% sebenarnya memberikan potongan 28%, bukan 30%. Pada barang seharga Rp 100.000, Anda membayar Rp 72.000, bukan Rp 70.000. Potongan kedua hanya berlaku untuk sisa harga setelah potongan pertama.

## Mengapa diskon bertingkat tidak langsung dijumlahkan

Potongan bertingkat diproses bertahap:

1. **Harga awal:** Rp 100.000
2. **Potongan pertama (20%):** Rp 100.000 × 0.80 = **Rp 80.000**
3. **Potongan kedua (10% dari Rp 80.000):** Rp 80.000 × 0.90 = **Rp 72.000**
4. **Harga akhir:** Rp 72.000. Diskon riil Anda adalah **28%**.

## Rumus menghitung diskon bertingkat

Gunakan rumus ini untuk dua diskon berturut-turut **a%** dan **b%**:

**Diskon total = a + b − (a × b ÷ 100)**

Untuk 20% dan 10%:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

## Hitung penghematan Anda

Periksa harga akhir menggunakan [kalkulator diskon](/id/kalkulator-diskon).
`,
      },
      it: {
        title: "Perché 20% + 10% di sconto non corrisponde al 30%",
        description: "Gli sconti sequenziali vengono applicati sul prezzo già ribassato. Scopri la formula matematica e calcola il risparmio effettivo.",
        body: `
Un negozio che propone uno sconto del 20% più un ulteriore 10% offre in realtà un ribasso totale del 28%, non del 30%. Su un acquisto da 100 €, pagherai 72 € anziché 70 €. Il secondo sconto percentuale si calcola esclusivamente sul saldo residuo.

## Perché gli sconti cumulati non si sommano

I ribassi a cascata operano per gradi:

1. **Prezzo iniziale:** 100 €
2. **Primo sconto (20%):** 100 € × 0.80 = **80 €**
3. **Secondo sconto (10% sugli 80 € residui):** 80 € × 0.90 = **72 €**
4. **Prezzo finale:** 72 €. Il risparmio netto è del **28%**.

## Come si calcolano gli sconti in successione?

Ecco la formula per due sconti consecutivi di **a%** e **b%**:

**Sconto complessivo = a + b − (a × b ÷ 100)**

Per 20% e 10%:
20 + 10 − (200 ÷ 100) = 30 − 2 = **28%**

## Calcola il tuo risparmio

Inserisci qualsiasi importo nel nostro [calcolatrice di sconti](/it/calcolatrice-di-sconti).
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 2: Share Wi-Fi Without Giving Away Your Password
   * ─────────────────────────────────────────────────── */
  {
    slug: "share-wifi-qr-code",
    publishedAt: "2026-11-20",
    toolIds: ["qr-code-generator", "password-generator"],
    locale: {
      en: {
        title: "Share Wi-Fi Without Giving Away Your Password",
        description: "Connect visitors to your network with a printed QR code. Modern iPhone and Android cameras read the credentials and connect in one tap.",
        body: `
You can connect visitors to your home or office Wi-Fi with a printed QR code without dictating long passwords. Modern iPhone and Android cameras read the network name and WPA key directly from the code and connect with a single tap.

## Why typing Wi-Fi passwords fails

Dictating passwords wastes time and causes errors:

- **Misheard characters:** Confusing uppercase "I", lowercase "l", and the number "1".
- **Security compromises:** People choose weak passwords like "guest1234" just to avoid spelling complex keys out loud.
- **Sticky note clutter:** Leaving passwords on post-it notes exposes the credentials to anyone passing by.

## How does a Wi-Fi QR code work?

The QR code encodes a standard string format defined by the Wi-Fi Alliance:

\`WIFI:T:WPA;S:MyNetwork;P:MySecretPass;;\`

When an iOS or Android device camera detects this string:
1. The phone parses the SSID and encryption protocol.
2. A system notification asks: "Join Wi-Fi network MyNetwork?"
3. Tapping the prompt authenticates and connects the device instantly.

The visitor never sees, copies, or types the raw password string.

## How to generate a Wi-Fi QR code

1. Open our [QR code generator](/qr-code-generator).
2. Click the **Wi-Fi** mode button.
3. Type your exact network name (SSID) and your network password.
4. Select your security type (most modern routers use WPA/WPA2).
5. Click **Generate QR code** and download the PNG file.

## Where to place your Wi-Fi QR code

- **Home entryways:** Print and place a framed card on the hall console.
- **Airbnb and short-term rentals:** Put a laminated card on the refrigerator or desk.
- **Cafes and offices:** Display a tabletop standee so customers connect without asking staff.

## Keep your network secure

Do not weaken your router password for convenience. Use our [password generator](/password-generator) to produce a 20-character random key, update your router settings, and burn that strong key into the QR code. You get strong encryption while your guests get one-tap convenience.
`,
      },
      es: {
        title: "Comparte tu red Wi-Fi sin dictar tu contraseña",
        description: "Conecta a tus visitas con un código QR impreso. Las cámaras de iPhone y Android leen las credenciales y se conectan en un toque.",
        body: `
Puedes conectar a tus invitados a la red Wi-Fi de tu casa u oficina mediante un código QR sin tener que dictar contraseñas largas. Las cámaras de iPhone y Android reconocen los datos de la red directamente desde el código y se conectan con una sola pulsación.

## Por qué dictar contraseñas de Wi-Fi es ineficiente

- **Confusión de caracteres:** Dudas continuas entre ceros y oes mayúsculas, o entre unos y eles.
- **Riesgo de seguridad:** Elegir contraseñas débiles solo para que sean fáciles de pronunciar.
- **Notas a la vista:** Dejar papeles con claves escritas al alcance de cualquiera.

## Cómo funciona un código QR de Wi-Fi

El código almacena un texto estandarizado:
\`WIFI:T:WPA;S:MiRed;P:MiClaveSecreta;;\`

Al enfocar el código con la cámara:
1. El sistema operativo detecta la red y la seguridad.
2. Aparece un aviso para unirse a la red.
3. Al pulsar el aviso, el móvil se conecta de forma inmediata.

## Cómo crear tu código en tres pasos

1. Abre el [generador de códigos QR](/es/generador-de-codigos-qr).
2. Elige el modo **Wi-Fi**.
3. Escribe el nombre de tu red y la contraseña, luego descarga la imagen para imprimirla.

Para mayor seguridad, genera primero una clave robusta con nuestro [generador de contraseñas](/es/generador-de-contrasenas).
`,
      },
      fr: {
        title: "Partagez votre Wi-Fi sans donner votre mot de passe",
        description: "Connectez vos invités avec un code QR imprimé. Les appareils photo iPhone et Android lisent les identifiants et se connectent en un clic.",
        body: `
Connectez vos invités au réseau Wi-Fi de votre domicile ou de votre bureau grâce à un simple code QR. Les appareils photo des téléphones modernes analysent les identifiants et connectent l'appareil en un seul clic sans aucune saisie manuelle.

## Pourquoi l'épellation de mot de passe pose problème

- **Erreurs de saisie:** Confusion fréquente entre majuscules, minuscules et chiffres.
- **Sécurité compromise:** Choix de mots de passe trop simples par peur de devoir les dicter.

## Comment générer votre code QR Wi-Fi

1. Rendez-vous sur notre [générateur de code QR](/fr/generateur-de-code-qr).
2. Sélectionnez le mode **Wi-Fi**.
3. Renseignez le nom de votre réseau (SSID) et le mot de passe associé.
4. Téléchargez l'image PNG et imprimez-la.

Pour une protection optimale, créez un mot de passe complexe avec le [générateur de mot de passe](/fr/generateur-de-mot-de-passe) avant de l'enregistrer dans votre code QR.
`,
      },
      de: {
        title: "WLAN teilen ohne Passwortweitergabe",
        description: "Verbinden Sie Besucher über einen ausgedruckten QR-Code. Smartphone-Kameras erkennen die Zugangsdaten und verbinden sich sofort.",
        body: `
Verbinden Sie Gäste mit Ihrem WLAN-Netzwerk über einen QR-Code, ohne ein langes Kennwort diktieren zu müssen. Moderne Smartphones scannen die Anmeldedaten direkt mit der Kamera und stellen die Verbindung mit einem Fingertipp her.

## Die Nachteile manueller Passworteingabe

- **Tippfehler:** Verwechslung von I, l und 1 oder O und 0.
- **Sicherheitsrisiken:** Unsichere Passwörter aus Bequemlichkeit.

## So erstellen Sie den WLAN-QR-Code

1. Öffnen Sie unseren [QR-Code-Generator](/de/qr-code-generator).
2. Wählen Sie den Modus **Wi-Fi**.
3. Geben Sie Netzwerkname (SSID) und Kennwort ein.
4. Laden Sie den QR-Code herunter und drucken Sie ihn aus.

Erstellen Sie zuvor ein starkes WLAN-Passwort mit unserem [Passwortgenerator](/de/passwortgenerator).
`,
      },
      "pt-BR": {
        title: "Compartilhe Wi-Fi sem ditar sua senha",
        description: "Conecte visitas com um código QR impresso. As câmeras de celular leem os dados e conectam em um único toque.",
        body: `
Conecte convidados ao Wi-Fi da sua casa ou empresa através de um código QR impresso, sem precisar soletrar senhas complexas. A câmera do smartphone lê a rede e a chave de segurança instantaneamente.

## Como gerar o QR Code de Wi-Fi

1. Acesse nosso [gerador de código QR](/pt-BR/gerador-de-codigo-qr).
2. Selecione a opção **Wi-Fi**.
3. Digite o nome da rede (SSID) e a senha.
4. Baixe a imagem e imprima para deixar à mostra.

Crie uma senha forte e segura antes com o [gerador de senhas](/pt-BR/gerador-de-senhas).
`,
      },
      ar: {
        title: "شارك شبكة الواي فاي بدون نطق كلمة المرور",
        description: "اربط ضيوفك بالشبكة عبر رمز QR مطبوع. كاميرات الهواتف تقرأ بيانات الاتصال وتتصل بضغطة واحدة.",
        body: `
يمكنك توصيل زوارك بشبكة الواي فاي المنزلية أو المكتبية برمز QR مطبوع دون الحاجة لإملاء كلمات مرور طويلة. كاميرات الهواتف الذكية تقرأ اسم الشبكة ونوع التشفير وتتصل بضغطة واحدة.

## خطوات إنشاء رمز QR للواي فاي

1. افتح [مولّد رمز QR](/ar/مولد-رمز-qr).
2. اختر وضع **Wi-Fi**.
3. اكتب اسم الشبكة بدقة وكلمة المرور الخاصة بها.
4. قم بتحميل الصورة واطبعها في مكان واضح.

لضمان الحماية، أنشئ أولاً كلمة مرور قوية باستخدام [مولّد كلمات المرور](/ar/مولد-كلمات-المرور).
`,
      },
      ja: {
        title: "パスワードを口頭で教えずにWi-Fiを共有する方法",
        description: "印刷したQRコードで来訪者をWi-Fiに接続。スマートフォンのカメラをかざすだけでワンタップ接続できます。",
        body: `
長いパスワードを一文字ずつ教えなくても、印刷したQRコードをスマホカメラで読み取るだけでWi-Fiに接続できます。iPhoneでもAndroidでも標準カメラアプリで対応しています。

## Wi-Fi QRコードの作り方

1. [QRコード生成](/ja/qrコード生成)を開きます。
2. **Wi-Fi** モードを選択します。
3. ネットワーク名（SSID）とパスワードを入力します。
4. QRコード画像をダウンロードし、印刷して掲示します。

セキュリティを高めるため、まずは[パスワード生成](/ja/パスワード生成)で安全なパスワードを設定することをおすすめします。
`,
      },
      hi: {
        title: "पासवर्ड बताए बिना मेहमानों को Wi-Fi से जोड़ें",
        description: "प्रिंटेड QR कोड से मेहमानों को अपने Wi-Fi से कनेक्ट करें। फोन का कैमरा कोड पढ़कर एक क्लिक में कनेक्ट कर देता है।",
        body: `
लंबे पासवर्ड बोलकर बताने के बजाय प्रिंटेड QR कोड का उपयोग करें। स्मार्टफोन का कैमरा कोड स्कैन करते ही नेटवर्क का नाम और सुरक्षा पहचानकर सीधे कनेक्ट कर देता है।

## Wi-Fi QR कोड कैसे बनाएं

1. हमारा [QR कोड जनरेटर](/hi/qr-कोड-जनरेटर) खोलें।
2. **Wi-Fi** विकल्प चुनें।
3. नेटवर्क का नाम (SSID) और पासवर्ड दर्ज करें।
4. QR कोड डाउनलोड करें और प्रिंट कर लें।

मजबूत पासवर्ड के लिए हमारे [पासवर्ड जनरेटर](/hi/पासवर्ड-जनरेटर) का उपयोग करें।
`,
      },
      id: {
        title: "Bagikan Wi-Fi Tanpa Harus Mengeja Password",
        description: "Hubungkan tamu ke jaringan internet Anda menggunakan kode QR cetak. Kamera ponsel membaca data dan langsung terhubung.",
        body: `
Hubungkan tamu ke jaringan Wi-Fi rumah atau kantor Anda menggunakan kode QR cetak tanpa repot mengeja password panjang. Kamera iPhone maupun Android dapat mengenali data jaringan dan langsung menghubungkannya.

## Cara membuat kode QR Wi-Fi

1. Buka [generator kode QR](/id/generator-kode-qr).
2. Pilih mode **Wi-Fi**.
3. Masukkan nama jaringan dan password Wi-Fi Anda.
4. Unduh gambar QR code dan cetak untuk ditempel di meja atau dinding.

Gunakan [generator kata sandi](/id/generator-kata-sandi) untuk membuat password acak yang kuat terlebih dahulu.
`,
      },
      it: {
        title: "Condividi il Wi-Fi senza dettare la password",
        description: "Connetti gli ospiti tramite un codice QR stampato. Le fotocamere di smartphone leggono i dati e collegano il dispositivo al primo tocco.",
        body: `
Collega visitatori e clienti alla tua rete Wi-Fi tramite un codice QR stampato, senza dover dettare combinazioni complesse di caratteri. Le fotocamere di iOS e Android leggono i parametri di rete e si connettono con un singolo tocco.

## Come generare il codice QR per il Wi-Fi

1. Apri il nostro [generatore di codici QR](/it/generatore-di-codici-qr).
2. Seleziona la modalità **Wi-Fi**.
3. Inserisci il nome esatto della rete (SSID) e la password.
4. Scarica il codice QR e stampalo.

Crea prima una password robusta con il nostro [generatore di password](/it/generatore-di-password).
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 3: Sign a PDF Without Paying for DocuSign
   * ─────────────────────────────────────────────────── */
  {
    slug: "sign-pdf-free-browser",
    publishedAt: "2026-11-21",
    toolIds: ["sign-pdf", "pdf-forms", "merge-pdf"],
    locale: {
      en: {
        title: "How to Sign a PDF Without Paying for DocuSign",
        description: "Sign PDF forms and agreements directly in your browser. Draw, type, or upload a signature with zero server uploads.",
        body: `
You do not need a $10 monthly DocuSign plan to sign a one-off PDF. You can sign any document directly in your browser using local canvas tools. Your document never touches a remote server.

## Why paid subscriptions make little sense for one-off forms

Most people sign fewer than three legal documents a year: a residential lease, a freelance scope of work, or a school permission slip. Subscription services lock basic PDF signing behind recurring paywalls:

- **DocuSign:** Charges $10 to $40 per user every month.
- **Adobe Acrobat Pro:** Charges $19.99 monthly with annual commitments.
- **Paywall gates:** Free trials demand credit card numbers and automatically bill after seven days.

## Is a browser-signed PDF legally valid?

Yes. Under the United States ESIGN Act (2000) and the European Union eIDAS regulation, electronic signatures carry legal validity for standard commercial agreements. The key legal requirements are:

1. **Intent to sign:** You deliberately apply your name or mark.
2. **Consent to do business electronically:** Both parties accept digital copies.
3. **Association of signature with the record:** The mark is placed directly on the signed PDF bytes.

Unless your jurisdiction explicitly mandates a qualified cryptographic certificate (common for real estate deeds or court filings), standard contracts accept browser-signed electronic signatures.

## How to sign your PDF locally

1. Open our [Sign PDF](/sign-pdf) utility.
2. Drag and drop your document into the browser window.
3. Choose your signature method:
   - **Draw:** Sketch your signature with your mouse, trackpad, or finger.
   - **Type:** Enter your full legal name using an ink-style cursive font.
   - **Upload:** Select a transparent PNG image of your physical signature.
4. Drag the signature box onto the designated signature line.
5. Click **Download signed PDF**.

The entire operation runs inside your browser using client-side JavaScript. The PDF bytes remain inside your computer memory throughout the process.

## Fill PDF form fields before signing

If your document has interactive text fields or checkboxes, open it in our [PDF Forms](/pdf-forms) editor first. Complete the form data, save the document, and then apply your signature.

To combine multiple signed attachments or addenda into a single file, merge them using [Merge PDF](/merge-pdf).
`,
      },
      es: {
        title: "Cómo firmar un PDF sin pagar suscripciones de DocuSign",
        description: "Firma acuerdos y documentos PDF directamente en tu navegador. Dibuja, escribe o sube tu firma sin enviar archivos a servidores externos.",
        body: `
No necesitas pagar una cuota mensual de 10 € en DocuSign para firmar un contrato esporádico. Puedes firmar cualquier PDF directamente en tu navegador mediante herramientas locales de dibujo. El documento permanece en tu equipo en todo momento.

## ¿Es legalmente válida una firma realizada en el navegador?

Sí. La normativa eIDAS en la Unión Europea y la ley ESIGN en Estados Unidos reconocen la validez jurídica de las firmas electrónicas simples en contratos privados, acuerdos laborales y autorizaciones cotidianas.

## Pasos para firmar un PDF de forma local

1. Abre la herramienta [Firmar PDF](/es/firmar-pdf).
2. Selecciona o arrastra tu archivo PDF.
3. Elige tu método preferido: dibujar a mano alzada, escribir tu nombre o subir una imagen de tu firma en PNG.
4. Arrastra la firma hasta la línea correspondiente en el documento.
5. Descarga el archivo firmado directamente.

## Completa formularios antes de firmar

Si el PDF contiene casillas interactivas, usa [Formularios PDF](/es/formularios-pdf) para rellenar los datos antes de estampar tu firma.
`,
      },
      fr: {
        title: "Comment signer un PDF sans payer d'abonnement DocuSign",
        description: "Signez vos documents et contrats PDF dans votre navigateur. Dessinez, tapez ou importez votre signature sans envoyer vos fichiers à un serveur.",
        body: `
Il n'est pas nécessaire de souscrire un abonnement payant à DocuSign pour signer un document occasionnel. Vous pouvez apposer votre signature directement dans votre navigateur grâce à des outils locaux. Votre document ne quitte jamais votre ordinateur.

## Valeur juridique de la signature électronique

Conformément au règlement européen eIDAS, la signature électronique simple possède une valeur juridique pour les contrats commerciaux courants, baux d'habitation et attestations.

## Comment signer votre document

1. Accédez à notre outil [Signer PDF](/fr/signer-pdf).
2. Glissez votre fichier dans la fenêtre.
3. Choisissez de dessiner votre signature ou d'importer une image PNG.
4. Positionnez la signature à l'emplacement souhaité.
5. Téléchargez le document finalisé.

Pour remplir au préalable des champs éditables, utilisez notre outil [Formulaires PDF](/fr/formulaires-pdf).
`,
      },
      de: {
        title: "PDF kostenlos unterschreiben ohne teures DocuSign-Abo",
        description: "Unterschreiben Sie PDF-Dokumente direkt im Browser. Zeichnen oder laden Sie Ihre Unterschrift hoch, ohne Daten an fremde Server zu senden.",
        body: `
Sie benötigen kein monatliches kostenpflichtiges Abonnement, um gelegentlich ein PDF-Dokument zu unterzeichnen. Sie können Verträge direkt im Browser bearbeiten, ohne dass Ihre vertraulichen Dokumente auf externe Server hochgeladen werden.

## Rechtliche Gültigkeit digitaler Signaturen

Nach der europäischen eIDAS-Verordnung sind einfache elektronische Signaturen für die meisten alltäglichen Verträge, Vollmachten und Vereinbarungen rechtsgültig anerkannt.

## So unterschreiben Sie Ihr Dokument

1. Öffnen Sie unser Tool [PDF-Unterschrift](/de/pdf-unterschreiben).
2. Dokument per Drag-and-Drop einfügen.
3. Unterschrift zeichnen, eintippen oder als PNG-Datei hochladen.
4. Signatur auf der Signaturzeile platzieren.
5. Unterzeichnetes Dokument direkt herunterladen.
`,
      },
      "pt-BR": {
        title: "Como assinar PDF sem pagar mensalidade no DocuSign",
        description: "Assine contratos e termos em PDF direto no seu navegador. Desenhe, digite ou envie sua assinatura com total privacidade.",
        body: `
Você não precisa pagar assinaturas caras para assinar contratos esporádicos. Assine documentos diretamente no seu navegador, sem que seus arquivos sejam transferidos para servidores de terceiros.

## Como assinar passo a passo

1. Abra a ferramenta [Assinar PDF](/pt-BR/assinar-pdf).
2. Carregue o arquivo PDF no navegador.
3. Desenhe sua assinatura com o mouse ou carregue uma imagem PNG.
4. Posicione a assinatura no campo indicado.
5. Baixe o PDF assinado instantaneamente.

Para preencher formulários antes de assinar, acesse [Formulários PDF](/pt-BR/formularios-pdf).
`,
      },
      ar: {
        title: "كيف توقّع مستند PDF مجانًا دون اشتراك في DocuSign",
        description: "وقّع مستنداتك وعقودك مباشرة داخل المتصفح. ارسم توقيعك أو ارفعه كصورة دون إرسال ملفاتك لأي خادم خارجي.",
        body: `
لا تحتاج لدفع اشتراكات شهرية لتوقيع عقد أو استمارة من حين لآخر. يمكنك وضع توقيعك الرقمي مباشرة داخل متصفحك دون رفع المستند إلى أي خوادم خارجية.

## طريقة التوقيع محليًا

1. توجه إلى أداة [توقيع PDF](/ar/توقيع-pdf).
2. اسحب ملف PDF وأفلته داخل الصفحة.
3. اختر طريقة التوقيع: الرسم المباشر أو رفع صورة التوقيع.
4. حرّك التوقيع إلى المكان المخصص له في المستند.
5. قم بتحميل الملف الموقع فورًا.

لتعبئة الحقول النصية قبل التوقيع، استخدم [نماذج PDF](/ar/نماذج-pdf).
`,
      },
      ja: {
        title: "DocuSignの有料プランなしでPDFに署名する方法",
        description: "ブラウザ上でPDF文書に直接サイン。手書きや画像アップロードに対応し、ファイルが外部サーバーに送信されることはありません。",
        body: `
たまに発生するPDFへのサインのために、毎月高額なサブスクリプション料金を支払う必要はありません。ブラウザ内のローカル処理で、安全かつ素早く電子署名を配置できます。

## ブラウザで署名する手順

1. [PDF署名](/ja/pdf署名)ツールを開きます。
2. PDFファイルをドラッグ＆ドロップします。
3. マウスで手書きするか、署名画像を配置します。
4. 署名の位置とサイズを調整します。
5. 署名済みPDFをダウンロードします。

事前に記入欄を入力する場合は[PDFフォーム入力](/ja/pdfフォーム入力)をご利用ください。
`,
      },
      hi: {
        title: "DocuSign के महंगे प्लान के बिना PDF पर हस्ताक्षर कैसे करें",
        description: "ब्राउज़र में सीधे PDF फॉर्म और अनुबंधों पर हस्ताक्षर करें। आपकी फ़ाइलें कभी किसी बाहरी सर्वर पर अपलोड नहीं होतीं।",
        body: `
कभी-कभार आने वाले दस्तावेजों पर हस्ताक्षर करने के लिए मासिक शुल्क देने की आवश्यकता नहीं है। आप अपने कंप्यूटर या मोबाइल ब्राउज़र में पूरी सुरक्षा के साथ हस्ताक्षर जोड़ सकते हैं।

## हस्ताक्षर करने का आसान तरीका

1. हमारा [PDF हस्ताक्षर](/hi/pdf-हस्ताक्षर) टूल खोलें।
2. अपना PDF दस्तावेज़ लोड करें।
3. माउस से हस्ताक्षर बनाएं या हस्ताक्षर की छवि चुनें।
4. हस्ताक्षर को सही स्थान पर रखें।
5. हस्ताक्षरित PDF तुरंत डाउनलोड करें।

फॉर्म भरने के लिए पहले [PDF फॉर्म](/hi/pdf-फॉर्म) का उपयोग करें।
`,
      },
      id: {
        title: "Cara Menandatangani PDF Tanpa Membayar Langganan DocuSign",
        description: "Tandatangani dokumen PDF langsung di browser Anda. Gambar atau unggah tanda tangan tanpa mengirim file ke server eksternal.",
        body: `
Anda tidak perlu berlangganan layanan berbayar hanya untuk menandatangani dokumen sesekali. Lakukan tanda tangan digital langsung di browser dengan aman tanpa mengunggah file ke server mana pun.

## Langkah menandatangani PDF secara lokal

1. Buka alat [Tanda Tangan PDF](/id/tanda-tangan-pdf).
2. Masukkan file PDF Anda.
3. Gambar tanda tangan atau gunakan gambar tanda tangan Anda.
4. Letakkan tanda tangan di posisi yang sesuai.
5. Unduh file PDF yang telah ditandatangani.

Untuk mengisi formulir sebelum menandatangani, gunakan [Formulir PDF](/id/formulir-pdf).
`,
      },
      it: {
        title: "Come firmare un PDF senza pagare l'abbonamento DocuSign",
        description: "Firma contratti e moduli PDF direttamente nel tuo browser. Disegna o carica la tua firma senza inviare file a server terzi.",
        body: `
Non serve pagare canoni mensili per firmare documenti occasionali. Puoi apporre la tua firma digitale direttamente nel browser in locale, garantendo la riservatezza assoluta dei tuoi dati.

## Come firmare il documento in locale

1. Apri lo strumento [Firma PDF](/it/firma-pdf).
2. Trascina il tuo file PDF nella finestra.
3. Scegli se disegnare la firma o caricare un'immagine trasparente.
4. Colloca la firma nello spazio dedicato.
5. Scarica il file firmato.

Se devi prima compilare campi modulo, usa [Moduli PDF](/it/moduli-pdf).
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 4: How to Tell If an Online Tool Uploads Your Files
   * ─────────────────────────────────────────────────── */
  {
    slug: "online-tools-upload-files-privacy",
    publishedAt: "2026-11-22",
    toolIds: ["merge-pdf", "image-compressor", "password-generator"],
    locale: {
      en: {
        title: "How to Tell If an Online Tool Uploads Your Files",
        description: "Most online PDF and image utilities upload your documents to remote cloud storage. Learn how to verify any tool in 10 seconds using browser DevTools.",
        body: `
Most free online PDF and image utilities upload your documents to remote cloud storage for server-side processing. You can verify whether a site actually processes your files locally using your browser developer tools in 10 seconds before submitting sensitive paperwork.

## What happens when you upload documents to a free website?

When a website processes files server-side, your browser transfers the entire file payload over an HTTP POST request to a remote server. That server:

- **Receives complete copies:** The server disk stores contracts, bank records, and personal tax identification numbers.
- **Retains cached copies:** Even when sites claim "files are deleted after 1 hour", backup snapshots and log pipelines can retain copies indefinitely.
- **Creates breach liability:** If that third-party cloud bucket is misconfigured, your sensitive documents become publicly indexable.

## How do I verify a tool runs locally?

You do not need to take a developer's privacy promise on trust. You can inspect network activity yourself in Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari:

1. Press **F12** (or right-click anywhere and select **Inspect**).
2. Click the **Network** tab in the developer tools panel.
3. Ensure the recording circle is active (red).
4. Drop a file into the tool and run the operation (such as merging two PDFs or compressing an image).
5. Review the requests logged in the table.

### What the network signals mean:

| Observation | What it means | Privacy status |
|---|---|---|
| Large POST request with bytes matching your file | File uploaded to remote server | Cloud processing (data leaves machine) |
| Requests targeting AWS, GCP, or third-party APIs | Document sent to remote processing pipeline | Cloud processing |
| Zero file transfer requests in Network tab | Processing executed via WebAssembly or local JavaScript | Local client-side (safe) |

## Cloud processing versus client-side processing

| Dimension | Remote server processing | Client-side processing |
|---|---|---|
| Execution engine | Remote Linux worker instances | Local browser V8 / WebAssembly engine |
| Privacy posture | Document transmitted across public internet | Zero bytes transmitted |
| Network requirement | Consumes full file upload and download bandwidth | Works offline once cached |
| Speed constraint | Bound by home internet upload speed | Bound only by local CPU speed |

## Test it on our tools

Open our [PDF merger](/merge-pdf) or [image compressor](/image-compressor) with your Network tab open. You will observe zero outbound file transfer requests. All image resampling and PDF manipulation happens locally in memory.
`,
      },
      es: {
        title: "Cómo comprobar si una herramienta web sube tus archivos",
        description: "La mayoría de utilidades online envían tus documentos a la nube. Aprende a verificar cualquier herramienta en 10 segundos con las herramientas del navegador.",
        body: `
Muchas utilidades gratuitas para unir PDF o comprimir imágenes envían tus archivos a servidores remotos para su procesamiento. Puedes comprobar tú mismo si una página web procesa tus documentos de forma local en menos de 10 segundos usando las herramientas de desarrollador de tu navegador.

## ¿Qué ocurre cuando subes un documento a un servidor externo?

El navegador envía el archivo completo a través de una petición HTTP POST a un servidor en la nube. Ese servidor almacena temporalmente contratos, nóminas o documentos de identidad, exponiéndote a posibles fugas de datos o fallos de seguridad en sus copias de seguridad.

## Cómo comprobar la actividad de red paso a paso

1. Pulsa la tecla **F12** en tu teclado (o haz clic derecho y elige **Inspeccionar**).
2. Haz clic en la pestaña **Red** (Network).
3. Usa la herramienta (por ejemplo, une dos PDF o comprime una foto).
4. Revisa la lista de peticiones generadas:
   - Si aparece una petición POST cuyo tamaño coincide con el peso de tu archivo, el documento ha salido de tu ordenador.
   - Si no se registra ninguna petición de envío de datos, el procesamiento se ha realizado en la memoria de tu navegador.

Pruébalo ahora en nuestro [unir PDF](/es/unir-pdf) o en el [compresor de imágenes](/es/compresor-de-imagenes). Comprobarás que ningún archivo viaja a servidores externos.
`,
      },
      fr: {
        title: "Comment vérifier si un outil en ligne envoie vos fichiers",
        description: "La plupart des convertisseurs en ligne transfèrent vos données sur leurs serveurs. Vérifiez n'importe quel site en 10 secondes avec les outils de développement.",
        body: `
La plupart des outils gratuits de traitement de PDF ou d'images envoient vos fichiers sur des serveurs distants. Vous pouvez vérifier en 10 secondes si un outil fonctionne réellement en local grâce aux outils de développement de votre navigateur.

## Comment vérifier le réseau en direct

1. Appuyez sur **F12** (ou clic droit puis **Inspecter**).
2. Ouvrez l'onglet **Réseau** (Network).
3. Effectuez l'opération sur le site (fusion de PDF ou compression).
4. Analysez les requêtes enregistrées:
   - Une requête POST de plusieurs mégaoctets indique que votre fichier a été envoyé sur un serveur tiers.
   - L'absence de requêtes de transfert prouve un traitement purement local dans votre navigateur.

Testez notre [fusionner PDF](/fr/fusionner-pdf) ou notre [compresseur d'images](/fr/compresseur-d-images) avec l'onglet Réseau ouvert pour constater qu'aucune donnée n'est transmise.
`,
      },
      de: {
        title: "So prüfen Sie, ob Online-Tools Ihre Dateien hochladen",
        description: "Viele Online-Dienste verarbeiten Dokumente auf externen Servern. Prüfen Sie mit den Browser-Entwicklertools in 10 Sekunden, ob Daten übertragen werden.",
        body: `
Zahlreiche kostenlose PDF- und Bildbearbeitungstools übertragen Dokumente auf externe Server. Mit den Entwicklertools Ihres Browsers können Sie innerhalb von 10 Sekunden selbst überprüfen, ob ein Werkzeug Dateien lokal verarbeitet oder ins Rechenzentrum hochlädt.

## Schritt-für-Schritt-Prüfung im Browser

1. Drücken Sie **F12** (oder Rechtsklick auf die Seite und **Untersuchen** wählen).
2. Wechseln Sie auf den Reiter **Netzwerk** (Network).
3. Führen Sie die Aktion aus (z. B. PDF zusammenfügen oder Bild komprimieren).
4. Beobachten Sie die übertragenen Daten:
   - Sehen Sie eine große POST-Anfrage in der Größe Ihrer Datei, wird das Dokument hochgeladen.
   - Erscheint keine Übertragungsanfrage, findet die Verarbeitung lokal auf Ihrem Rechner statt.

Testen Sie unser Werkzeug [PDF zusammenführen](/de/pdf-zusammenfuhren) mit geöffnetem Netzwerk-Tab.
`,
      },
      "pt-BR": {
        title: "Como saber se uma ferramenta online envia seus arquivos",
        description: "Muitos sites de PDF transferem seus documentos para a nuvem. Descubra em 10 segundos com as ferramentas do navegador se seus dados estão seguros.",
        body: `
Muitas ferramentas gratuitas de PDF e imagem transferem seus arquivos para servidores remotos para processamento. Você pode verificar em 10 segundos se o processamento é feito localmente no seu computador usando as ferramentas de desenvolvedor do próprio navegador.

## Como fazer a verificação em 4 passos

1. Pressione **F12** no teclado (ou clique com o botão direito e selecione **Inspecionar**).
2. Abra a aba **Rede** (Network).
3. Execute o processamento do arquivo na página.
4. Verifique as requisições:
   - Se houver uma requisição POST com o tamanho do seu arquivo, ele foi enviado para a nuvem.
   - Se nenhuma requisição de envio for registrada, o processamento ocorreu 100% no seu navegador.

Teste em nosso [mesclar PDF](/pt-BR/mesclar-pdf) ou no [compressor de imagens](/pt-BR/compressor-de-imagens).
`,
      },
      ar: {
        title: "كيف تتأكد أن الأداة لا ترفع ملفاتك لخوادم خارجية",
        description: "معظم مواقع معالجة الملفات ترسل بياناتك إلى خوادم سحابية. تعلم كيف تفحص أي أداة خلال 10 ثوانٍ عبر متصفحك.",
        body: `
تقوم معظم أدوات الويب المجانية بمعالجة ملفات PDF والصور عبر خوادم سحابية خارجية، مما قد يعرض مستنداتك الشخصية للتخزين المؤقت أو التسريب. يمكنك التحقق بنفسك خلال 10 ثوانٍ عبر أدوات المطور في متصفحك.

## طريقة فحص نشاط الشبكة

1. اضغط على مفتاح **F12** من لوحة المفاتيح (أو انقر بالزر الأيمن واختر **فحص العنصر**).
2. انتقل إلى تبويب **الشبكة** (Network).
3. قم بتنفيذ العملية على الملف (مثل دمج ملفين أو ضغط صورة).
4. راقب الطلبات المسجلة:
   - إذا ظهر طلب POST بحجم مقارب لحجم ملفك، فهذا يعني أن الملف رُفع لخادم خارجي.
   - إذا لم يتم إرسال طلبات بحجم الملف، فإن المعالجة تمت بالكامل داخل جهازك.

جرّب ذلك الآن مع أداة [دمج PDF](/ar/دمج-pdf) أو [ضغط الصور](/ar/ضغط-الصور).
`,
      },
      ja: {
        title: "オンラインツールがファイルをアップロードしているか確認する方法",
        description: "多くのPDFツールはファイルを外部サーバーに送信します。ブラウザの開発者ツールを使い、10秒で安全性を確認する方法を解説します。",
        body: `
多くの無料PDFツールや画像圧縮サイトは、処理のためにファイルを外部サーバーへ転送しています。ブラウザの開発者ツールを使えば、本当にファイルがローカル環境だけで処理されているかを誰でも10秒で検証できます。

## 開発者ツールでの確認手順

1. キーボードの **F12** キーを押します（または画面を右クリックして「検証」を選択）。
2. **Network**（ネットワーク）タブを開きます。
3. ツールでファイル処理を実行します。
4. 通信ログを確認します:
   - ファイルサイズと同等の大容量POSTリクエストが発生している場合、ファイルは外部サーバーへ送信されています。
   - 送信リクエストが発生していなければ、すべての処理はお使いのブラウザ内部で完結しています。

ぜひ当サイトの[PDF結合](/ja/pdf結合)や[画像圧縮](/ja/画像圧縮)でネットワークタブを開いてお確かめください。
`,
      },
      hi: {
        title: "कैसे जांचें कि कोई ऑनलाइन टूल आपकी फ़ाइलें अपलोड करता है या नहीं",
        description: "ज़्यादातर मुफ़्त टूल्स आपकी फ़ाइलों को सर्वर पर भेजते हैं। 10 सेकंड में ब्राउज़र डेवलपर टूल्स से खुद जांचना सीखें।",
        body: `
अधिकतर मुफ्त ऑनलाइन PDF और इमेज टूल्स फाइलों को प्रोसेस करने के लिए बाहरी सर्वर पर भेजते हैं। आप अपने ब्राउज़र के डेवलपर टूल्स का उपयोग करके केवल 10 सेकंड में खुद जांच सकते हैं कि टूल डेटा अपलोड करता है या लोकल ब्राउज़र में काम करता है।

## जांच करने का आसान तरीका

1. कीबोर्ड पर **F12** दबाएं (या राइट-क्लिक करके **Inspect** चुनें)।
2. **Network** टैब पर जाएं।
3. टूल में फाइल डालकर प्रोसेस करें।
4. नेटवर्क लॉग देखें:
   - यदि आपकी फाइल के साइज का कोई POST रिक्वेस्ट दिखता है, तो फाइल सर्वर पर गई है।
   - यदि कोई अपलोड रिक्वेस्ट नहीं दिखती, तो सारा काम सीधे आपके डिवाइस के अंदर हुआ है।

हमारे [PDF मर्ज](/hi/pdf-मर्ज-करें) टूल के साथ इसे अभी जांचें।
`,
      },
      id: {
        title: "Cara Mengetahui Apakah Alat Online Mengunggah File Anda",
        description: "Banyak utilitas web mengirim dokumen Anda ke server jarak jauh. Periksa dalam 10 detik menggunakan Developer Tools browser Anda.",
        body: `
Banyak alat pengolah PDF dan gambar gratis mengirimkan dokumen Anda ke server eksternal untuk diproses. Anda dapat memeriksa sendiri apakah sebuah situs benar-benar memproses data secara lokal dalam waktu 10 detik menggunakan Developer Tools di browser.

## Langkah memeriksa aktivitas jaringan

1. Tekan tombol **F12** (atau klik kanan lalu pilih **Inspect**).
2. Klik tab **Network**.
3. Jalankan pemrosesan file pada halaman web tersebut.
4. Periksa log permintaan jaringan:
   - Jika ada permintaan POST sebesar ukuran file Anda, dokumen tersebut telah dikirim ke cloud.
   - Jika tidak ada permintaan pengunggahan data yang tercatat, proses berjalan murni di memori browser Anda.

Uji langsung pada alat [gabung PDF](/id/gabung-pdf) atau [kompres gambar](/id/kompres-gambar) kami.
`,
      },
      it: {
        title: "Come verificare se uno strumento online carica i tuoi file",
        description: "Molte utility web trasferiscono i tuoi documenti sul cloud. Scopri come verificare qualsiasi sito in 10 secondi tramite gli strumenti di sviluppo.",
        body: `
Molti strumenti online per PDF o immagini trasferiscono i documenti su server remoti per la conversione. Puoi verificare autonomamente in 10 secondi se un'applicazione elabora i tuoi dati in locale usando gli strumenti per sviluppatori del browser.

## Procedura di verifica in 4 passaggi

1. Premi il tasto **F12** (oppure fai clic con il tasto destro e scegli **Ispeziona**).
2. Seleziona la scheda **Rete** (Network).
3. Elabora un file tramite lo strumento desiderato.
4. Controlla le richieste registrate:
   - Se compare una richiesta POST di dimensioni comparabili a quelle del file, il documento è stato inviato a un server esterno.
   - Se non compaiono richieste di upload, il file è stato gestito interamente nella memoria locale del tuo computer.

Verificalo tu stesso con i nostri strumenti [unisci PDF](/it/unisci-pdf) e [comprimi immagini](/it/comprimi-immagini).
`,
      },
    },
  },
];

/* ── Helpers ── */

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostLocale(slug: string, locale: string): (BlogPost & { content: BlogLocale }) | undefined {
  const post = getBlogPost(slug);
  if (!post) return undefined;
  const content = post.locale[locale] ?? post.locale.en;
  if (!content) return undefined;
  return { ...post, content };
}

export function allBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function blogPostsForLocale(locale: string): (BlogPost & { content: BlogLocale })[] {
  return blogPosts.flatMap((post) => {
    const content = post.locale[locale] ?? post.locale.en;
    return content ? [{ ...post, content }] : [];
  });
}
