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

  /* ───────────────────────────────────────────────────
   * Post 5: How to Count Words in an Essay: Rules & Tools
   * ─────────────────────────────────────────────────── */
  {
    slug: "count-words-essay-rules-tools",
    publishedAt: "2026-11-23",
    toolIds: ["word-counter", "character-counter"],
    locale: {
      en: {
        title: "How to Count Words in an Essay: Rules & Tools",
        description: "Learn the exact rules universities and publishers use to count words, including what counts as a word, how hyphenated terms and contractions are handled, and how to get an instant accurate count.",
        body: `
Whether you are writing a college application essay with a strict 650-word limit or submitting a journal article capped at 5,000 words, knowing exactly how words are counted prevents painful last-minute cuts and awkward padding. Different institutions apply surprisingly different rules, and the word count your text editor shows may not match what a reviewer expects.

## What counts as a word?

The simplest definition is any string of characters separated by whitespace. But real-world word counting adds nuance:

- **Hyphenated compounds:** "well-known" counts as one word in most style guides (APA, Chicago, MLA). Microsoft Word counts it as one, Google Docs counts it as two. If your submission platform matters, check its behavior.
- **Contractions:** "don't" and "can't" are each one word everywhere. "Do not" is two words.
- **Numbers:** "42" is one word. "Forty-two" is one word (hyphenated compound) or two, depending on the style guide.
- **Abbreviations and acronyms:** "NASA" is one word. "N.A.S.A." (with periods) is also one word.
- **Citations and references:** APA guidelines exclude the references page from word count. MLA typically includes in-text citations but excludes the Works Cited page.
- **Headers and titles:** Most academic submissions include headers in the word count unless instructions say otherwise.

## Why your word processor count may be wrong

Microsoft Word, Google Docs, and Pages each use slightly different tokenizers:

| Feature | Microsoft Word | Google Docs |
|---|---|---|
| Hyphenated words | 1 word | 2 words |
| Footnote text | Excluded by default | Excluded by default |
| Text boxes and headers | Excluded | Excluded |
| Em dashes (word—word) | 2 words | 2 words |

If you are pasting from multiple sources into a single document, inconsistent whitespace characters (non-breaking spaces, zero-width joiners) can silently inflate or deflate your count.

## Common word count limits by context

- **College admission essays:** Common App limits you to 650 words. Coalition Application essays are 500–650 words.
- **Graduate school statements of purpose:** Typically 500–1,000 words, though some programs allow up to 1,500.
- **Academic journal articles:** Social sciences average 6,000–8,000 words. STEM journals often cap abstracts at 250 words.
- **Blog posts for SEO:** Top-ranking Google results average 1,400–1,700 words for competitive queries.
- **Professional cover letters:** Best kept between 250–400 words.

## How to get an accurate, platform-independent count

Paste your text into our [word counter](/word-counter) tool. It tokenizes your text using Unicode-aware boundary detection, so hyphenated words, smart quotes, and multilingual text are handled consistently. You also get:

- **Character count** (with and without spaces)
- **Sentence count** and average sentence length
- **Paragraph count**
- **Estimated reading time** (based on 238 words per minute for adult readers)

For character-limited submissions like tweets or meta descriptions, switch to the [character counter](/character-counter) which shows real-time counts as you type.

## Tips to hit a word count target without padding

If you are under the limit:
1. **Expand your weakest argument.** Add a supporting example or data point to the paragraph with the least evidence.
2. **Add a transitional sentence** between sections to improve flow.
3. **Quote a source directly** instead of paraphrasing (quotes add words and credibility).

If you are over the limit:
1. **Cut adverbs and filler phrases.** "In order to" becomes "to." "Due to the fact that" becomes "because."
2. **Merge short paragraphs** that make the same point.
3. **Replace clauses with single words.** "At this point in time" becomes "now."

## FAQ

**Does the title count toward the word limit?**
It depends on the submission guidelines. College application essays on the Common App do not count the title. Academic journals typically count everything in the manuscript body.

**Are footnotes included in word count?**
Generally no. APA, Chicago, and most journal guidelines exclude footnotes and endnotes from the stated word limit. Always check your specific submission requirements.

**How do I count words in a PDF?**
Copy the text from the PDF, paste it into the [word counter](/word-counter), and check the count. For scanned PDFs, you will need to run OCR first to extract the text layer.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 6: Merge PDF Files Without Uploading to Any Server
   * ─────────────────────────────────────────────────── */
  {
    slug: "merge-pdf-without-uploading",
    publishedAt: "2026-11-23",
    toolIds: ["merge-pdf", "organize-pdf", "compress-pdf"],
    locale: {
      en: {
        title: "Merge PDF Files Without Uploading to Any Server",
        description: "Combine multiple PDF documents into one file entirely in your browser. No server uploads, no file size limits, no account required.",
        body: `
Merging PDF files should not require trusting a third-party server with your tax returns, medical records, or signed contracts. Most popular PDF merge websites upload your documents to cloud servers for processing, creating unnecessary privacy risks. There is a better way: merge PDFs entirely inside your browser with zero server contact.

## Why server-side PDF merging is a privacy risk

When you upload files to a typical online PDF merger:

1. **Your documents travel across the internet** in an HTTP POST request to a remote data center.
2. **The server stores temporary copies** on its disk or in object storage (like AWS S3 buckets).
3. **Deletion promises are unverifiable.** When a site says "files deleted after 1 hour," you have no way to confirm whether backup pipelines, CDN edge caches, or logging systems retain copies.
4. **Data breaches expose everything.** A single misconfigured S3 bucket can make thousands of users' private documents publicly accessible.

For non-sensitive documents like marketing brochures, server-side processing is fine. For anything containing personal information — financial statements, legal agreements, healthcare forms — you should demand local processing.

## How client-side PDF merging works

Modern browsers include powerful processing capabilities through WebAssembly and JavaScript typed arrays. A client-side PDF merger:

1. **Reads each PDF into browser memory** using the File API. The bytes never leave your machine.
2. **Parses the PDF cross-reference tables** to locate page objects, fonts, and embedded images within each file.
3. **Constructs a new PDF document** by copying page objects from each source file into a single output structure.
4. **Generates the merged file** as a downloadable blob URL, which your browser creates entirely from local memory.

The key difference: at no point does any network request carry your document bytes to an external server.

## Step-by-step: merge PDFs locally

1. Open the [Merge PDF](/merge-pdf) tool in your browser.
2. Drag and drop all the PDF files you want to combine.
3. Reorder the files by dragging them into your preferred sequence.
4. Click **Merge** and download the combined document.

Want to verify this claim? Open your browser's Network tab (press F12) before merging. You will see zero outbound file transfer requests.

## Advanced: reorder individual pages before merging

Sometimes you do not want to append entire documents sequentially. Perhaps you need page 3 from one contract, pages 1–2 from another, and an appendix from a third. Use the [Organize PDF](/organize-pdf) tool to:

- View thumbnail previews of every page across multiple PDFs
- Drag individual pages into any custom order
- Remove unwanted pages before combining
- Rotate specific pages that were scanned sideways

## Keep your merged file small

Merging multiple PDFs with high-resolution scanned images can produce a large file. If the result exceeds email attachment limits (typically 25 MB for Gmail), run it through the [Compress PDF](/compress-pdf) tool. It reduces file size by:

- Downsampling high-DPI images to screen-friendly resolution
- Removing duplicate font subsets embedded across the source files
- Stripping unnecessary metadata and editing history

All compression happens locally in your browser, maintaining the same privacy guarantee.

## FAQ

**Is there a file size limit for browser-based merging?**
The practical limit depends on your device's available RAM. Most modern computers can handle merging files totaling 200–500 MB without issues. For extremely large files (1 GB+), you may need a desktop application.

**Can I merge password-protected PDFs?**
Yes, if you know the password. You will need to unlock the PDF first using our unlock tool, then merge the unlocked version.

**Does merging PDFs reduce quality?**
No. PDF merging copies page objects exactly as they are. Text remains vector, images retain their original resolution, and fonts stay embedded. No re-encoding or re-compression occurs during a merge operation.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 7: Password Strength in 2026
   * ─────────────────────────────────────────────────── */
  {
    slug: "password-strength-2026",
    publishedAt: "2026-11-23",
    toolIds: ["password-generator", "base64"],
    locale: {
      en: {
        title: "Password Strength in 2026: What Makes a Strong Password",
        description: "Modern GPUs can test billions of password guesses per second. Learn what password length and complexity actually protect you in 2026 and how to generate uncrackable credentials.",
        body: `
In 2026, a consumer-grade GPU cluster can test over 100 billion password hashes per second against common algorithms like MD5. Even slower algorithms like bcrypt face attacks at millions of guesses per second. The old advice of "8 characters with a number and symbol" has not been adequate for years. Here is what actually makes a password strong today.

## How passwords get cracked

Attackers do not type passwords into login screens one at a time. They obtain hashed password databases through data breaches and then run offline cracking attacks:

1. **Dictionary attacks:** Try every word in multiple language dictionaries, including common substitutions (p@ssw0rd, h3llo).
2. **Rule-based attacks:** Apply thousands of transformation rules to dictionary words — append numbers, reverse strings, capitalize patterns.
3. **Brute force:** Systematically try every possible combination up to a certain length.
4. **Credential stuffing:** Use passwords leaked from other breaches, banking on password reuse.

The critical insight: password strength is measured in **entropy** — the number of possible combinations an attacker must search through.

## The math of password entropy

Entropy is calculated as: **log₂(possible characters ^ length)**

| Password type | Character pool | 8 chars entropy | 12 chars entropy | 16 chars entropy |
|---|---|---|---|---|
| Lowercase only | 26 | 37.6 bits | 56.4 bits | 75.2 bits |
| Lower + upper | 52 | 45.6 bits | 68.4 bits | 91.2 bits |
| Lower + upper + digits | 62 | 47.6 bits | 71.5 bits | 95.3 bits |
| All printable ASCII | 95 | 52.6 bits | 78.8 bits | 105.1 bits |

At 100 billion guesses per second (MD5):
- **37.6 bits** (8 lowercase): cracked in ~1.4 seconds
- **52.6 bits** (8 chars, full ASCII): cracked in ~1.1 hours
- **78.8 bits** (12 chars, full ASCII): cracked in ~95,000 years
- **95.3 bits** (16 chars, alphanumeric): cracked in ~12 million years

The lesson: **length matters far more than complexity.** A 16-character alphanumeric password is vastly stronger than an 8-character password with every special character.

## What makes a password truly strong in 2026

1. **Minimum 16 characters.** This is the new baseline. NIST updated its guidelines to recommend longer passwords over complex ones.
2. **Randomly generated, not human-chosen.** Humans are terrible at randomness. We gravitate toward patterns, keyboard walks (qwerty), and meaningful dates.
3. **Unique per account.** Password reuse means one breach compromises every account sharing that password.
4. **Stored in a password manager.** You cannot memorize 100+ unique 16-character random passwords. That is what password managers solve.

## Passphrases vs random strings

A passphrase like "correct horse battery staple" (4 random dictionary words from a 7,776-word list) provides approximately 51.7 bits of entropy. That is comparable to a random 8-character mixed-case password but much easier to type. For higher security, use 6+ words or combine a passphrase with random characters.

However, for accounts where you never type the password manually (most accounts if you use a password manager), a fully random string is strictly better per character.

## Generate strong passwords instantly

Use our [password generator](/password-generator) to create cryptographically random passwords. It uses your browser's \`crypto.getRandomValues()\` API — the same entropy source used by encryption libraries — to ensure true randomness. You can customize:

- **Length:** Set anywhere from 8 to 128 characters
- **Character sets:** Toggle uppercase, lowercase, digits, and symbols
- **Exclusions:** Remove ambiguous characters (0/O, 1/l/I) for passwords you must read aloud

The generator runs entirely in your browser. No passwords are transmitted or stored on any server.

## Common password myths debunked

**Myth: Changing passwords every 90 days improves security.**
Reality: NIST explicitly recommends against forced periodic rotation. It leads to predictable patterns (Password1, Password2, Password3) and weaker choices.

**Myth: Special characters make passwords significantly stronger.**
Reality: Adding one symbol to an 8-character password adds ~1 bit of entropy. Adding 4 more characters of any type adds ~24 bits.

**Myth: Writing passwords down is always bad.**
Reality: A written password in a locked drawer is safer than a reused password stored in your memory. A password manager is better than both.

## FAQ

**How long should my password be?**
At minimum 16 characters for important accounts. For high-value targets (email, banking, password manager master password), use 20+ characters.

**Are password managers safe?**
Yes. The risk of a password manager breach exposing your vault is far lower than the near-certainty that reused passwords will be compromised in a data breach. Use a strong master password and enable two-factor authentication.

**What is two-factor authentication and do I still need strong passwords with it?**
Two-factor authentication (2FA) adds a second verification step (like a code from your phone). It dramatically improves security, but strong passwords remain essential because 2FA can sometimes be bypassed through SIM swapping or phishing.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 8: JSON Formatting Best Practices for API Development
   * ─────────────────────────────────────────────────── */
  {
    slug: "json-formatting-best-practices-api",
    publishedAt: "2026-11-24",
    toolIds: ["json-formatter", "json-to-typescript", "json-to-python"],
    locale: {
      en: {
        title: "JSON Formatting Best Practices for API Development",
        description: "Write cleaner JSON payloads, debug API responses faster, and avoid common formatting mistakes. Practical tips for backend and frontend developers.",
        body: `
JSON is the lingua franca of modern APIs. Every REST endpoint, every webhook payload, every configuration file uses it. Yet poorly formatted JSON causes countless debugging hours — missing commas, mismatched brackets, inconsistent key naming, and invisible Unicode characters lurking in copy-pasted responses. Here are concrete best practices that save real development time.

## Why JSON formatting matters

Minified JSON is efficient for network transfer but unreadable for humans. When you are debugging a 500-character API response, you need to see the structure clearly:

**Minified (hard to debug):**
\`\`\`json
{"users":[{"id":1,"name":"Alice","roles":["admin","editor"],"preferences":{"theme":"dark","notifications":true}}]}
\`\`\`

**Formatted (instantly scannable):**
\`\`\`json
{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "roles": ["admin", "editor"],
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
  ]
}
\`\`\`

The formatted version reveals the data hierarchy in milliseconds. You immediately see that \`roles\` is an array, \`preferences\` is a nested object, and the entire response wraps in a \`users\` array.

## Common JSON mistakes that break APIs

**1. Trailing commas**
\`\`\`json
{ "name": "Alice", "age": 30, }
\`\`\`
JSON does not allow trailing commas. JavaScript does, which is why developers who write JSON by hand constantly introduce this error.

**2. Single quotes**
\`\`\`
{ 'name': 'Alice' }
\`\`\`
JSON requires double quotes around both keys and string values. No exceptions.

**3. Unquoted keys**
\`\`\`
{ name: "Alice" }
\`\`\`
This is valid JavaScript but invalid JSON. Every key must be a double-quoted string.

**4. Comments**
\`\`\`
{ "name": "Alice" // admin user }
\`\`\`
JSON has no comment syntax. If you need commented configuration files, use JSON5 or JSONC formats that explicitly support comments.

**5. Incorrect null handling**
\`\`\`json
{ "name": "Alice", "middleName": "" }
\`\`\`
An empty string is not the same as null. If a field has no value, use \`null\` explicitly. This distinction matters for database operations and API consumers that differentiate between "empty" and "not provided."

## Key naming conventions

Pick one convention and enforce it across your entire API:

| Convention | Example | Used by |
|---|---|---|
| camelCase | \`firstName\` | JavaScript/TypeScript APIs, React |
| snake_case | \`first_name\` | Python APIs, Ruby on Rails, PostgreSQL |
| kebab-case | \`first-name\` | Rare in JSON; common in URLs |

**Do not mix conventions.** An API that returns \`firstName\` in one endpoint and \`first_name\` in another creates confusion and forces consumers to maintain mapping layers.

## Format and validate JSON instantly

Paste any JSON payload into our [JSON formatter](/json-formatter) to:

- **Pretty-print** with configurable indentation (2 or 4 spaces, or tabs)
- **Validate** syntax and highlight the exact line and character position of errors
- **Minify** for production payloads
- **Sort keys** alphabetically for consistent diffing

When building typed applications, convert your JSON response directly into type definitions with [JSON to TypeScript](/json-to-typescript) or [JSON to Python](/json-to-python) to generate dataclass or Pydantic models from real API responses.

## FAQ

**Should I use 2-space or 4-space indentation?**
Two spaces is the dominant convention in the JavaScript ecosystem. Four spaces is common in Python and Java. Pick what your team uses and enforce it with a formatter.

**Is it better to send minified or formatted JSON in API responses?**
Always send minified JSON in production API responses. Enable gzip or Brotli compression on your server. Formatting is a client-side concern for debugging, not a server-side concern for transmission.

**How do I handle dates in JSON?**
JSON has no native date type. Use ISO 8601 strings (\`"2026-11-24T10:30:00Z"\`). Never use Unix timestamps in user-facing APIs unless your documentation explicitly states it.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 9: How to Compress Images Without Losing Quality
   * ─────────────────────────────────────────────────── */
  {
    slug: "compress-images-without-losing-quality",
    publishedAt: "2026-11-24",
    toolIds: ["image-compressor", "image-resizer"],
    locale: {
      en: {
        title: "How to Compress Images Without Losing Quality",
        description: "Reduce image file sizes by 60-80% while keeping them visually identical. Learn how modern compression works, which formats to use, and common mistakes to avoid.",
        body: `
A single unoptimized hero image can weigh 5 MB and add 3 seconds to your page load time on a mobile connection. Google's Core Web Vitals penalize slow-loading pages, pushing them down in search rankings. The good news: you can typically reduce image file sizes by 60–80% with zero perceptible quality loss using the right techniques.

## How image compression works

There are two fundamentally different approaches:

### Lossless compression
Lossless compression reduces file size by finding more efficient ways to encode the same pixel data. Every single pixel is preserved exactly. Think of it like zipping a file — the decompressed output is bit-for-bit identical to the input.

- **PNG** uses DEFLATE compression (similar to ZIP)
- **WebP lossless** typically achieves 25–34% smaller files than PNG
- Best for: screenshots, text overlays, logos, diagrams

### Lossy compression
Lossy compression discards visual information that humans cannot easily perceive. It exploits how human vision works — we are more sensitive to brightness changes than color shifts, and we cannot distinguish fine details in complex textures.

- **JPEG** uses Discrete Cosine Transform (DCT) to discard high-frequency detail
- **WebP lossy** achieves 25–35% smaller files than JPEG at equivalent visual quality
- **AVIF** achieves 50% smaller files than JPEG with better quality preservation
- Best for: photographs, complex images with gradients

## The quality slider: finding the sweet spot

JPEG and WebP quality is controlled by a 0–100 slider. Here is what happens at each range:

| Quality | File size reduction | Visual impact |
|---|---|---|
| 100 (maximum) | Minimal (~5%) | Perceptually identical to source |
| 80–90 | Significant (~60%) | No visible difference to the human eye |
| 60–79 | Major (~75%) | Slight softening in detailed areas |
| 40–59 | Extreme (~85%) | Noticeable artifacts around edges |
| Below 40 | Maximum (~90%+) | Obvious blockiness and color banding |

**The sweet spot is 80–85 for most photographs.** At this range, you get dramatic file size reduction with no perceptible quality loss in normal viewing conditions.

## Common compression mistakes

**1. Compressing already-compressed images**
Re-compressing a JPEG introduces generation loss. Each round of lossy compression compounds artifacts. Always start from the highest-quality source image.

**2. Using PNG for photographs**
PNG is lossless, which means a photograph saved as PNG can be 10x larger than the same image as a quality-85 JPEG with no visible difference. Reserve PNG for graphics with sharp edges, text, and transparency.

**3. Ignoring dimensions**
Compression reduces the bits per pixel, but if your image is 4000×3000 pixels and you display it at 800×600, you are transferring 25x more pixels than needed. Resize first, then compress.

**4. Not using modern formats**
WebP is supported by 97%+ of browsers. AVIF support is at 92%+. Both offer dramatically better compression than JPEG. If your audience uses modern browsers, switch formats.

## Compress images in your browser

Open our [image compressor](/image-compressor) and drop your images in. The tool processes everything locally in your browser using WebAssembly-based encoders:

- Adjust quality for JPEG and WebP outputs
- Preview the compressed result side-by-side with the original
- Download individually or as a batch ZIP file
- Zero file uploads — your images stay on your device

For images that need specific dimensions, use the [image resizer](/image-resizer) first to set exact width and height, then compress the resized output.

## FAQ

**What is the best image format in 2026?**
For photographs: AVIF if your stack supports it, WebP as a safe default, JPEG as a fallback. For graphics with transparency: WebP or PNG. For simple icons: SVG.

**How much should I compress images for a website?**
Target under 200 KB per image for above-the-fold content. For thumbnails, aim for 20–50 KB. Total page image weight should stay under 1 MB for good Core Web Vitals.

**Does compressing images affect SEO?**
Faster pages rank better. Google explicitly includes page speed (measured by Core Web Vitals) as a ranking signal. Properly compressed images directly improve your LCP (Largest Contentful Paint) score.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 10: QR Code Uses Beyond Links
   * ─────────────────────────────────────────────────── */
  {
    slug: "qr-code-uses-beyond-links",
    publishedAt: "2026-11-24",
    toolIds: ["qr-code-generator", "barcode-generator"],
    locale: {
      en: {
        title: "QR Code Uses Beyond Links: WiFi, Contact Cards & More",
        description: "QR codes can encode WiFi credentials, contact cards, calendar events, email templates, and more. Learn 8 practical uses most people overlook.",
        body: `
Most people think of QR codes as fancy URL shortcuts. Scan a code, open a website. But QR codes are really just containers for text data, and that text can be structured to trigger specific actions on smartphones. Here are eight practical QR code uses that go far beyond simple links.

## 1. WiFi network credentials

The most useful non-link QR code. Encode your WiFi network name, password, and security type into a standard format:

\`WIFI:T:WPA;S:YourNetworkName;P:YourPassword;;\`

When a smartphone camera scans this code, the operating system offers to join the network automatically. No typing, no spelling out characters, no sticky notes with passwords.

**Best for:** Home guest networks, Airbnb rentals, office visitor access, restaurant and cafe customer WiFi.

## 2. vCard contact information

Encode a complete digital business card:

\`\`\`
BEGIN:VCARD
VERSION:3.0
FN:Jane Smith
ORG:Acme Corp
TEL:+1-555-867-5309
EMAIL:jane@acme.com
URL:https://acme.com
END:VCARD
\`\`\`

Scanning this code prompts the phone to create a new contact with all fields pre-filled. No manual entry, no typos in email addresses.

**Best for:** Conference name badges, printed business cards, office door signs.

## 3. Calendar events

Add events directly to someone's calendar:

\`\`\`
BEGIN:VEVENT
SUMMARY:Team Standup
DTSTART:20261201T090000
DTEND:20261201T091500
LOCATION:Room 4B
END:VEVENT
\`\`\`

**Best for:** Event posters, conference schedules, workshop flyers, meetup announcements.

## 4. Email templates

Pre-compose an email with recipient, subject, and body:

\`mailto:support@example.com?subject=Account%20Issue&body=Hi%2C%20I%20need%20help%20with...\`

**Best for:** Customer feedback forms on receipts, support request cards at help desks, warranty registration cards.

## 5. Phone calls and SMS

Trigger a phone call: \`tel:+15558675309\`
Pre-compose a text: \`smsto:+15558675309:Your order is ready for pickup\`

**Best for:** Restaurant table tents ("Call for catering"), emergency contact signs, delivery notification systems.

## 6. Geographic locations

Open a map pin: \`geo:40.7128,-74.0060?q=Statue+of+Liberty\`

**Best for:** Event venue directions on invitations, tourist information signs, real estate property listings.

## 7. Plain text notes

QR codes can hold up to 4,296 alphanumeric characters. Use this for short instructions, serial numbers, or reference codes that people need to capture quickly.

**Best for:** Equipment maintenance tags, inventory tracking labels, instruction summaries on products.

## 8. App store links

Deep link to a specific app in the appropriate store: use a universal link that redirects iOS users to the App Store and Android users to Google Play.

**Best for:** Product packaging, marketing materials, in-store displays.

## Generate any QR code type

Our [QR code generator](/qr-code-generator) supports all these formats with dedicated input modes for WiFi, vCard, URL, email, phone, SMS, and plain text. Select the type, fill in the fields, and download a high-resolution PNG or SVG.

For traditional product barcodes (UPC, EAN, Code 128), use our [barcode generator](/barcode-generator) instead.

## Practical tips for printing QR codes

- **Minimum size:** Print QR codes at least 2 cm × 2 cm (0.8 inches) for reliable scanning at arm's length.
- **Contrast:** Black modules on a white background works best. Avoid low-contrast color combinations.
- **Quiet zone:** Maintain a white border around the code equal to 4 module widths.
- **Test before printing:** Always scan the generated code with at least two different phones before mass printing.

## FAQ

**How much data can a QR code hold?**
A single QR code holds up to 4,296 alphanumeric characters or 7,089 numeric characters. For most practical uses (URLs, WiFi, vCards), this is more than enough. Very long text will produce dense, harder-to-scan codes.

**Do QR codes expire?**
Static QR codes never expire — the data is encoded directly in the image. Dynamic QR codes (which redirect through a URL shortener) can expire if the redirect service stops working.

**Can QR codes be scanned from a screen?**
Yes. Phone cameras can scan QR codes displayed on monitors, laptops, projectors, and other screens. Adjust brightness if the screen is dim.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 11: Understanding Base64 Encoding
   * ─────────────────────────────────────────────────── */
  {
    slug: "base64-encoding-when-why",
    publishedAt: "2026-11-25",
    toolIds: ["base64", "url-encoder"],
    locale: {
      en: {
        title: "Understanding Base64 Encoding: When & Why to Use It",
        description: "Base64 converts binary data into text-safe characters. Learn how it works, when to use it, when to avoid it, and common misconceptions about security.",
        body: `
Base64 encoding is everywhere in web development — data URIs in HTML, email attachments, JWT tokens, API authentication headers. Yet many developers use it without fully understanding what it does, what it costs, and critically, what it does not do. Let us fix that.

## What Base64 actually does

Base64 converts arbitrary binary data into a string using only 64 safe ASCII characters: A–Z, a–z, 0–9, +, and /. The = character is used for padding.

The algorithm works in a simple loop:
1. Take 3 bytes of input (24 bits total).
2. Split those 24 bits into four 6-bit groups.
3. Map each 6-bit value (0–63) to one of the 64 characters.
4. If the input is not evenly divisible by 3, pad with = characters.

**Input:** \`Hello\` (5 bytes: 72, 101, 108, 108, 111)
**Output:** \`SGVsbG8=\` (8 characters)

The output is always approximately 33% larger than the input because you are representing 6 bits of data with 8 bits (one ASCII character).

## When to use Base64

**1. Embedding binary data in text formats**
HTML, CSS, JSON, and XML are text formats. If you need to include an image, font, or binary file inside them, Base64 is the standard approach:

\`\`\`html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUh..." />
\`\`\`

**2. Email attachments (MIME)**
Email protocols were designed for 7-bit ASCII text. Binary attachments (images, PDFs, zip files) are Base64-encoded in the MIME body so they survive transit through mail servers.

**3. HTTP Basic Authentication**
The Authorization header encodes credentials as Base64:
\`Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=\`

**4. JWT tokens**
JSON Web Tokens use Base64URL encoding (replacing + with - and / with _) for the header and payload segments.

**5. Storing binary data in JSON or databases**
When a text-only field needs to hold binary data, Base64 encoding is the most common solution.

## When NOT to use Base64

**1. As encryption or security**
Base64 is NOT encryption. It is trivially reversible. Anyone can decode \`dXNlcm5hbWU6cGFzc3dvcmQ=\` back to \`username:password\` in milliseconds. Never use Base64 to "hide" sensitive data.

**2. For large files in HTML**
Embedding a 500 KB image as a Base64 data URI means:
- The browser cannot cache the image separately from the HTML
- The HTML document grows by 667 KB (33% overhead)
- The browser must decode the entire string before rendering

For images above 1–2 KB, use separate files and proper caching.

**3. For URL parameters**
Standard Base64 uses + and / characters which have special meaning in URLs. Use URL-safe Base64 (Base64URL) or proper URL encoding instead.

## Base64 overhead calculator

| Input size | Base64 output size | Overhead |
|---|---|---|
| 1 KB | 1.33 KB | +33% |
| 100 KB | 133 KB | +33 KB |
| 1 MB | 1.33 MB | +330 KB |
| 10 MB | 13.3 MB | +3.3 MB |

The 33% overhead is constant and unavoidable. For bandwidth-sensitive applications, consider whether Base64 is truly necessary.

## Encode and decode Base64 instantly

Use our [Base64 encoder/decoder](/base64) to convert text or files to and from Base64. The tool handles both standard Base64 and URL-safe Base64URL variants, and processes everything locally in your browser.

For encoding special characters in URLs, the [URL encoder/decoder](/url-encoder) handles percent-encoding, which is different from Base64 and specifically designed for URL safety.

## FAQ

**Is Base64 encoding the same as encryption?**
Absolutely not. Base64 is a reversible encoding scheme, not an encryption algorithm. It provides zero confidentiality. Any Base64 string can be decoded back to the original data instantly without any key or secret.

**Why do JWT tokens use Base64?**
JWTs need to be transmitted in HTTP headers and URL parameters, which only support ASCII text. Base64URL encoding converts the binary JSON payload into URL-safe ASCII characters.

**Can I Base64-encode any file type?**
Yes. Base64 can encode any sequence of bytes — images, executables, compressed archives, anything. The output is always a text string of ASCII characters.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 12: PDF Accessibility: Adding Page Numbers & Structure
   * ─────────────────────────────────────────────────── */
  {
    slug: "pdf-page-numbers-structure",
    publishedAt: "2026-11-25",
    toolIds: ["add-page-numbers", "merge-pdf", "organize-pdf"],
    locale: {
      en: {
        title: "PDF Accessibility: Adding Page Numbers & Structure",
        description: "Professional documents need page numbers for navigation, citation, and printing. Learn where to place them, common formatting styles, and how to add them to existing PDFs.",
        body: `
Page numbers seem like a trivial detail until you are sitting in a meeting referencing "the chart on page 14" and nobody can find it because the PDF has no page numbers. Or a professor asks you to cite "page 23" of a report that was merged from three separate documents without renumbering. Page numbers are a fundamental structural element that makes documents navigable, citable, and professional.

## Why page numbers matter more than you think

**Navigation:** In a 50-page report, page numbers let readers jump directly to referenced sections. Without them, everyone scrolls and guesses.

**Legal and academic citation:** APA, MLA, Chicago, and legal citation formats all require page numbers. A source without page numbers cannot be properly cited, reducing its academic utility.

**Print reliability:** When a 30-page document prints on a shared office printer and the pages scatter, page numbers are the only way to reassemble them in order.

**Accessibility:** Screen readers can announce page numbers, helping visually impaired users navigate long documents.

## Page number placement conventions

Different document types follow different conventions:

| Document type | Position | Format |
|---|---|---|
| Academic papers (APA) | Top right header | Arabic numerals, starting from title page |
| Academic papers (MLA) | Top right header | Last name + page number (Smith 14) |
| Books | Bottom center or outside corners | Arabic numerals, Roman for front matter |
| Legal documents | Bottom center | Arabic numerals |
| Business reports | Bottom right or center | Arabic numerals, often with "Page X of Y" |
| Theses and dissertations | Bottom center | Roman numerals for preliminaries, Arabic for body |

## Common page numbering mistakes

**1. Starting from the wrong page**
Cover pages and title pages typically do not display a page number, even though they may be counted. A 20-page report with a cover should show "2" on the first content page, not "1."

**2. Inconsistent numbering after merging**
Merging three separate PDFs (each numbered 1 through 10) creates a 30-page document with three "page 1" pages. Always renumber after merging.

**3. Wrong format for front matter**
Academic convention uses lowercase Roman numerals (i, ii, iii) for preliminary pages (table of contents, acknowledgments, abstract) and switches to Arabic numerals (1, 2, 3) for the main body.

**4. Placing numbers in the gutter**
For double-sided documents that will be bound, page numbers on the inner edge (gutter) are hidden by the binding. Use alternating left/right placement or center positioning.

## How to add page numbers to existing PDFs

If you have a finished PDF without page numbers — common when merging documents or receiving scanned files — you can add them after the fact:

1. Open the [Add Page Numbers](/add-page-numbers) tool.
2. Upload your PDF document.
3. Choose your preferred position: top/bottom, left/center/right.
4. Set the starting number and format (Arabic or Roman numerals).
5. Optionally skip numbering on the first page (for cover pages).
6. Download the numbered PDF.

The tool stamps page numbers directly onto each page as a text overlay. The original content remains untouched.

## Workflow: merge then number

When combining multiple documents into a single report:

1. Use [Merge PDF](/merge-pdf) to combine all source documents into one file.
2. Use [Organize PDF](/organize-pdf) to reorder or remove unwanted pages.
3. Use [Add Page Numbers](/add-page-numbers) to apply consistent numbering across the entire merged document.

This three-step workflow ensures your final document has clean, sequential page numbers regardless of how many source files contributed to it.

## FAQ

**Can I add "Page X of Y" format?**
Yes. The page numbers tool supports both simple numbering (1, 2, 3) and "Page X of Y" format, which is especially useful for business reports where readers need to know the total page count.

**Will adding page numbers increase my file size?**
Minimally. Page numbers are small text elements. Adding numbers to a 50-page document typically increases the file size by less than 100 KB.

**Can I add page numbers to a scanned PDF?**
Yes. Page numbers are overlaid on top of the page image, so they work with scanned documents, digitally created PDFs, and any combination.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 13: Calculate EMI Before Taking a Loan
   * ─────────────────────────────────────────────────── */
  {
    slug: "calculate-emi-before-taking-loan",
    publishedAt: "2026-11-25",
    toolIds: ["emi-calculator", "percentage-calculator"],
    locale: {
      en: {
        title: "Calculate EMI Before Taking a Loan: Complete Guide",
        description: "Understand exactly how EMI is calculated, what determines your monthly payment, and how to compare loan offers. Includes the formula, amortization breakdown, and practical tips.",
        body: `
Before you sign a loan agreement — whether it is a home mortgage, car loan, or personal loan — you should know your exact monthly payment down to the rupee or dollar. The Equated Monthly Installment (EMI) is the fixed amount you pay every month until the loan is fully repaid. Understanding how it works helps you negotiate better terms, avoid unaffordable commitments, and choose the right loan tenure.

## The EMI formula explained

EMI is calculated using this standard formula:

**EMI = P × r × (1 + r)^n / ((1 + r)^n – 1)**

Where:
- **P** = Principal loan amount
- **r** = Monthly interest rate (annual rate divided by 12, expressed as a decimal)
- **n** = Total number of monthly installments (tenure in years × 12)

### Example calculation

For a home loan of ₹50,00,000 (₹50 lakhs) at 8.5% annual interest for 20 years:

- P = 50,00,000
- r = 8.5% ÷ 12 ÷ 100 = 0.00708
- n = 20 × 12 = 240 months

EMI = 50,00,000 × 0.00708 × (1.00708)^240 / ((1.00708)^240 – 1)
EMI ≈ **₹43,391 per month**

Over 20 years, you pay ₹1,04,13,840 total — meaning ₹54,13,840 goes to interest alone, more than the original principal.

## How the three variables affect your EMI

### 1. Principal amount
Directly proportional. Double the loan amount, double the EMI. There is no trick here — borrow less to pay less.

### 2. Interest rate
A seemingly small rate difference has massive impact:

| Loan Amount | Rate | Tenure | EMI | Total Interest |
|---|---|---|---|---|
| ₹50 lakhs | 8.0% | 20 years | ₹41,822 | ₹50,37,280 |
| ₹50 lakhs | 8.5% | 20 years | ₹43,391 | ₹54,13,840 |
| ₹50 lakhs | 9.0% | 20 years | ₹44,986 | ₹57,96,640 |

A 1% rate increase costs you an extra ₹7,59,360 over the loan's lifetime. Always negotiate rates and compare multiple lenders.

### 3. Tenure (loan term)
Longer tenure means lower EMI but significantly more total interest:

| Tenure | EMI | Total Payment | Total Interest |
|---|---|---|---|
| 15 years | ₹49,236 | ₹88,62,480 | ₹38,62,480 |
| 20 years | ₹43,391 | ₹1,04,13,840 | ₹54,13,840 |
| 25 years | ₹40,260 | ₹1,20,78,000 | ₹70,78,000 |
| 30 years | ₹38,446 | ₹1,38,40,560 | ₹88,40,560 |

Extending from 20 to 30 years reduces your EMI by only ₹4,945 per month but costs an extra ₹34,26,720 in total interest.

## Understanding amortization

In the early years of a loan, most of your EMI goes toward interest. As you pay down the principal, the interest portion shrinks and the principal portion grows. This is called amortization.

For the ₹50 lakh example at 8.5% for 20 years:
- **Month 1:** ₹35,417 goes to interest, ₹7,974 to principal
- **Month 120 (year 10):** ₹22,844 to interest, ₹20,547 to principal
- **Month 240 (final):** ₹305 to interest, ₹43,086 to principal

This is why prepaying early in the loan term saves dramatically more interest than prepaying later.

## Calculate your EMI instantly

Use our [EMI calculator](/emi-calculator) to compute your monthly payment for any loan amount, interest rate, and tenure. The tool shows:

- Exact monthly EMI
- Total interest payable over the loan term
- Total payment amount (principal + interest)
- Month-by-month amortization schedule
- Visual breakdown of principal vs. interest

For quick percentage calculations when comparing loan offers, use the [percentage calculator](/percentage-calculator) to see rate differences as actual amounts.

## FAQ

**Should I choose a shorter or longer tenure?**
Choose the shortest tenure where the EMI is comfortably affordable — ideally under 40% of your monthly income. Shorter tenures cost dramatically less in total interest.

**Does prepaying a loan reduce my EMI?**
It depends on your bank's policy. Most banks offer two options: reduce the remaining tenure (keeping EMI the same) or reduce the EMI (keeping tenure the same). Reducing tenure saves more interest overall.

**Are fixed-rate or floating-rate loans better?**
Fixed rates provide payment certainty. Floating rates are typically lower initially but can increase. If rates are historically high, floating is often better (rates likely to decrease). If rates are historically low, fixed locks in the good rate.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 14: GST Calculator Guide for Indian Businesses
   * ─────────────────────────────────────────────────── */
  {
    slug: "gst-calculator-guide-indian-businesses",
    publishedAt: "2026-11-25",
    toolIds: ["gst-calculator", "percentage-calculator"],
    locale: {
      en: {
        title: "GST Calculator Guide for Indian Businesses",
        description: "Understand GST slabs, calculate inclusive and exclusive GST, and learn the difference between CGST, SGST, and IGST. A practical guide with real calculation examples.",
        body: `
India's Goods and Services Tax (GST) replaced a maze of indirect taxes in 2017. Nine years later, many small business owners and freelancers still struggle with correct GST calculations — especially the difference between adding GST to a base price versus extracting GST from an inclusive price. This guide covers the practical calculations you need for invoicing, pricing, and filing.

## GST slab rates in India

India uses a multi-tier GST structure:

| Rate | Category examples |
|---|---|
| **0%** | Fresh vegetables, milk, eggs, unprocessed food grains |
| **5%** | Packaged food items, economy transport, small restaurants |
| **12%** | Processed food, business class air tickets, state-run lottery |
| **18%** | Most goods and services — electronics, telecom, IT services, restaurants in hotels |
| **28%** | Luxury items — cars, tobacco, aerated drinks, cement |

Most services (consulting, software, freelance work) fall under the 18% slab.

## Two types of GST calculations

### 1. GST-exclusive (adding GST to base price)

You know your base price and need to calculate the final price with GST.

**Formula:** GST amount = Base price × GST rate / 100
**Final price** = Base price + GST amount

**Example:** A software service costing ₹10,000 at 18% GST:
- GST amount = ₹10,000 × 18/100 = ₹1,800
- Invoice total = ₹10,000 + ₹1,800 = **₹11,800**

### 2. GST-inclusive (extracting GST from total price)

You know the final price (MRP or quoted price) and need to find the base price and GST component.

**Formula:** Base price = Total price × 100 / (100 + GST rate)
**GST amount** = Total price – Base price

**Example:** A product priced at ₹1,180 inclusive of 18% GST:
- Base price = ₹1,180 × 100 / 118 = ₹1,000
- GST component = ₹1,180 – ₹1,000 = **₹180**

This reverse calculation is essential for accounting because you need to report the base price and tax component separately in your GST returns.

## CGST, SGST, and IGST explained

GST is split into components based on where the seller and buyer are located:

**Intra-state (same state):** Tax splits equally into CGST (Central) and SGST (State).
- 18% GST on a ₹10,000 service = ₹900 CGST + ₹900 SGST

**Inter-state (different states):** Full tax goes as IGST (Integrated).
- 18% GST on a ₹10,000 service = ₹1,800 IGST

The total tax amount is identical. Only the split and the government recipient changes. Your invoices must show the correct split based on the transaction type.

## GST on invoices: what to include

Every GST invoice must display:
1. Your GSTIN (GST Identification Number)
2. The buyer's GSTIN (for B2B transactions)
3. HSN/SAC code for the goods or service
4. Taxable value (base price before GST)
5. GST rate and amount, split into CGST+SGST or IGST
6. Total invoice value

## Calculate GST instantly

Our [GST calculator](/gst-calculator) handles both exclusive and inclusive calculations. Enter your amount, select the applicable slab rate, and choose whether the amount includes or excludes GST. The tool shows:

- Base price
- GST amount with CGST/SGST or IGST breakdown
- Total payable amount

For quick percentage verifications when calculating margins or markups, use the [percentage calculator](/percentage-calculator).

## FAQ

**When should I register for GST?**
Registration is mandatory when your annual turnover exceeds ₹20 lakhs (₹10 lakhs for special category states) for services, or ₹40 lakhs for goods. E-commerce sellers must register regardless of turnover.

**Can I claim input tax credit (ITC) on GST paid?**
Yes. If you are GST-registered, you can offset the GST you pay on business purchases against the GST you collect on sales. This is the ITC mechanism and it is fundamental to reducing your effective tax burden.

**What happens if I charge the wrong GST rate?**
You are liable for the difference. If you charge 12% instead of 18%, you owe the government the 6% shortfall plus interest. Always verify HSN/SAC codes to apply the correct rate.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 15: Age Calculator: How Age Is Calculated in Different Cultures
   * ─────────────────────────────────────────────────── */
  {
    slug: "age-calculation-different-cultures",
    publishedAt: "2026-11-25",
    toolIds: ["age-calculator", "date-calculator"],
    locale: {
      en: {
        title: "Age Calculator: How Age Is Calculated in Different Cultures",
        description: "Western, East Asian, and Islamic calendar systems calculate age differently. Learn the systems, understand the math, and calculate your age in any system accurately.",
        body: `
Your age depends on where you are. A baby born on January 1, 2026 is zero years old in New York, one year old in Seoul, and their age in many Islamic countries follows an entirely different calendar with different year lengths. These are not arbitrary customs — they reflect fundamentally different philosophies about when life begins counting and how time is measured.

## The Western system: completed years

The system used in most of the Americas, Europe, and globally in legal contexts counts completed years since birth. You are born at age 0 and turn 1 on your first birthday.

**How it works:** Subtract the birth year from the current year, then subtract 1 if you have not yet reached your birthday this calendar year.

Born March 15, 2000. Today is November 25, 2026.
- 2026 – 2000 = 26
- March 15 has already passed this year
- **Age: 26 years old**

Born December 30, 2000. Today is November 25, 2026.
- 2026 – 2000 = 26
- December 30 has not yet occurred this year
- **Age: 25 years old** (turns 26 in December)

## The East Asian system: counting from one

In Korea, China (traditionally), Japan (traditionally), and Vietnam, a person is 1 at birth. Everyone gains a year on New Year's Day (January 1 or Lunar New Year, depending on the specific tradition), not on their individual birthday.

**Korean age (traditional):**
Born December 31, 2025. On January 1, 2026:
- Born as age 1 (even though they are one day old)
- Gains a year on January 1: **Age 2 in Korean reckoning**
- Western age on the same day: **0 years old** (born yesterday)

This means a Korean age can be up to 2 years ahead of Western age. Note: South Korea officially switched to the Western age system for legal and administrative purposes in June 2023, but the traditional counting persists socially.

**Why this system exists:** Traditional East Asian philosophy considers the time spent in the womb as the first year of life. The communal New Year aging reflects a collectivist cultural value — everyone ages together as a community.

## The Islamic calendar system

The Islamic (Hijri) calendar is a purely lunar calendar with 12 months of 29 or 30 days each. A Hijri year is approximately 354 or 355 days — about 11 days shorter than a Gregorian year.

This means age measured in Hijri years is numerically higher than Gregorian age. Someone who is 30 Gregorian years old is approximately 31 Hijri years old.

**Conversion approximation:** Hijri age ≈ Gregorian age × (365.25 / 354.37) ≈ Gregorian age × 1.0307

## Calculating exact age in years, months, and days

For legal documents, immigration forms, and medical records, you often need age expressed as years, months, and days:

Born: April 10, 1995. Current date: November 25, 2026.
- Years: 2026 – 1995 = 31 (April 10 has passed)
- Months: November – April = 7 months (since April 10 to November 10 is 7 months)
- Days: November 25 – November 10 = 15 days
- **Exact age: 31 years, 7 months, and 15 days**

This calculation gets complex with varying month lengths and leap years, which is why a dedicated calculator is more reliable than mental math.

## Calculate your age instantly

Use our [age calculator](/age-calculator) to find your exact age in years, months, days, hours, and even seconds. Enter your date of birth and get:

- Exact age breakdown
- Next birthday countdown
- Day of the week you were born
- Total days you have been alive

For calculating the duration between any two dates (not just from birth), use the [date calculator](/date-calculator) to find exact differences in days, weeks, months, and years.

## FAQ

**What is my age if I was born on February 29 (leap day)?**
In the Western system, you legally age on March 1 in non-leap years in most jurisdictions. Some countries (e.g., New Zealand) specify February 28 instead. Our calculator handles leap year birthdays correctly.

**Which age system do passports use?**
All international passports use the Western (completed years) system based on the Gregorian calendar, regardless of the country's traditional age reckoning.

**How do I calculate age for astrological purposes?**
Astrologers typically use exact age including months and days. Some systems use the sidereal calendar. Our age calculator provides the precise breakdown needed for such calculations.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 16: Audio Trimming for Podcasters
   * ─────────────────────────────────────────────────── */
  {
    slug: "audio-trimming-podcasters-tips",
    publishedAt: "2026-11-25",
    toolIds: ["audio-trimmer", "audio-speed-changer"],
    locale: {
      en: {
        title: "Audio Trimming for Podcasters: Quick Editing Tips",
        description: "Cut dead air, trim intros, and tighten podcast episodes without expensive software. Practical editing techniques for cleaner audio content.",
        body: `
The difference between an amateur podcast and a professional one often comes down to editing. Dead air at the beginning, long pauses between thoughts, rambling outros that trail off — these small issues compound into a listener experience that feels unpolished. The good news: 80% of podcast editing is just trimming, and you do not need Audacity or Adobe Audition to do it well.

## What to trim from every episode

### 1. Pre-roll dead air
Most recordings start with 2–5 seconds of silence (or background noise) before the host begins speaking. Listeners who press play expect immediate audio. Trim to leave exactly 0.5–1 second of silence before your first word.

### 2. Post-roll trailing audio
Recordings often capture the host saying "okay, I think that's good" or shuffling sounds after the content ends. Cut everything after your deliberate sign-off.

### 3. Long pauses between segments
A natural pause in conversation is 0.5–1.5 seconds. Pauses longer than 2 seconds feel like technical problems to listeners. Trim extended gaps to 1 second.

### 4. False starts and repeated sentences
When a speaker begins a sentence, stumbles, and restarts, cut the false start entirely. The listener should hear only the clean version.

### 5. Filler word clusters
Single "um" or "uh" instances are natural and should mostly be left alone — removing every filler word sounds robotic. But clusters of three or more fillers ("um, uh, so, like, um") should be trimmed to a single natural pause.

## The 3-pass editing workflow

Professional podcast editors use a systematic approach:

**Pass 1: Structural cuts (5 minutes)**
Listen at 1.5x speed and mark sections to remove entirely — tangents that go nowhere, repeated explanations, segments that do not serve the episode's thesis.

**Pass 2: Trimming (10–15 minutes)**
Make precise cuts at the start and end of the episode, between segments, and around stumbles. This is where the [audio trimmer](/audio-trimmer) shines — set exact start and end points visually on the waveform.

**Pass 3: Quality check (real-time listen)**
Play the edited episode at normal speed. Listen for jarring cuts where the background noise changes abruptly, unnatural rhythm disruptions, or accidentally cut words.

## Trimming technique: cutting on breaths

The most natural-sounding cuts happen on inhale breaths. When someone pauses to breathe between sentences, that breath is a natural edit point. Cutting at the inhale and joining two segments sounds seamless because:

- The room tone (background ambient noise) is consistent during breaths
- The vocal energy matches naturally at sentence boundaries
- Listeners expect micro-pauses between thoughts

## Speed adjustment for pacing

If a guest speaks slowly (under 130 words per minute), you can gently speed up the entire episode to 1.1x without noticeable pitch changes. This tightens pacing without sounding artificial. Use the [audio speed changer](/audio-speed-changer) to adjust playback rate while preserving pitch.

Conversely, if you speak too fast (over 180 WPM), slowing to 0.95x can improve clarity for listeners.

## Export settings for podcasts

After trimming, export with these settings for optimal podcast quality:
- **Format:** MP3 at 128 kbps for stereo, 64 kbps for mono (voice-only content sounds excellent in mono)
- **Sample rate:** 44.1 kHz (standard for all podcast platforms)
- **Bit depth:** 16-bit
- **Loudness:** Target –16 LUFS for stereo, –19 LUFS for mono (Spotify and Apple Podcasts normalize to these levels)

## FAQ

**How long should podcast editing take?**
A common benchmark is 2–3x the episode length for basic editing. A 30-minute episode should take 60–90 minutes to edit. With practice and efficient trimming tools, you can reduce this to 1.5x.

**Should I edit out all "ums" and "uhs"?**
No. Removing every filler word makes speech sound unnaturally smooth and robotic. Remove clusters and long hesitations, but leave natural conversational fillers that do not distract from the content.

**Can I trim audio on my phone?**
Yes. Our audio trimmer works in mobile browsers. For quick cuts on the go — trimming a voice memo or audio clip — it handles the job without installing an app.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 17: CSS Border Radius: Beyond Simple Rounded Corners
   * ─────────────────────────────────────────────────── */
  {
    slug: "css-border-radius-beyond-rounded-corners",
    publishedAt: "2026-11-25",
    toolIds: ["css-border-radius-generator", "css-box-shadow-generator"],
    locale: {
      en: {
        title: "CSS Border Radius: Beyond Simple Rounded Corners",
        description: "Master CSS border-radius with the full 8-value syntax to create organic shapes, squircles, and blob-like designs. Includes visual examples and practical techniques.",
        body: `
Every developer knows \`border-radius: 10px\` creates rounded corners. But the border-radius property accepts up to eight values that can create organic blobs, iOS-style squircles, speech bubbles, and asymmetric shapes that feel alive. Most developers never explore beyond the single-value shorthand.

## The full border-radius syntax

The property accepts values for each corner, and each corner has two radii (horizontal and vertical):

\`\`\`css
border-radius: top-left top-right bottom-right bottom-left;
\`\`\`

For eight-value control, separate horizontal and vertical radii with a slash:

\`\`\`css
border-radius: h-tl h-tr h-br h-bl / v-tl v-tr v-br v-bl;
\`\`\`

This distinction between horizontal and vertical radii is what unlocks organic shapes. When both radii of a corner are equal, you get a circular arc. When they differ, you get an elliptical arc.

## Practical shapes with border-radius

### Perfect circle
\`\`\`css
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
\`\`\`
Works only on square elements. On rectangles, 50% creates an ellipse.

### Pill / capsule shape
\`\`\`css
.pill {
  border-radius: 9999px;
}
\`\`\`
Using an absurdly large value caps the radius at the maximum possible curve, creating perfect semicircles on the shorter sides regardless of the element's dimensions.

### iOS-style squircle (superellipse)
\`\`\`css
.squircle {
  border-radius: 22% 22% 22% 22% / 22% 22% 22% 22%;
}
\`\`\`
True squircles require a superellipse curve that CSS cannot perfectly replicate, but \`border-radius\` with carefully tuned values creates a convincing approximation. Apple's icon shape uses this approach.

### Organic blob
\`\`\`css
.blob {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}
\`\`\`
Different horizontal and vertical radii on each corner create an asymmetric, natural-looking shape. These make excellent background decorations and hero section accents.

### Speech bubble pointer
\`\`\`css
.bubble {
  border-radius: 20px 20px 20px 0;
}
\`\`\`
Setting one corner to 0 while rounding the others creates a chat bubble shape. Combine with a CSS triangle pseudo-element for the pointer.

## Percentage vs pixel values

- **Pixels** create fixed-radius curves regardless of element size. A 10px radius looks the same on a 50px button and a 500px card.
- **Percentages** scale with the element. 50% always creates maximum curvature. 10% creates proportionally larger curves on larger elements.

**Best practice:** Use pixels for small UI elements (buttons, inputs, chips) where you want consistent corner treatment. Use percentages for decorative shapes and elements where the radius should scale.

## Animation and transitions

Border-radius transitions smoothly, making it excellent for hover effects:

\`\`\`css
.morphing {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  transition: border-radius 0.5s ease;
}
.morphing:hover {
  border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
}
\`\`\`

This creates a gentle morphing effect where the shape subtly shifts on hover, adding a living, organic quality to your UI.

## Generate complex border-radius values

Trying to visualize eight different values in your head is nearly impossible. Use our [CSS border radius generator](/css-border-radius-generator) to visually drag each corner's horizontal and vertical radii and see the resulting shape in real time. Copy the generated CSS directly into your stylesheet.

Pair complex border-radius shapes with our [CSS box shadow generator](/css-box-shadow-generator) to add depth. Organic shapes with subtle shadows create a modern, polished design language.

## FAQ

**Does border-radius affect the element's click area?**
No. The clickable area remains the full rectangular bounding box. Use \`clip-path\` if you need the click area to match the visual shape.

**Can I animate between different border-radius values?**
Yes. CSS transitions handle border-radius smoothly. Each of the eight values interpolates independently, creating organic morphing animations.

**What about browser support?**
The full 8-value border-radius syntax is supported in all modern browsers. Even Internet Explorer 9+ supports it. There are zero compatibility concerns in 2026.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 18: Regular Expressions Explained: A Practical Guide
   * ─────────────────────────────────────────────────── */
  {
    slug: "regular-expressions-practical-guide",
    publishedAt: "2026-11-25",
    toolIds: ["regex-tester", "text-compare"],
    locale: {
      en: {
        title: "Regular Expressions Explained: A Practical Guide",
        description: "Learn regex patterns through real-world examples: validating emails, extracting phone numbers, parsing URLs, and searching logs. No abstract theory — just patterns you can use today.",
        body: `
Regular expressions (regex) are arguably the most powerful text processing tool in a developer's toolkit — and the most intimidating. A pattern like \`^(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@\` looks like line noise. But regex is just a mini-language built from a handful of concepts, and you can accomplish 90% of real-world tasks with just 10 patterns.

## The 10 patterns that cover 90% of use cases

### 1. Match a literal string
\`/hello/\` matches "hello" anywhere in the text. Case-sensitive by default; add the \`i\` flag for case-insensitive matching.

### 2. Match any character
\`/h.llo/\` — the dot matches any single character. Matches "hello", "hallo", "h3llo".

### 3. Match character classes
\`/[aeiou]/\` matches any vowel. \`/[0-9]/\` matches any digit. \`/[^0-9]/\` matches any non-digit (caret negates inside brackets).

### 4. Quantifiers
- \`*\` — zero or more: \`/go*d/\` matches "gd", "god", "good", "goood"
- \`+\` — one or more: \`/go+d/\` matches "god", "good", but not "gd"
- \`?\` — zero or one: \`/colou?r/\` matches both "color" and "colour"
- \`{n,m}\` — between n and m: \`/\\d{3,5}/\` matches 3 to 5 digits

### 5. Anchors
\`/^start/\` matches "start" only at the beginning of a line. \`/end$/\` matches "end" only at the end. Combined: \`/^exact$/\` matches only the string "exact" with nothing else.

### 6. Shorthand character classes
- \`\\d\` — any digit (same as \`[0-9]\`)
- \`\\w\` — any word character (letters, digits, underscore)
- \`\\s\` — any whitespace (space, tab, newline)
- Uppercase versions (\`\\D\`, \`\\W\`, \`\\S\`) match the opposite

### 7. Groups and alternation
\`/(cat|dog)/\` matches either "cat" or "dog". Parentheses group patterns and create capture groups that extract matched text.

### 8. Lookahead and lookbehind
\`/\\d+(?= dollars)/\` matches digits only when followed by " dollars" (positive lookahead). The " dollars" part is not included in the match.

### 9. Non-greedy matching
\`/".+?"/\` — adding \`?\` after a quantifier makes it match as few characters as possible. Without it, \`/".+"/\` on \`"a" and "b"\` matches the entire string; with \`?\`, it matches just \`"a"\`.

### 10. Backreferences
\`/(\\w+) \\1/\` matches repeated words like "the the" or "is is". \`\\1\` refers back to whatever the first group captured.

## Real-world regex recipes

**Validate an email (simple):**
\`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/\`

**Extract phone numbers (US format):**
\`/\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}/g\`

**Parse URL components:**
\`/^(https?:\\/\\/)?([^\\/\\s]+)(\\/[^\\s]*)?$/\`

**Find duplicate words:**
\`/\\b(\\w+)\\s+\\1\\b/gi\`

**Match IP addresses:**
\`/\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b/\`

## Test and debug regex interactively

Our [regex tester](/regex-tester) lets you write a pattern, paste test text, and immediately see all matches highlighted in real time. It supports:

- Multiple regex flavors (JavaScript, Python, Go)
- Match highlighting with group colors
- Real-time explanation of what each part of the pattern does
- Common pattern library for quick reference

When comparing text before and after regex replacements, the [text compare](/text-compare) tool shows exactly what changed, character by character.

## FAQ

**Why does my regex work in JavaScript but fail in Python?**
Different regex engines support different features. JavaScript uses ECMA syntax; Python uses PCRE-like syntax with differences in lookahead support, named groups, and flags. Always test in the target language's engine.

**Is regex the right tool for parsing HTML?**
For simple, controlled HTML snippets — extracting an attribute from a known tag structure — regex works. For general HTML parsing, use a proper DOM parser. HTML is not a regular language, and regex cannot reliably handle nested tags, edge cases, or malformed markup.

**How do I make regex readable?**
Use the verbose/extended flag (\`x\` in most engines) to add whitespace and comments. Break complex patterns into named groups. Consider writing multiple simple patterns instead of one complex one.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 19: Unit Conversion Mistakes That Cost Real Money
   * ─────────────────────────────────────────────────── */
  {
    slug: "unit-conversion-mistakes-cost-money",
    publishedAt: "2026-11-25",
    toolIds: ["unit-converter", "percentage-calculator"],
    locale: {
      en: {
        title: "Unit Conversion Mistakes That Cost Real Money",
        description: "From the Mars Climate Orbiter crash to everyday cooking disasters, unit conversion errors have real consequences. Learn the most common mistakes and how to avoid them.",
        body: `
On September 23, 1999, NASA's Mars Climate Orbiter disintegrated in the Martian atmosphere. The cause: Lockheed Martin's ground software sent thruster data in pound-force seconds while NASA's navigation system expected newton-seconds. A unit conversion error destroyed a $327.6 million spacecraft. This is the most famous unit conversion mistake in history, but unit errors cause costly problems every day in construction, medicine, international trade, and even cooking.

## Famous unit conversion disasters

### Mars Climate Orbiter (1999)
Lockheed Martin's software output force in imperial pound-force seconds. NASA's Jet Propulsion Laboratory expected SI units (newton-seconds). Nobody caught the discrepancy during months of flight corrections, and each small thruster firing introduced a tiny error. Those errors accumulated, putting the spacecraft on a trajectory 170 km too low.

### Gimli Glider (1983)
Air Canada Flight 143, a Boeing 767, ran out of fuel mid-flight because ground crew calculated fuel in pounds instead of kilograms. The aircraft needed 22,300 kg of fuel but was loaded with 22,300 pounds — less than half the required amount. The pilots glided the powerless aircraft to an emergency landing at an abandoned air base in Gimli, Manitoba.

### Columbus miscalculated the Earth's size (1492)
Columbus estimated the distance from Spain to Asia at roughly 3,700 km — about 10,000 km short. He confused Arabic miles (about 1.83 km) with Roman miles (about 1.48 km), making the Earth appear 25% smaller. He never realized he had found new continents rather than Asia.

## Everyday unit conversion errors

### Cooking
American recipes use cups, tablespoons, and Fahrenheit. European recipes use grams, milliliters, and Celsius. Converting "350°F" to Celsius incorrectly (175°C instead of the correct 177°C) is minor, but confusing a cup (236 mL) of flour with 236 grams of flour produces dramatically different results. A cup of flour weighs about 125 grams. Using 236 grams nearly doubles the flour in your recipe.

### Construction and DIY
Confusing millimeters and centimeters on a blueprint results in components that are 10x too large or too small. Mixing feet and meters when ordering materials internationally causes project delays and waste. A U.S. architect specifying a 10-foot ceiling communicating with a European supplier thinking 10 meters would produce ceilings three times too tall.

### Medicine
Drug dosages converting between milligrams and micrograms (a 1000x difference) have caused fatal overdoses. Hospitals have implemented mandatory double-check systems specifically because mcg/mg confusion is so common and dangerous.

### International trade
Pricing quoted per kilogram versus per pound creates 2.2x price discrepancies. A supplier quoting $5/kg and a buyer interpreting it as $5/lb results in an overpayment of 120% per unit weight.

## The metric-imperial divide

| Measurement | Metric | Imperial | Conversion |
|---|---|---|---|
| Length | meter (m) | foot (ft) | 1 m = 3.281 ft |
| Mass | kilogram (kg) | pound (lb) | 1 kg = 2.205 lb |
| Volume | liter (L) | gallon (gal) | 1 L = 0.264 gal |
| Temperature | Celsius (°C) | Fahrenheit (°F) | °C = (°F − 32) × 5/9 |
| Area | square meter (m²) | square foot (ft²) | 1 m² = 10.764 ft² |

Only three countries have not officially adopted the metric system: the United States, Liberia, and Myanmar. Yet even in metric countries, legacy imperial measurements persist in specific industries (aviation uses feet for altitude, marine navigation uses nautical miles).

## How to avoid conversion mistakes

1. **Always label units.** Never pass a bare number. Write "22,300 kg" not "22,300." This single practice would have saved the Mars Orbiter.
2. **Convert at the boundary.** When two systems meet, convert once at the interface point and document it.
3. **Use a reliable converter.** Mental math with conversion factors introduces human error.
4. **Sanity check results.** Does the answer make physical sense? If converting 100°F to Celsius gives you 212°C, something went wrong.

## Convert units instantly and accurately

Our [unit converter](/unit-converter) handles length, mass, volume, temperature, area, speed, data storage, and more. Select your source and target units, enter a value, and get the precise conversion instantly.

For calculating percentage differences between quoted prices in different unit systems, the [percentage calculator](/percentage-calculator) helps you understand exactly how much an error would cost.

## FAQ

**Why hasn't the United States switched to metric?**
The U.S. Metric Conversion Act of 1975 declared metric as the preferred system but made adoption voluntary. Without mandatory enforcement, the cost of converting infrastructure, signage, and manufacturing tooling has prevented widespread adoption.

**Is a nautical mile different from a regular mile?**
Yes. A nautical mile is 1,852 meters (1.151 statute miles). It is defined as one minute of latitude arc, making it naturally useful for navigation. A statute (regular) mile is 1,609 meters.

**How do I convert between Celsius and Fahrenheit quickly?**
For rough mental math: double the Celsius temperature and add 30. This gives approximate Fahrenheit (exact formula: °F = °C × 9/5 + 32). For precise conversions, use a tool.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 20: Text Comparison Tools: Finding Differences in Code & Documents
   * ─────────────────────────────────────────────────── */
  {
    slug: "text-comparison-finding-differences",
    publishedAt: "2026-11-25",
    toolIds: ["text-compare", "json-formatter"],
    locale: {
      en: {
        title: "Text Comparison Tools: Finding Differences in Code & Documents",
        description: "Compare two versions of code, contracts, or configuration files to spot every change. Learn how diff algorithms work and when visual comparison beats manual review.",
        body: `
Finding the three changed lines in a 500-line configuration file by reading both versions side by side is a recipe for missed changes and wasted time. Text comparison (diff) tools solve this by algorithmically identifying every insertion, deletion, and modification between two text inputs, then highlighting them visually so you can review changes in seconds instead of hours.

## When you need text comparison

**Code review without version control:** Not every project is in Git. Quick scripts, server configuration files modified over SSH, and database migration snippets often exist as loose files without commit history. Comparing "before" and "after" versions catches unintended changes.

**Contract and legal document review:** When a counterparty sends back a "revised" agreement, you need to know exactly what changed. Manual reading misses subtle word swaps, deleted clauses, and added conditions.

**Configuration drift detection:** Comparing a production server's config file against the reference template reveals unauthorized or accidental modifications.

**Data validation:** Comparing two CSV exports — one from yesterday, one from today — surfaces which records changed, which were added, and which disappeared.

**Translation verification:** Comparing the original English text with an edited version ensures the editor did not accidentally delete or alter source content.

## How diff algorithms work

The standard diff algorithm (Eugene Myers, 1986) finds the longest common subsequence (LCS) between two texts, then marks everything outside that subsequence as changed. The algorithm works in O(ND) time, where N is the total length and D is the number of differences.

In practice, this means:

1. **Identical regions** are matched first, establishing anchor points.
2. **Inserted lines** exist only in the new text.
3. **Deleted lines** exist only in the original text.
4. **Modified lines** are shown as a deletion plus an insertion, often with inline character-level highlighting showing exactly which characters changed within the line.

### Line-level vs character-level diff

Line-level diff tells you which lines changed. Character-level (inline) diff tells you exactly which words or characters within a line were modified. The combination gives you maximum clarity:

- Line-level: "Line 42 was modified" (the entire line is highlighted)
- Character-level: "On line 42, 'timeout=30' changed to 'timeout=60'" (only "30" and "60" are highlighted)

## Side-by-side vs inline view

**Side-by-side:** Shows old text on the left and new text on the right, with aligned matching lines. Best for reviewing changes in documents where you want to see both versions simultaneously.

**Inline (unified):** Shows a single stream with deleted lines marked in red and added lines in green. This is the format Git uses. Best for code review where you want to minimize horizontal scrolling.

## Compare texts instantly

Paste your original and modified text into our [text compare](/text-compare) tool. It provides:

- Side-by-side and inline diff views
- Character-level change highlighting within modified lines
- Line numbers for quick reference
- Summary statistics: lines added, deleted, and modified

For comparing JSON responses specifically — where whitespace and key ordering differences create noise — first normalize both inputs through the [JSON formatter](/json-formatter) with sorted keys enabled, then compare the formatted outputs.

## Tips for effective text comparison

1. **Normalize whitespace first.** Trailing spaces, tabs vs. spaces, and line ending differences (CRLF vs. LF) create noise that obscures real changes.
2. **Sort JSON keys.** Two JSON objects can be semantically identical but appear different because keys are in different orders.
3. **Ignore case when appropriate.** For human-language documents, case differences may not be meaningful changes.
4. **Review in context.** A diff showing "+timeout=60" is meaningless without seeing the surrounding lines. Use context lines to understand what section of the file was modified.

## FAQ

**Can I compare binary files?**
Text comparison tools work on text content only. For binary files (images, PDFs, executables), you need specialized comparison tools. For PDFs, extract the text content first, then compare.

**What is the maximum text size for browser-based comparison?**
Most browser-based diff tools handle texts up to 100,000 lines comfortably. Beyond that, performance depends on your device's memory. For very large files, desktop tools like Beyond Compare or command-line \`diff\` are more efficient.

**How do I compare two database table exports?**
Export both tables as CSV or TSV files. Paste the contents into the text comparison tool. For large datasets, sort both exports by the primary key column first so that matching records are aligned.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 21: Slug Generator: Why Clean URLs Matter for SEO
   * ─────────────────────────────────────────────────── */
  {
    slug: "slug-generator-clean-urls-seo",
    publishedAt: "2026-11-25",
    toolIds: ["slug-generator", "url-encoder"],
    locale: {
      en: {
        title: "Slug Generator: Why Clean URLs Matter for SEO",
        description: "Transform messy page titles into clean, SEO-friendly URL slugs. Learn URL best practices, common slug mistakes, and how slugs affect search rankings.",
        body: `
Compare these two URLs for the same article:
- \`example.com/blog/how-to-compress-images-without-losing-quality\`
- \`example.com/blog?id=38291&ref=nav&cat=tutorials&v=2\`

The first URL tells both humans and search engines exactly what the page contains. The second says nothing. Clean URL slugs are a small but measurable SEO factor and a significant usability improvement.

## What is a URL slug?

A slug is the human-readable portion of a URL that identifies a specific page. In \`example.com/blog/how-to-compress-images\`, the slug is \`how-to-compress-images\`.

The term comes from newspaper publishing, where a "slug" was a short label used to identify a story during production.

## Why slugs matter for SEO

**1. Keywords in URLs are a ranking signal**
Google has confirmed that words in URLs help their algorithms understand page content. While it is a minor ranking factor compared to title tags and content, it contributes to the overall relevance signal.

**2. Click-through rate from search results**
Google displays the URL in search results. Users are more likely to click a URL that matches their query. A URL containing their exact search terms provides visual confirmation that the page answers their question.

**3. Link anchor text**
When someone shares a URL in a forum, Slack, or social media without custom anchor text, the URL itself is the anchor text. A descriptive slug provides context even as a bare link.

**4. Crawlability and indexing**
Simple, flat URL structures are easier for search engines to crawl. Deep nesting (\`/category/subcategory/year/month/post\`) adds complexity without SEO benefit.

## Slug generation rules

A good slug follows these conventions:

| Rule | Good example | Bad example |
|---|---|---|
| Lowercase only | \`image-compression\` | \`Image-Compression\` |
| Hyphens between words | \`word-counter\` | \`word_counter\` or \`wordcounter\` |
| No stop words | \`compress-images-quality\` | \`how-to-compress-images-without-losing-quality\` |
| No special characters | \`cafe-menu\` | \`café-menu\` |
| Short and descriptive | \`pdf-merge-guide\` | \`the-complete-ultimate-guide-to-merging-pdf-files-online-2026\` |
| No trailing slashes | \`/blog/seo-tips\` | \`/blog/seo-tips/\` (unless your whole site uses them) |

**On stop words:** Removing words like "how," "to," "the," "a," "and" keeps slugs concise. But keep them when they are part of a meaningful phrase. \`"how-to"\` in a tutorial slug adds clarity.

## Common slug mistakes

**1. Auto-generated gibberish**
WordPress default slugs from titles like "My AMAZING Post!!! (Updated 2026)" become \`my-amazing-post-updated-2026\`. Clean this up before publishing.

**2. Including dates in slugs**
\`/blog/2026/11/image-compression\` makes the content look dated even if you update it annually. Use \`/blog/image-compression\` and update the content without changing the URL.

**3. Changing slugs after publishing**
Changing a slug breaks all existing links, social shares, and search engine rankings for that URL. If you must change a slug, set up a 301 redirect from the old URL to the new one.

**4. Keyword stuffing**
\`/best-image-compressor-free-online-image-compression-tool-2026\` reads as spam to both users and search engines.

## Generate clean slugs instantly

Our [slug generator](/slug-generator) transforms any text input into a clean, URL-safe slug. It handles:

- Unicode to ASCII transliteration (ü → u, ñ → n, 日本語 → empty or transliterated)
- Automatic lowercasing
- Special character removal
- Whitespace to hyphen conversion
- Consecutive hyphen collapsing

For encoding arbitrary text in URLs (query parameters, fragment identifiers), use the [URL encoder](/url-encoder) which applies proper percent-encoding.

## FAQ

**Should I use hyphens or underscores in URLs?**
Hyphens. Google treats hyphens as word separators but underscores as word joiners. \`image-compression\` registers as two words; \`image_compression\` registers as one compound word. Google's official recommendation is hyphens.

**How long should a URL slug be?**
Keep slugs under 60 characters. Google displays approximately 60–70 characters of the URL in search results. Shorter slugs are easier to share, remember, and type.

**Do URL slugs affect page speed?**
No. Slug length has zero impact on page load speed. The URL is resolved by the server before any content is transmitted.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 22: Video to GIF: Create Perfect Animated Screenshots
   * ─────────────────────────────────────────────────── */
  {
    slug: "video-to-gif-animated-screenshots",
    publishedAt: "2026-11-25",
    toolIds: ["video-to-gif", "image-compressor"],
    locale: {
      en: {
        title: "Video to GIF: Create Perfect Animated Screenshots",
        description: "Convert screen recordings into lightweight GIFs for documentation, bug reports, and social media. Optimization tips to keep file sizes small without sacrificing clarity.",
        body: `
A five-second GIF showing a UI bug in action communicates more than three paragraphs of text in a bug report. Animated GIFs work everywhere — GitHub issues, Slack messages, Notion docs, email bodies — without requiring the recipient to click play or have a specific video player. Converting a screen recording into an optimized GIF is one of the most practical skills for developers, designers, and technical writers.

## When GIFs beat video

**Bug reports:** A GIF of a flickering button or misaligned layout loops continuously, making the issue impossible to miss. Video requires the reviewer to press play, seek to the right timestamp, and watch actively.

**Documentation and tutorials:** Step-by-step GIFs embedded directly in README files and wikis show the exact interaction without leaving the page.

**Pull request descriptions:** A before/after GIF pair in a PR description instantly shows reviewers what changed visually.

**Social media and messaging:** GIFs autoplay natively in Twitter, LinkedIn, Slack, Discord, and iMessage. Video may not.

## When video beats GIFs

GIFs have real limitations:
- **No audio.** If you need narration or sound effects, use video.
- **256-color palette.** GIFs support only 256 colors per frame. Photographic content and gradients look banded.
- **Large file sizes for long clips.** A 30-second screen recording GIF can easily be 20+ MB. The same content as an MP4 would be 2 MB.
- **No seeking or scrubbing.** You cannot jump to a specific timestamp in a GIF.

**The sweet spot for GIFs:** 2–10 second clips showing UI interactions, with limited color variety (typical of software interfaces).

## How to create optimized GIFs

### Step 1: Record the screen interaction

Use your operating system's built-in recording:
- **macOS:** Cmd+Shift+5, select region, record
- **Windows:** Win+G (Xbox Game Bar), select region
- **Linux:** Use OBS Studio or SimpleScreenRecorder

Record only the specific area of interest, not your full screen. Smaller dimensions mean dramatically smaller GIF files.

### Step 2: Convert to GIF

Upload your recording to our [video to GIF](/video-to-gif) converter. The tool lets you:

- Trim the start and end points to capture only the relevant action
- Set the output frame rate (10–15 fps is ideal for UI recordings — smooth enough to follow but much smaller than 30 fps)
- Adjust dimensions to reduce file size
- Preview the result before downloading

### Step 3: Optimize file size

If your GIF exceeds 5 MB (a common platform limit), reduce it by:

1. **Lowering frame rate:** 10 fps saves 67% compared to 30 fps and looks fine for most UI interactions.
2. **Reducing dimensions:** A 600px-wide GIF is plenty for most documentation. No need for full 1920px resolution.
3. **Trimming length:** Cut to the essential action. Every extra second adds frames.
4. **Reducing colors:** Some converters let you drop from 256 to 128 colors with minimal visual impact.

For further compression of the resulting file, run it through the [image compressor](/image-compressor) which can apply lossy GIF optimization.

## GIF file size guide

| Duration | Dimensions | Frame rate | Approximate size |
|---|---|---|---|
| 3 seconds | 400×300 | 10 fps | 200–500 KB |
| 5 seconds | 600×400 | 12 fps | 500 KB–1.5 MB |
| 10 seconds | 800×600 | 15 fps | 2–5 MB |
| 20 seconds | 1024×768 | 15 fps | 5–15 MB |

## Best practices for professional GIFs

- **Add a slight pause at the end.** Before the GIF loops, hold the final state for 1–2 seconds so viewers can absorb the result.
- **Use a consistent recording area.** If you are making multiple GIFs for a documentation page, record them all at the same dimensions.
- **Highlight the cursor.** For tutorial GIFs, use a cursor highlighter so viewers can track where you click.
- **Consider WebP/APNG alternatives.** These formats support animation with better compression. However, GIF remains the most universally supported format.

## FAQ

**What is the maximum GIF file size for GitHub?**
GitHub supports GIFs up to 10 MB in issues and pull request descriptions. For larger animations, consider uploading as an MP4 video, which GitHub also supports.

**Can I convert a GIF back to video?**
Yes, most video editors accept GIF input. Converting GIF to MP4 typically produces a much smaller file with identical visual content.

**Why does my GIF look grainy or banded?**
GIF is limited to 256 colors per frame. Photographic content, gradients, and shadows lose detail. For high-color-depth content, consider animated WebP or short MP4 clips instead.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 23: Cron Expression Cheat Sheet
   * ─────────────────────────────────────────────────── */
  {
    slug: "cron-expression-cheat-sheet",
    publishedAt: "2026-11-25",
    toolIds: ["cron-generator", "unix-timestamp-converter"],
    locale: {
      en: {
        title: "Cron Expression Cheat Sheet: Schedule Any Task",
        description: "Master cron syntax with practical examples for every common scheduling pattern. From simple daily tasks to complex multi-condition schedules.",
        body: `
Cron is the standard task scheduler on Unix systems, and cron-like scheduling has been adopted by CI/CD platforms, cloud functions, Kubernetes CronJobs, and workflow automation tools. The syntax is compact but cryptic — five fields that control minute, hour, day, month, and weekday can express surprisingly complex schedules. Here is a practical reference with real examples.

## Cron syntax: the five fields

\`\`\`
┌───────── minute (0–59)
│ ┌─────── hour (0–23)
│ │ ┌───── day of month (1–31)
│ │ │ ┌─── month (1–12)
│ │ │ │ ┌─ day of week (0–7, where 0 and 7 are Sunday)
│ │ │ │ │
* * * * *
\`\`\`

Each field accepts:
- **Specific values:** \`5\` (at minute 5)
- **Lists:** \`1,15\` (at minute 1 and minute 15)
- **Ranges:** \`9-17\` (hours 9 through 17)
- **Steps:** \`*/15\` (every 15 units)
- **Wildcard:** \`*\` (every possible value)

## 20 practical cron examples

### Basic intervals
| Expression | Schedule |
|---|---|
| \`* * * * *\` | Every minute |
| \`*/5 * * * *\` | Every 5 minutes |
| \`*/15 * * * *\` | Every 15 minutes |
| \`0 * * * *\` | Every hour (at minute 0) |
| \`0 */2 * * *\` | Every 2 hours |
| \`0 */6 * * *\` | Every 6 hours |

### Daily schedules
| Expression | Schedule |
|---|---|
| \`0 0 * * *\` | Daily at midnight |
| \`0 9 * * *\` | Daily at 9:00 AM |
| \`30 17 * * *\` | Daily at 5:30 PM |
| \`0 9,17 * * *\` | Twice daily at 9 AM and 5 PM |

### Weekly schedules
| Expression | Schedule |
|---|---|
| \`0 9 * * 1\` | Every Monday at 9 AM |
| \`0 9 * * 1-5\` | Weekdays at 9 AM |
| \`0 0 * * 0\` | Every Sunday at midnight |
| \`0 10 * * 6\` | Every Saturday at 10 AM |

### Monthly and yearly schedules
| Expression | Schedule |
|---|---|
| \`0 0 1 * *\` | First day of every month at midnight |
| \`0 9 15 * *\` | 15th of every month at 9 AM |
| \`0 0 1 1 *\` | January 1st at midnight (yearly) |
| \`0 0 1 */3 *\` | First day of every quarter |

### Business-specific patterns
| Expression | Schedule |
|---|---|
| \`0 2 * * 0\` | Weekly backup: Sunday at 2 AM |
| \`0 0 1,15 * *\` | Bi-monthly reports: 1st and 15th |

## Common cron pitfalls

**1. Timezone confusion**
Cron runs in the system's local timezone unless configured otherwise. A cron job set to \`0 9 * * *\` on a UTC server fires at 9:00 UTC, which is 2:30 PM IST or 4:00 AM EST. Always document which timezone your cron schedule uses.

**2. Day-of-month vs day-of-week conflict**
When both day-of-month and day-of-week are specified (not *), most cron implementations run the job when EITHER condition is met, not when BOTH are met. \`0 9 15 * 1\` runs at 9 AM on the 15th AND every Monday, not "the 15th if it falls on Monday."

**3. Missing leading zeros**
Cron does not use leading zeros. \`09\` is invalid in some implementations; use \`9\`.

**4. February 29th and 31st**
\`0 0 31 * *\` runs only in months with 31 days (January, March, May, July, August, October, December). \`0 0 29 2 *\` runs only in leap years.

## Build and validate cron expressions

Our [cron expression generator](/cron-generator) lets you build cron schedules visually. Select your desired frequency, adjust parameters, and the tool generates the correct expression. It also shows the next 5 scheduled execution times so you can verify the schedule is correct before deploying.

When working with Unix timestamps in your cron job outputs or logs, use the [Unix timestamp converter](/unix-timestamp-converter) to convert between human-readable dates and epoch seconds.

## FAQ

**What is the difference between cron and crontab?**
Cron is the daemon (background service) that runs scheduled tasks. Crontab is the file or command that defines the schedule. You edit the crontab (\`crontab -e\`) to tell the cron daemon what to run.

**Can cron run a task every 45 seconds?**
No. Cron's minimum granularity is one minute. For sub-minute scheduling, use a loop within a script, \`systemd\` timers, or a dedicated task scheduler.

**Do Kubernetes CronJobs use the same syntax?**
Yes. Kubernetes CronJobs use standard 5-field cron syntax. Some extended formats (like AWS EventBridge) add a sixth field for seconds or year.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 24: Color Contrast & Accessibility
   * ─────────────────────────────────────────────────── */
  {
    slug: "color-contrast-accessibility-wcag",
    publishedAt: "2026-11-25",
    toolIds: ["contrast-checker", "color-converter", "color-palette-generator"],
    locale: {
      en: {
        title: "Color Contrast & Accessibility: WCAG Guidelines Explained",
        description: "Learn WCAG contrast ratios, test your color combinations, and fix accessibility failures. A practical guide for designers and developers building inclusive interfaces.",
        body: `
Approximately 300 million people worldwide have color vision deficiency, and over 2 billion have some form of vision impairment. When your gray text on a slightly-less-gray background looks stylish on your retina display, it may be completely unreadable for a significant portion of your users — and in many jurisdictions, it violates accessibility laws.

## What is color contrast ratio?

Contrast ratio measures the difference in luminance (perceived brightness) between two colors. It is expressed as a ratio from 1:1 (no contrast, identical colors) to 21:1 (maximum contrast, black on white).

The formula uses relative luminance:
**Contrast ratio = (L1 + 0.05) / (L2 + 0.05)**

Where L1 is the lighter color's relative luminance and L2 is the darker color's. Relative luminance accounts for how human vision perceives different wavelengths — we are most sensitive to green, less to red, and least to blue.

## WCAG contrast requirements

The Web Content Accessibility Guidelines (WCAG) define two conformance levels:

### Level AA (minimum requirement)
- **Normal text** (under 18pt / 24px): minimum **4.5:1** contrast ratio
- **Large text** (18pt+ bold or 24px+ regular): minimum **3:1** contrast ratio
- **UI components and graphical objects:** minimum **3:1** contrast ratio

### Level AAA (enhanced)
- **Normal text:** minimum **7:1** contrast ratio
- **Large text:** minimum **4.5:1** contrast ratio

Most accessibility laws (ADA in the US, EAA in the EU, AODA in Canada) reference WCAG AA as the legal baseline.

## Common contrast failures

**1. Light gray text on white backgrounds**
The most common accessibility failure on the web. Gray (#999999) on white (#FFFFFF) has a contrast ratio of only 2.85:1 — far below the 4.5:1 minimum. Darkening to #767676 achieves exactly 4.54:1.

**2. Colored text on colored backgrounds**
Blue (#0000FF) on black (#000000) has a ratio of only 2.44:1. Colors that look vibrant and distinct to you may have insufficient luminance contrast.

**3. Placeholder text in input fields**
Default placeholder text in many design systems uses light gray that fails contrast requirements. Placeholders are not exempt from accessibility standards if they convey information.

**4. Text over images**
Text placed over photographs without a semi-transparent overlay often fails contrast in areas where the image is light-colored.

## How to test your color combinations

### Manual testing
Our [contrast checker](/contrast-checker) lets you input any foreground and background color combination and immediately shows:

- The exact contrast ratio
- Pass/fail status for WCAG AA and AAA at both normal and large text sizes
- A visual preview of the text on the background

### Fixing failing combinations
When a combination fails, you have two options:
1. **Darken the text color** (increase the foreground luminance difference)
2. **Lighten the background** (increase the background luminance)

The contrast checker shows you how much adjustment is needed to reach each conformance level.

## Working with accessible color palettes

Building an entire design system with accessible colors requires systematic planning:

1. **Start with your brand colors.** Use the [color converter](/color-converter) to get HSL values, which make it easy to adjust lightness while preserving hue.
2. **Generate complementary shades.** Use the [color palette generator](/color-palette-generator) to create a range of tints and shades for each brand color.
3. **Test every text/background combination.** A palette of 5 colors creates 20 possible text/background pairs. Test them all.
4. **Document passing combinations.** Create a contrast matrix showing which color pairs pass AA and AAA for your team.

## Beyond color: inclusive design principles

Color contrast is essential but not sufficient. Accessible design also requires:

- **Never use color alone to convey meaning.** Add icons, labels, or patterns alongside color indicators (red/green status dots).
- **Support high contrast mode.** Windows High Contrast Mode overrides your colors. Ensure your layout still works.
- **Test with screen readers.** Contrast is irrelevant to users who cannot see the screen at all.
- **Respect prefers-reduced-motion.** Users with vestibular disorders may be harmed by animations.

## FAQ

**Is WCAG compliance legally required?**
In many jurisdictions, yes. The Americans with Disabilities Act (ADA) has been interpreted by courts to apply to websites. The European Accessibility Act (EAA) explicitly requires digital accessibility by June 2025. Non-compliance can result in lawsuits and fines.

**What contrast ratio should I target?**
Target WCAG AA (4.5:1 for body text) as the minimum. For public-facing content, aim for AAA (7:1) where possible. The higher the contrast, the more readable your content is for everyone — including users in bright sunlight or on low-quality displays.

**Does dark mode need different contrast testing?**
Yes. Colors that pass on a white background may not pass on a dark background, and vice versa. Test your contrast ratios separately for each color mode your application supports.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 25: Casing Conventions: When to Use camelCase, snake_case & More
   * ─────────────────────────────────────────────────── */
  {
    slug: "casing-conventions-camelcase-snake-case",
    publishedAt: "2026-11-25",
    toolIds: ["case-converter", "slug-generator", "json-formatter"],
    locale: {
      en: {
        title: "Casing Conventions: When to Use camelCase, snake_case & More",
        description: "Every programming language and platform has its preferred casing style. Learn which convention to use where, why consistency matters, and how to convert between them instantly.",
        body: `
Naming conventions are one of those "small" decisions that cause outsized arguments in code reviews. Should your API return \`firstName\` or \`first_name\`? Should your CSS class be \`primary-button\` or \`primaryButton\`? The answer is not about personal preference — it is about matching the convention of your ecosystem so that code reads naturally and integrates seamlessly.

## The major casing styles explained

### camelCase
First word lowercase, subsequent words capitalized. No separators.
- Examples: \`firstName\`, \`getUserProfile\`, \`isActive\`
- Used by: JavaScript, TypeScript, Java (methods and variables), Swift, Kotlin

### PascalCase (UpperCamelCase)
Every word capitalized. No separators.
- Examples: \`FirstName\`, \`UserProfile\`, \`HttpClient\`
- Used by: C# (classes and methods), TypeScript (types and interfaces), React (components), .NET

### snake_case
All lowercase, words separated by underscores.
- Examples: \`first_name\`, \`get_user_profile\`, \`is_active\`
- Used by: Python, Ruby, Rust, PostgreSQL, PHP (partially)

### SCREAMING_SNAKE_CASE
All uppercase with underscores.
- Examples: \`MAX_RETRIES\`, \`API_BASE_URL\`, \`DEFAULT_TIMEOUT\`
- Used by: Constants in almost every language

### kebab-case
All lowercase, words separated by hyphens.
- Examples: \`first-name\`, \`primary-button\`, \`my-component\`
- Used by: CSS classes, HTML attributes, URL slugs, Lisp, CLI commands

### dot.case and Train-Case
Less common but appear in specific contexts. Dot case (\`com.example.app\`) is used in Java package names and reverse domain notation. Train-Case (\`First-Name\`) appears in HTTP headers.

## Which convention to use where

| Context | Convention | Example |
|---|---|---|
| JavaScript variables | camelCase | \`const userName = ...\` |
| TypeScript interfaces | PascalCase | \`interface UserProfile { }\` |
| React components | PascalCase | \`<UserCard />\` |
| Python functions | snake_case | \`def get_user()\` |
| CSS classes | kebab-case | \`.nav-item\` |
| SQL columns | snake_case | \`SELECT first_name\` |
| Environment variables | SCREAMING_SNAKE | \`DATABASE_URL\` |
| REST API JSON keys | camelCase or snake_case | Depends on backend language |
| URL paths | kebab-case | \`/user-profile\` |
| File names | kebab-case or snake_case | \`user-profile.ts\` or \`user_profile.py\` |

## The API casing dilemma

When a Python backend (snake_case) serves a JavaScript frontend (camelCase), someone has to convert. There are three approaches:

**1. Backend wins:** API returns \`first_name\`, frontend converts to \`firstName\` on receipt.
**2. Frontend wins:** API returns \`firstName\`, backend converts from internal \`first_name\`.
**3. Convention wins:** Use camelCase in JSON regardless of backend language (this is the most common standard for public APIs).

Whatever you choose, be consistent across all endpoints.

## Convert between casing styles

Our [case converter](/case-converter) transforms text between all major casing styles instantly:

- camelCase ↔ snake_case ↔ kebab-case ↔ PascalCase ↔ SCREAMING_SNAKE
- Handles multi-word inputs, acronyms, and numbers intelligently
- Bulk conversion for multiple identifiers at once

For converting variable names in URL paths, the [slug generator](/slug-generator) handles the specific rules of URL-safe kebab-case. For reformatting JSON keys across an entire API response, paste the JSON into the [JSON formatter](/json-formatter).

## Why consistency matters more than the specific choice

The *wrong* convention used consistently is better than the *right* convention used inconsistently. Mixing \`firstName\` and \`first_name\` in the same codebase:

- Forces developers to remember which style each variable uses
- Makes global search-and-replace unreliable
- Creates confusion in code reviews about whether a name mismatch is intentional
- Breaks automated tooling that expects consistent patterns

Pick a convention, enforce it with a linter, and move on to more important decisions.

## FAQ

**Should I use camelCase or snake_case in JSON APIs?**
If your API consumers are primarily JavaScript clients (most web APIs), use camelCase. If your API is consumed by Python or Ruby services, snake_case may be more natural. Major public APIs (Google, GitHub, Stripe) use different conventions — consistency within your API is what matters.

**How should I name files in a project?**
Use the convention of your ecosystem. React: \`PascalCase.tsx\` for components. Python: \`snake_case.py\`. General web: \`kebab-case.ts\`. Avoid spaces in file names; they cause problems in shell commands and URLs.

**Are there performance differences between casing styles?**
No. Casing is purely a human readability and convention concern. The runtime does not care whether your variable is called \`firstName\` or \`first_name\`.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 26: SQL Formatting: Write Readable Queries
   * ─────────────────────────────────────────────────── */
  {
    slug: "sql-formatting-readable-queries",
    publishedAt: "2026-11-25",
    toolIds: ["sql-formatter", "text-compare"],
    locale: {
      en: {
        title: "SQL Formatting: Write Readable Queries That Your Team Will Thank You For",
        description: "Transform tangled one-line SQL into clean, maintainable queries. Learn formatting conventions, common style debates, and how to auto-format SQL instantly.",
        body: `
A 200-character SQL query on one line is technically valid but practically unmaintainable. When a production incident happens at 2 AM and you need to understand what a query does, formatting is the difference between a 30-second scan and a 10-minute puzzle. Clean SQL formatting is not cosmetic — it is a communication tool.

## Why SQL formatting matters

**Debugging speed:** Formatted queries let you visually scan the structure — which tables are joined, what conditions filter rows, which columns are selected — without mentally parsing character by character.

**Code review quality:** Reviewers spot logical errors, missing join conditions, and incorrect filters much faster in formatted SQL.

**Version control clarity:** When each clause is on its own line, Git diffs show exactly which clause changed. A one-line query appears as "the entire query changed" in every diff.

**Onboarding:** New team members can read and understand formatted queries without asking the author to explain them.

## Core formatting rules

### 1. Major clauses on new lines
\`\`\`sql
SELECT
  users.name,
  users.email,
  orders.total
FROM users
JOIN orders ON orders.user_id = users.id
WHERE users.active = true
  AND orders.created_at > '2026-01-01'
ORDER BY orders.total DESC
LIMIT 100;
\`\`\`

### 2. Indent continuation lines
Columns under SELECT, conditions under WHERE, and join conditions under ON are indented to show they belong to the parent clause.

### 3. One column per line in SELECT
\`\`\`sql
-- Bad: hard to scan, hard to diff
SELECT name, email, phone, address, city, state, zip FROM users;

-- Good: each column visible, easy to comment out
SELECT
  name,
  email,
  phone,
  address,
  city,
  state,
  zip
FROM users;
\`\`\`

### 4. Uppercase keywords (convention)
Using uppercase for SQL keywords (\`SELECT\`, \`FROM\`, \`WHERE\`, \`JOIN\`) visually separates structure from data:

\`\`\`sql
SELECT u.name
FROM users u
WHERE u.active = TRUE;
\`\`\`

This is the most common convention, though some teams prefer lowercase keywords. The critical rule is: pick one and be consistent.

### 5. Align JOIN clauses
\`\`\`sql
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN products p ON p.id = o.product_id
LEFT JOIN reviews r ON r.order_id = o.id
\`\`\`

### 6. Subqueries get their own indentation level
\`\`\`sql
SELECT name
FROM users
WHERE id IN (
  SELECT user_id
  FROM orders
  WHERE total > 1000
);
\`\`\`

## Common SQL style debates

**Leading commas vs trailing commas:**
\`\`\`sql
-- Trailing (more common)
SELECT
  name,
  email,
  phone

-- Leading (easier to comment out lines)
SELECT
  name
  , email
  , phone
\`\`\`

Both work. Trailing is more conventional; leading has practical advantages for editing.

**Table aliases — single letters vs descriptive:**
\`u\` for users is concise but cryptic in complex queries. \`usr\` or even \`users\` (no alias) is clearer for queries joining 5+ tables.

## Format SQL instantly

Paste any SQL into our [SQL formatter](/sql-formatter). It auto-formats using industry-standard conventions:

- Proper keyword capitalization
- Clause-per-line structure
- Consistent indentation
- Support for PostgreSQL, MySQL, and standard SQL dialects

After formatting a query, use the [text compare](/text-compare) tool to verify that your formatting changes did not accidentally alter the query logic.

## FAQ

**Does SQL formatting affect query performance?**
No. Whitespace and line breaks are ignored by the SQL parser. Formatting is purely for human readability.

**Should I format SQL in application code (ORM queries)?**
For raw SQL strings embedded in application code, yes — format them as multi-line strings. For ORM-generated queries, the ORM handles formatting when you log or debug.

**What is the best SQL formatter for my IDE?**
Most IDEs have SQL formatting plugins (SQLTools for VS Code, SQL formatting in JetBrains DataGrip). For quick one-off formatting without IDE setup, our web-based formatter works instantly.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 27: JWT Tokens Decoded: What Is Inside Your Auth Token
   * ─────────────────────────────────────────────────── */
  {
    slug: "jwt-tokens-decoded-explained",
    publishedAt: "2026-11-25",
    toolIds: ["jwt-decoder", "base64", "json-formatter"],
    locale: {
      en: {
        title: "JWT Tokens Decoded: What's Inside Your Auth Token",
        description: "Understand the three parts of a JSON Web Token, what claims mean, how to decode and inspect JWTs, and common security mistakes to avoid.",
        body: `
Every time you log into a modern web application, you probably receive a JSON Web Token (JWT). It is the string that starts with "eyJ" in your browser's cookies or authorization headers. Developers pass JWTs around constantly, but many never inspect what is actually inside them. Understanding JWT structure helps you debug authentication issues, spot security misconfigurations, and design better auth systems.

## JWT structure: three parts

A JWT is three Base64URL-encoded segments separated by dots:

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

### Part 1: Header
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`
Declares the signing algorithm (HS256, RS256, ES256, etc.) and token type.

### Part 2: Payload (Claims)
\`\`\`json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
\`\`\`
Contains the actual data — user identity, permissions, expiration time. These are called "claims."

### Part 3: Signature
A cryptographic hash of the header + payload, signed with a secret key. This prevents tampering — if anyone modifies the payload, the signature becomes invalid.

## Standard JWT claims

| Claim | Full name | Purpose |
|---|---|---|
| \`sub\` | Subject | Identifies the user (typically a user ID) |
| \`iss\` | Issuer | Who created the token (your auth server) |
| \`aud\` | Audience | Who should accept the token (your API) |
| \`exp\` | Expiration | Unix timestamp when the token expires |
| \`iat\` | Issued At | Unix timestamp when the token was created |
| \`nbf\` | Not Before | Token is not valid before this time |
| \`jti\` | JWT ID | Unique identifier for token revocation |

You can add any custom claims alongside these: \`role\`, \`email\`, \`permissions\`, \`org_id\` — whatever your application needs.

## Common JWT security mistakes

**1. Storing sensitive data in the payload**
JWT payloads are encoded, not encrypted. Anyone can decode the Base64 payload and read it. Never put passwords, credit card numbers, or secrets in a JWT.

**2. Not validating the signature**
If your server decodes the payload without verifying the signature, an attacker can modify claims (change their role to "admin") and your server will trust it.

**3. Using the "none" algorithm**
Some JWT libraries accept \`"alg": "none"\` which skips signature verification entirely. This is a critical vulnerability. Always whitelist allowed algorithms.

**4. Long-lived tokens without refresh**
Tokens that expire in 30 days mean a stolen token grants 30 days of access. Use short-lived access tokens (15 minutes) with refresh tokens for longer sessions.

**5. Not checking expiration**
If your server does not validate the \`exp\` claim, expired tokens continue to work indefinitely.

## Decode and inspect JWTs

Use our [JWT decoder](/jwt-decoder) to paste any JWT and instantly see:

- Decoded header with algorithm information
- Full payload with all claims in formatted JSON
- Signature verification status
- Expiration time in human-readable format

For manual inspection, you can also decode each segment separately with the [Base64 decoder](/base64), then format the resulting JSON with the [JSON formatter](/json-formatter).

## Debugging JWT authentication issues

When a JWT auth flow breaks, check these in order:

1. **Is the token expired?** Decode it and check the \`exp\` claim against the current time.
2. **Is the audience correct?** The \`aud\` claim must match your API's expected value.
3. **Is the issuer correct?** The \`iss\` claim must match your auth server's identifier.
4. **Is the algorithm correct?** Mismatched algorithms between issuer and verifier cause silent failures.
5. **Has the signing key rotated?** If your auth server rotated keys, tokens signed with the old key will fail verification.

## FAQ

**Are JWTs encrypted?**
Standard JWTs (JWS) are signed but not encrypted — anyone can read the payload. If you need encrypted tokens, use JWE (JSON Web Encryption), but this is uncommon for most applications.

**Should I store JWTs in localStorage or cookies?**
HttpOnly cookies are more secure because JavaScript cannot access them, preventing XSS attacks from stealing tokens. LocalStorage is vulnerable to XSS but easier to implement for SPAs.

**How big can a JWT be?**
There is no hard size limit, but JWTs are sent with every HTTP request. Keep payloads under 1 KB. If you need more data, store it server-side and reference it by ID in the token.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 28: CSS Box Shadows: Layer Depth Into Your UI
   * ─────────────────────────────────────────────────── */
  {
    slug: "css-box-shadows-layer-depth-ui",
    publishedAt: "2026-11-25",
    toolIds: ["css-box-shadow-generator", "css-border-radius-generator", "gradient-generator"],
    locale: {
      en: {
        title: "CSS Box Shadows: Layer Depth Into Your UI Design",
        description: "Master CSS box-shadow with layered techniques, Material Design elevation, neumorphism, and performance-conscious shadow effects for modern web interfaces.",
        body: `
Flat design had its moment, but depth makes interfaces intuitive. A shadow beneath a card suggests it floats above the background. A deeper shadow on a modal communicates that it is the topmost layer requiring attention. CSS \`box-shadow\` is the primary tool for creating this visual hierarchy, and there is far more to it than \`box-shadow: 0 2px 4px rgba(0,0,0,0.1)\`.

## box-shadow syntax breakdown

\`\`\`css
box-shadow: offset-x offset-y blur-radius spread-radius color;
\`\`\`

| Parameter | What it controls |
|---|---|
| \`offset-x\` | Horizontal position (positive = right, negative = left) |
| \`offset-y\` | Vertical position (positive = down, negative = up) |
| \`blur-radius\` | How soft the shadow edge is (0 = sharp, larger = softer) |
| \`spread-radius\` | Shadow size relative to element (positive = larger, negative = smaller) |
| \`color\` | Shadow color (use rgba or hsla for transparency) |

Adding the \`inset\` keyword places the shadow inside the element, creating an indented or pressed effect.

## Layered shadows for realistic depth

The secret to natural-looking shadows: multiple layers. Real objects cast complex shadows with both a soft ambient component and a sharper directional component.

**Single shadow (flat, artificial):**
\`\`\`css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
\`\`\`

**Layered shadows (natural, dimensional):**
\`\`\`css
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.07),
  0 2px 4px rgba(0, 0, 0, 0.07),
  0 4px 8px rgba(0, 0, 0, 0.07),
  0 8px 16px rgba(0, 0, 0, 0.07),
  0 16px 32px rgba(0, 0, 0, 0.07);
\`\`\`

Each layer is progressively larger and softer. The combined effect looks like a realistic shadow cast by a light source, because that is essentially what it simulates — multiple light bounces at different distances.

## Material Design elevation system

Google's Material Design defines specific shadow values for each elevation level:

| Elevation | Usage | Characteristic |
|---|---|---|
| 0dp | Flat surface | No shadow |
| 1dp | Cards, search bars | Subtle lift |
| 2dp | Buttons in resting state | Gentle float |
| 4dp | App bars, raised buttons | Moderate depth |
| 8dp | FABs, bottom navigation | Pronounced float |
| 16dp | Modals, dialogs | High overlay |
| 24dp | Pickers, tooltips | Maximum elevation |

Each level uses progressively larger blur and offset values with slightly reduced opacity.

## Neumorphism (soft UI)

Neumorphism uses paired box-shadows — one light and one dark — on a colored background to create a soft, embossed look:

\`\`\`css
.neumorphic {
  background: #e0e0e0;
  box-shadow:
    8px 8px 16px #bebebe,
    -8px -8px 16px #ffffff;
}
\`\`\`

The light shadow simulates light hitting the top-left edge, while the dark shadow falls on the bottom-right. The effect works best on gray or muted backgrounds.

**Accessibility warning:** Neumorphism often creates insufficient contrast between interactive elements and their backgrounds. Always verify that buttons and inputs are distinguishable for all users.

## Performance considerations

Box-shadow triggers paint operations in the browser. For animated shadows (hover effects, transitions), this can cause jank on low-powered devices:

- **Use \`will-change: box-shadow\`** sparingly on elements that animate their shadows
- **Prefer \`filter: drop-shadow()\`** for simple shadows on irregular shapes (it follows the element's alpha channel)
- **Avoid animating box-shadow directly** in performance-critical animations; instead, animate the opacity of a pseudo-element that has the shadow pre-applied

## Generate complex shadows visually

Our [CSS box shadow generator](/css-box-shadow-generator) lets you visually adjust all shadow parameters in real time:

- Multiple shadow layers with individual controls
- Inset shadow toggle
- Color picker with opacity
- Live preview with copy-ready CSS

Combine shadows with organic shapes from the [CSS border radius generator](/css-border-radius-generator) and gradient backgrounds from the [gradient generator](/gradient-generator) for complete visual effects.

## FAQ

**Can I use box-shadow on text?**
No. \`box-shadow\` applies to the element's box. For text shadows, use the separate \`text-shadow\` property which has similar syntax but no spread-radius parameter.

**How many shadow layers is too many?**
In terms of rendering, modern browsers handle 5–10 layers without issues. Beyond 10 layers on many elements, you may notice performance impacts during scrolling. For most designs, 2–5 layers provide excellent results.

**Do shadows work with border-radius?**
Yes. Box-shadow automatically follows the element's border-radius curve. A circular element (\`border-radius: 50%\`) casts a circular shadow.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 29: Unix Timestamps Explained for Developers
   * ─────────────────────────────────────────────────── */
  {
    slug: "unix-timestamps-explained-developers",
    publishedAt: "2026-11-25",
    toolIds: ["unix-timestamp-converter", "date-calculator"],
    locale: {
      en: {
        title: "Unix Timestamps Explained: What Every Developer Should Know",
        description: "Understand epoch time, convert between timestamps and dates, handle timezone pitfalls, and prepare for the Year 2038 problem.",
        body: `
Every database row, log entry, and API response that includes a time probably uses a Unix timestamp somewhere in the stack. It is the universal language of time in computing — a single integer that every programming language, database, and operating system can agree on. Yet timestamps trip up developers constantly with timezone confusion, precision mismatches, and the looming 2038 problem.

## What is a Unix timestamp?

A Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. This reference point is called the Unix epoch.

Right now, the Unix timestamp is approximately 1,795,700,000 (November 2026). The number is always in UTC — there is no timezone component.

**Key examples:**
| Timestamp | Date (UTC) |
|---|---|
| 0 | January 1, 1970, 00:00:00 |
| 86400 | January 2, 1970, 00:00:00 (one day later) |
| 946684800 | January 1, 2000, 00:00:00 |
| 1000000000 | September 9, 2001, 01:46:40 |
| 2000000000 | May 18, 2033, 03:33:20 |
| 2147483647 | January 19, 2038, 03:14:07 (32-bit limit) |

## Seconds vs milliseconds vs microseconds

Different systems use different precisions:

| Precision | Digits | Used by |
|---|---|---|
| Seconds | 10 digits (1,795,700,000) | Unix systems, PHP, Python \`time.time()\` |
| Milliseconds | 13 digits (1,795,700,000,000) | JavaScript \`Date.now()\`, Java \`System.currentTimeMillis()\` |
| Microseconds | 16 digits | Python \`datetime\`, PostgreSQL |
| Nanoseconds | 19 digits | Go \`time.Now().UnixNano()\`, high-precision logging |

Mixing these up is one of the most common timestamp bugs. A timestamp of 1,795,700,000,000 interpreted as seconds puts you in the year 58,000+. The same number interpreted as milliseconds is November 2026.

## The timezone trap

Unix timestamps are always UTC. The confusion happens during conversion:

\`\`\`javascript
// JavaScript
new Date(1795700000000)
// Output depends on the machine's timezone!
// UTC: "2026-11-25T10:33:20.000Z"
// EST: "2026-11-25T05:33:20" (displayed in local time)
\`\`\`

The timestamp itself does not change. But when you display it to users or log it, the local timezone offset is applied. This creates discrepancies when:

- A server in UTC generates a timestamp
- A client in IST (+5:30) displays it
- A developer in EST (-5:00) reads the logs

**Rule:** Store and transmit timestamps in UTC. Convert to local time only at the display layer.

## The Year 2038 problem

Traditional Unix systems store timestamps as a signed 32-bit integer. The maximum value is 2,147,483,647, which corresponds to January 19, 2038, at 03:14:07 UTC. One second later, the integer overflows to -2,147,483,648, which represents December 13, 1901.

**Who is affected:**
- 32-bit embedded systems (IoT devices, automotive computers, industrial controllers)
- Legacy databases with 32-bit integer timestamp columns
- File systems that use 32-bit timestamps

**Who is safe:**
- 64-bit systems (most modern servers and desktops) handle timestamps until the year 292,277,026,596.
- JavaScript uses 64-bit floating point for \`Date.now()\`.
- Modern databases (PostgreSQL, MySQL 8+) use 64-bit timestamp types.

## Convert timestamps instantly

Our [Unix timestamp converter](/unix-timestamp-converter) handles bidirectional conversion:

- Enter a Unix timestamp (seconds or milliseconds) and see the human-readable date in multiple timezones
- Enter a date and time to get the corresponding Unix timestamp
- View the current timestamp in real-time

For calculating durations between dates (how many seconds between two events), the [date calculator](/date-calculator) provides exact differences.

## FAQ

**Why does Unix time start on January 1, 1970?**
It is an arbitrary convention chosen by early Unix developers. The epoch needed to be recent enough to represent contemporary dates with manageable numbers, and far enough in the past to cover existing data.

**Are negative timestamps valid?**
Yes. Negative timestamps represent dates before January 1, 1970. A timestamp of -86400 represents December 31, 1969. Most programming languages handle negative timestamps correctly.

**Should I use timestamps or ISO 8601 strings in APIs?**
For machine-to-machine communication (databases, internal APIs), timestamps are efficient and unambiguous. For human-facing APIs and data interchange, ISO 8601 strings (\`2026-11-25T10:30:00Z\`) are more readable and self-documenting.
`,
      },
    },
  },

  /* ───────────────────────────────────────────────────
   * Post 30: Remove Duplicate Lines from Text: Practical Uses
   * ─────────────────────────────────────────────────── */
  {
    slug: "remove-duplicate-lines-practical-uses",
    publishedAt: "2026-11-25",
    toolIds: ["remove-duplicate-lines", "word-counter", "text-compare"],
    locale: {
      en: {
        title: "Remove Duplicate Lines: Clean Up Lists, Logs & Data Fast",
        description: "Deduplicate email lists, log files, CSV data, and code in seconds. Learn practical techniques for identifying and removing duplicate content from any text.",
        body: `
Duplicate data costs real time and money. A marketing email list with 20% duplicates means 20% wasted sending costs. A log file with repeated error messages obscures the unique issues. A hosts file or configuration with duplicate entries causes unpredictable behavior. Removing duplicate lines is one of the most common text processing tasks, yet many people still do it manually or struggle with spreadsheet formulas.

## Common sources of duplicate lines

### Email and contact lists
Exporting contacts from multiple sources (Gmail, Outlook, CRM) and merging them inevitably creates duplicates. The same email address appears multiple times with slight variations — different capitalization, extra whitespace, or slightly different names.

### Log files
Application logs often repeat the same error message hundreds of times when a service enters a failure loop. Finding the unique errors buried in 10,000 lines of repeated stack traces requires deduplication.

### CSV and data exports
Database exports with accidental JOINs that multiply rows, or repeated data imports that append instead of upsert, create datasets with duplicate rows.

### Configuration files
DNS records, hosts files, .gitignore entries, and environment variable files accumulate duplicates over time as different team members add entries without checking existing ones.

### Code
Import statements, CSS declarations, and package dependencies can contain duplicates that linters miss or that accumulated during merge conflicts.

## Methods for removing duplicates

### Browser-based tool (fastest for one-off tasks)
Paste your text into our [remove duplicate lines](/remove-duplicate-lines) tool. It instantly:

- Identifies and removes exact duplicate lines
- Optionally trims whitespace before comparison (catches "  hello  " and "hello" as duplicates)
- Optionally ignores case ("Hello" and "hello" treated as the same)
- Shows the count of duplicates removed
- Preserves the original order of first occurrences

### Command line
For files on your system:
\`\`\`bash
sort file.txt | uniq > deduped.txt       # sorted output
awk '!seen[$0]++' file.txt > deduped.txt  # preserves original order
\`\`\`

The \`awk\` approach is preferred because it maintains the original line order while removing duplicates.

### Spreadsheet
In Google Sheets: Data → Data cleanup → Remove duplicates. In Excel: Data → Remove Duplicates. Both allow selecting which columns determine uniqueness.

## Deduplication strategy for large datasets

For small lists (under 10,000 lines), simple line-by-line comparison works perfectly. For larger datasets, consider:

1. **Normalize first.** Trim whitespace, standardize case, remove invisible characters. Many "duplicates" are only duplicates after normalization.
2. **Define uniqueness.** For CSV data, which columns determine uniqueness? Two rows with the same email but different names — are they duplicates?
3. **Choose which copy to keep.** Usually the first occurrence, but sometimes you want the latest (most recent timestamp) or the most complete (fewest empty fields).
4. **Verify after deduplication.** Use the [text compare](/text-compare) tool to compare your original and deduplicated text, ensuring you did not accidentally remove legitimate unique lines.

After deduplication, check your final line count with the [word counter](/word-counter) to verify the expected number of unique entries.

## FAQ

**Does removing duplicates preserve the original order?**
In our tool, yes. The first occurrence of each unique line is kept in its original position. All subsequent duplicates are removed.

**How do I remove near-duplicates (similar but not identical lines)?**
Near-duplicate detection requires fuzzy matching algorithms (Levenshtein distance, Jaccard similarity). Simple duplicate removal only catches exact matches. For near-duplicates, consider dedicated data cleaning tools or write a script with a similarity threshold.

**Can I remove duplicates from a CSV based on one column only?**
Not with a line-based duplicate remover, since entire lines must match. For column-based deduplication, use a spreadsheet or a script that parses the CSV structure.
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
