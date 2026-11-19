/**
 * Locale translation catalogs for tool names, descriptions, and UI messages.
 *
 * URL slugs live in lib/locales.ts (they affect routing).
 * These translations affect only the displayed text on locale pages.
 */

import type { MessageKey } from "@/locales/en";

/* ------------------------------------------------------------------ */
/*  Tool-level translations                                           */
/* ------------------------------------------------------------------ */

export type ToolTranslation = {
  name: string;
  shortDescription: string;
};

type ToolTranslationCatalog = Record<string, ToolTranslation>;

const es: ToolTranslationCatalog = {
  "word-counter": { name: "Contador de palabras", shortDescription: "Cuenta palabras, caracteres, oraciones, párrafos y tiempo de lectura estimado." },
  "percentage-calculator": { name: "Calculadora de porcentajes", shortDescription: "Calcula un porcentaje, una proporción, un cambio o una diferencia sin dirección." },
  "discount-calculator": { name: "Calculadora de descuentos", shortDescription: "Aplica un porcentaje o una cantidad de descuento, con un segundo descuento opcional." },
  "case-converter": { name: "Conversor de mayúsculas", shortDescription: "Convierte texto a mayúsculas, minúsculas, título, oración, camelCase, PascalCase, snake_case o kebab-case." },
  "json-formatter": { name: "Formateador JSON", shortDescription: "Formatea, minimiza y valida JSON en el navegador." },
  "character-counter": { name: "Contador de caracteres", shortDescription: "Cuenta caracteres con un límite opcional." },
  "age-calculator": { name: "Calculadora de edad", shortDescription: "Calcula la edad en años, meses y días." },
  "qr-code-generator": { name: "Generador de códigos QR", shortDescription: "Crea un código QR para una URL, texto o red Wi-Fi." },
  "password-generator": { name: "Generador de contraseñas", shortDescription: "Crea una contraseña con el generador aleatorio seguro del navegador." },
  "image-compressor": { name: "Compresor de imágenes", shortDescription: "Recodifica un JPG, PNG o WebP y compara tamaños de archivo." },
  "image-resizer": { name: "Redimensionador de imágenes", shortDescription: "Cambia el tamaño de una imagen manteniendo o modificando la relación de aspecto." },
  "merge-pdf": { name: "Unir PDF", shortDescription: "Combina archivos PDF en el navegador." },
  "split-pdf": { name: "Dividir PDF", shortDescription: "Extrae páginas o rangos de un PDF." },
  "jpg-to-pdf": { name: "JPG a PDF", shortDescription: "Coloca imágenes en páginas PDF y descarga el archivo." },
  "rotate-pdf": { name: "Rotar PDF", shortDescription: "Rota todas o páginas seleccionadas 90°, 180° o 270°." },
  "organize-pdf": { name: "Organizar PDF", shortDescription: "Reordena o elimina páginas de un PDF." },
  "crop-pdf": { name: "Recortar PDF", shortDescription: "Recorta los márgenes de todas o páginas seleccionadas." },
  "add-page-numbers": { name: "Añadir números de página", shortDescription: "Estampa números de página en cada página de un PDF." },
  "watermark-pdf": { name: "Marca de agua PDF", shortDescription: "Estampa texto en cada página de un PDF." },
  "unlock-pdf": { name: "Desbloquear PDF", shortDescription: "Elimina restricciones de cifrado de un PDF." },
  "pdf-to-jpg": { name: "PDF a JPG", shortDescription: "Convierte cada página de un PDF en imagen JPEG." },
  "compress-pdf": { name: "Comprimir PDF", shortDescription: "Reduce el tamaño de archivo de un PDF." },
  "edit-pdf": { name: "Editar PDF", shortDescription: "Añade anotaciones de texto a páginas PDF." },
  "pdf-forms": { name: "Formularios PDF", shortDescription: "Rellena campos de formularios PDF interactivos en el navegador." },
  "unit-converter": { name: "Conversor de unidades", shortDescription: "Convierte longitud, masa, temperatura, área, volumen y velocidad." },
  "date-calculator": { name: "Calculadora de fechas", shortDescription: "Cuenta días entre fechas o suma días." },
  "gst-calculator": { name: "Calculadora de GST", shortDescription: "Agrega o elimina una tasa GST que ingreses." },
  "emi-calculator": { name: "Calculadora de EMI", shortDescription: "Estima el pago mensual de un préstamo." },
  "base64": { name: "Codificador Base64", shortDescription: "Codifica y decodifica texto UTF-8 como Base64." },
  "vat-calculator-uk": { name: "Calculadora de IVA del Reino Unido", shortDescription: "Agrega o elimina el IVA del Reino Unido al 20%, 5% reducido o tasa cero." },
  "gst-calculator-australia": { name: "Calculadora GST de Australia", shortDescription: "Agrega 10% de GST o calcula el GST inverso usando la regla de un onceavo del ATO." },
  "slug-generator": { name: "Generador de slug", shortDescription: "Genera slugs amigables para URLs a partir de texto, acentos y scripts multilingües." },
  "text-compare": { name: "Comparador de textos", shortDescription: "Compara dos textos lado a lado para resaltar adiciones y eliminaciones." },
  "france-tva-calculator": { name: "Calculadora de TVA de Francia", shortDescription: "Calcula el TVA francés a las tasas oficiales 20%, 10%, 5.5% y 2.1%." },
  "belgium-tva-calculator": { name: "Calculadora de TVA de Bélgica", shortDescription: "Calcula el TVA belga (BTW) a las tasas oficiales 21%, 12% y 6%." },
  "remove-duplicate-lines": { name: "Limpiador de texto", shortDescription: "Elimina líneas duplicadas, recorta espacios y ordena texto en el navegador." },
  "color-converter": { name: "Conversor de colores", shortDescription: "Convierte códigos de color entre HEX, RGB y HSL con vista previa en vivo." },
  "unix-timestamp-converter": { name: "Conversor de marca de tiempo Unix", shortDescription: "Convierte marcas de tiempo Unix epoch a cadenas UTC y hora local." },
};

const fr: ToolTranslationCatalog = {
  "word-counter": { name: "Compteur de mots", shortDescription: "Comptez les mots, caractères, phrases, paragraphes et le temps de lecture estimé." },
  "percentage-calculator": { name: "Calculateur de pourcentage", shortDescription: "Calculez un pourcentage, une part, un changement ou une différence sans direction." },
  "discount-calculator": { name: "Calculateur de remise", shortDescription: "Appliquez un pourcentage ou un montant de remise, avec une deuxième remise optionnelle." },
  "case-converter": { name: "Convertisseur de casse", shortDescription: "Convertissez le texte en majuscules, minuscules, titre, phrase, camelCase, PascalCase, snake_case ou kebab-case." },
  "json-formatter": { name: "Formateur JSON", shortDescription: "Formatez, minifiez et validez le JSON dans le navigateur." },
  "character-counter": { name: "Compteur de caractères", shortDescription: "Comptez les caractères avec une limite optionnelle." },
  "age-calculator": { name: "Calculateur d'âge", shortDescription: "Trouvez un âge en années, mois et jours." },
  "qr-code-generator": { name: "Générateur de code QR", shortDescription: "Créez un code QR pour une URL, du texte ou un réseau Wi-Fi." },
  "password-generator": { name: "Générateur de mot de passe", shortDescription: "Créez un mot de passe avec le générateur aléatoire sécurisé du navigateur." },
  "image-compressor": { name: "Compresseur d'images", shortDescription: "Ré-encodez un JPG, PNG ou WebP et comparez les tailles de fichier." },
  "image-resizer": { name: "Redimensionneur d'images", shortDescription: "Redimensionnez une image en conservant ou modifiant le rapport d'aspect." },
  "merge-pdf": { name: "Fusionner PDF", shortDescription: "Combinez des fichiers PDF dans le navigateur." },
  "split-pdf": { name: "Diviser PDF", shortDescription: "Extrayez des pages ou des plages d'un PDF." },
  "jpg-to-pdf": { name: "JPG en PDF", shortDescription: "Placez des images sur des pages PDF et téléchargez le fichier." },
  "rotate-pdf": { name: "Pivoter PDF", shortDescription: "Pivotez toutes les pages ou les pages sélectionnées de 90°, 180° ou 270°." },
  "organize-pdf": { name: "Organiser PDF", shortDescription: "Réorganisez ou supprimez des pages d'un PDF." },
  "crop-pdf": { name: "Rogner PDF", shortDescription: "Rognez les marges de toutes les pages ou des pages sélectionnées." },
  "add-page-numbers": { name: "Ajouter des numéros de page", shortDescription: "Imprimez des numéros de page sur chaque page d'un PDF." },
  "watermark-pdf": { name: "Filigrane PDF", shortDescription: "Imprimez du texte sur chaque page d'un PDF." },
  "unlock-pdf": { name: "Déverrouiller PDF", shortDescription: "Supprimez les restrictions de chiffrement d'un PDF." },
  "pdf-to-jpg": { name: "PDF en JPG", shortDescription: "Convertissez chaque page d'un PDF en image JPEG." },
  "compress-pdf": { name: "Compresser PDF", shortDescription: "Réduisez la taille d'un fichier PDF." },
  "edit-pdf": { name: "Modifier PDF", shortDescription: "Ajoutez des annotations textuelles aux pages PDF." },
  "pdf-forms": { name: "Formulaires PDF", shortDescription: "Remplissez les champs de formulaires PDF interactifs dans le navigateur." },
  "unit-converter": { name: "Convertisseur d'unités", shortDescription: "Convertissez longueur, masse, température, surface, volume et vitesse." },
  "date-calculator": { name: "Calculateur de dates", shortDescription: "Comptez les jours entre des dates ou ajoutez des jours." },
  "gst-calculator": { name: "Calculateur de GST", shortDescription: "Ajoutez ou supprimez un taux de GST que vous saisissez." },
  "emi-calculator": { name: "Calculateur d'EMI", shortDescription: "Estimez le paiement mensuel d'un prêt." },
  "base64": { name: "Encodeur Base64", shortDescription: "Encodez et décodez du texte UTF-8 en Base64." },
  "vat-calculator-uk": { name: "Calculateur de TVA du Royaume-Uni", shortDescription: "Ajoutez ou supprimez la TVA du Royaume-Uni à 20%, 5% réduit ou taux zéro." },
  "gst-calculator-australia": { name: "Calculateur GST d'Australie", shortDescription: "Ajoutez 10% de GST ou calculez le GST inversé avec la règle du onzième de l'ATO." },
  "slug-generator": { name: "Générateur de slug", shortDescription: "Générez des slugs compatibles URL à partir de texte, accents et scripts multilingues." },
  "text-compare": { name: "Comparateur de textes", shortDescription: "Comparez deux textes côte à côte pour mettre en évidence les ajouts et suppressions." },
  "france-tva-calculator": { name: "Calculateur de TVA France", shortDescription: "Calculez la TVA française aux taux officiels 20%, 10%, 5,5% et 2,1%." },
  "belgium-tva-calculator": { name: "Calculateur de TVA Belgique", shortDescription: "Calculez la TVA belge (BTW) aux taux officiels 21%, 12% et 6%." },
  "remove-duplicate-lines": { name: "Nettoyeur de texte", shortDescription: "Supprimez les lignes en double, coupez les espaces et triez le texte dans le navigateur." },
  "color-converter": { name: "Convertisseur de couleurs", shortDescription: "Convertissez les codes couleur entre HEX, RGB et HSL avec aperçu en direct." },
  "unix-timestamp-converter": { name: "Convertisseur d'horodatage Unix", shortDescription: "Convertissez les horodatages Unix epoch en chaînes UTC et heure locale." },
};

const de: ToolTranslationCatalog = {
  "word-counter": { name: "Wortzähler", shortDescription: "Zähle Wörter, Zeichen, Sätze, Absätze und geschätzte Lesezeit." },
  "percentage-calculator": { name: "Prozentrechner", shortDescription: "Berechne einen Prozentsatz, einen Anteil, eine Änderung oder einen richtungslosen Unterschied." },
  "discount-calculator": { name: "Rabattrechner", shortDescription: "Ziehe einen Prozent- oder Festbetrag ab, mit einem optionalen zweiten Rabatt." },
  "case-converter": { name: "Groß-/Kleinschreibung", shortDescription: "Konvertiere Text in Groß-, Kleinbuchstaben, Titel, Satz, camelCase, PascalCase, snake_case oder kebab-case." },
  "json-formatter": { name: "JSON-Formatierer", shortDescription: "Formatiere, minimiere und validiere JSON im Browser." },
  "character-counter": { name: "Zeichenzähler", shortDescription: "Zähle Zeichen mit einem optionalen Limit." },
  "age-calculator": { name: "Altersrechner", shortDescription: "Berechne das Alter in Jahren, Monaten und Tagen." },
  "qr-code-generator": { name: "QR-Code-Generator", shortDescription: "Erstelle einen QR-Code für eine URL, Text oder ein WLAN-Netzwerk." },
  "password-generator": { name: "Passwortgenerator", shortDescription: "Erstelle ein Passwort mit dem sicheren Zufallsgenerator des Browsers." },
  "image-compressor": { name: "Bildkompressor", shortDescription: "Kodiere ein JPG, PNG oder WebP neu und vergleiche die Dateigrößen." },
  "image-resizer": { name: "Bildgrößenänderung", shortDescription: "Ändere die Größe eines Bildes und behalte oder ändere das Seitenverhältnis." },
  "merge-pdf": { name: "PDF zusammenführen", shortDescription: "Kombiniere PDF-Dateien im Browser." },
  "split-pdf": { name: "PDF teilen", shortDescription: "Extrahiere Seiten oder Seitenbereiche aus einer PDF." },
  "jpg-to-pdf": { name: "JPG zu PDF", shortDescription: "Platziere Bilder auf PDF-Seiten und lade die Datei herunter." },
  "rotate-pdf": { name: "PDF drehen", shortDescription: "Drehe alle oder ausgewählte Seiten um 90°, 180° oder 270°." },
  "organize-pdf": { name: "PDF organisieren", shortDescription: "Ordne Seiten einer PDF neu an oder entferne sie." },
  "crop-pdf": { name: "PDF zuschneiden", shortDescription: "Schneide Seitenränder aller oder ausgewählter Seiten zu." },
  "add-page-numbers": { name: "Seitenzahlen hinzufügen", shortDescription: "Drucke Seitenzahlen auf jede Seite einer PDF." },
  "watermark-pdf": { name: "Wasserzeichen PDF", shortDescription: "Drucke Text auf jede Seite einer PDF." },
  "unlock-pdf": { name: "PDF entsperren", shortDescription: "Entferne Verschlüsselungsbeschränkungen aus einer PDF." },
  "pdf-to-jpg": { name: "PDF zu JPG", shortDescription: "Konvertiere jede PDF-Seite in ein JPEG-Bild." },
  "compress-pdf": { name: "PDF komprimieren", shortDescription: "Reduziere die Dateigröße einer PDF." },
  "edit-pdf": { name: "PDF bearbeiten", shortDescription: "Füge Textanmerkungen zu PDF-Seiten hinzu." },
  "pdf-forms": { name: "PDF-Formulare", shortDescription: "Fülle interaktive PDF-Formularfelder im Browser aus." },
  "unit-converter": { name: "Einheitenrechner", shortDescription: "Konvertiere Länge, Masse, Temperatur, Fläche, Volumen und Geschwindigkeit." },
  "date-calculator": { name: "Datumsrechner", shortDescription: "Zähle Tage zwischen Daten oder addiere Tage." },
  "gst-calculator": { name: "GST-Rechner", shortDescription: "Addiere oder entferne einen GST-Satz, den du eingibst." },
  "emi-calculator": { name: "EMI-Rechner", shortDescription: "Schätze die monatliche Kreditrate." },
  "base64": { name: "Base64-Encoder", shortDescription: "Kodiere und dekodiere UTF-8-Text als Base64." },
  "vat-calculator-uk": { name: "UK-Mehrwertsteuerrechner", shortDescription: "Addiere oder entferne die britische Mehrwertsteuer mit 20%, ermäßigtem 5% oder Nullsatz." },
  "gst-calculator-australia": { name: "Australien-GST-Rechner", shortDescription: "Addiere 10% GST oder berechne die umgekehrte GST mit der ATO-Ein-Elftel-Regel." },
  "slug-generator": { name: "Slug-Generator", shortDescription: "Generiere URL-freundliche Slugs aus Text, Akzenten und mehrsprachigen Schriften." },
  "text-compare": { name: "Text vergleichen", shortDescription: "Vergleiche zwei Texte nebeneinander, um Ergänzungen und Löschungen hervorzuheben." },
  "france-tva-calculator": { name: "Frankreich-TVA-Rechner", shortDescription: "Berechne die französische TVA zu den offiziellen Sätzen 20%, 10%, 5,5% und 2,1%." },
  "belgium-tva-calculator": { name: "Belgien-TVA-Rechner", shortDescription: "Berechne die belgische TVA (BTW) zu den offiziellen Sätzen 21%, 12% und 6%." },
  "remove-duplicate-lines": { name: "Textbereiniger", shortDescription: "Entferne doppelte Zeilen, schneide Leerzeichen ab und sortiere Text im Browser." },
  "color-converter": { name: "Farbkonverter", shortDescription: "Konvertiere Farbcodes zwischen HEX, RGB und HSL mit Live-Farbvorschau." },
  "unix-timestamp-converter": { name: "Unix-Zeitstempel-Konverter", shortDescription: "Konvertiere Unix-Epoch-Zeitstempel in UTC- und lokale Datums-/Zeitzeichenketten." },
};

const ptBR: ToolTranslationCatalog = {
  "word-counter": { name: "Contador de palavras", shortDescription: "Conte palavras, caracteres, frases, parágrafos e tempo estimado de leitura." },
  "percentage-calculator": { name: "Calculadora de porcentagem", shortDescription: "Calcule uma porcentagem, uma proporção, uma variação ou uma diferença sem direção." },
  "discount-calculator": { name: "Calculadora de descontos", shortDescription: "Aplique um desconto percentual ou fixo, com um segundo desconto opcional." },
  "case-converter": { name: "Conversor de maiúsculas", shortDescription: "Converta texto para maiúsculas, minúsculas, título, frase, camelCase, PascalCase, snake_case ou kebab-case." },
  "json-formatter": { name: "Formatador JSON", shortDescription: "Formate, minifique e valide JSON no navegador." },
  "character-counter": { name: "Contador de caracteres", shortDescription: "Conte caracteres com um limite opcional." },
  "age-calculator": { name: "Calculadora de idade", shortDescription: "Calcule a idade em anos, meses e dias." },
  "qr-code-generator": { name: "Gerador de código QR", shortDescription: "Crie um código QR para uma URL, texto ou rede Wi-Fi." },
  "password-generator": { name: "Gerador de senhas", shortDescription: "Crie uma senha com o gerador aleatório seguro do navegador." },
  "image-compressor": { name: "Compressor de imagens", shortDescription: "Recodifique um JPG, PNG ou WebP e compare tamanhos de arquivo." },
  "image-resizer": { name: "Redimensionador de imagens", shortDescription: "Redimensione uma imagem mantendo ou alterando a proporção." },
  "merge-pdf": { name: "Mesclar PDF", shortDescription: "Combine arquivos PDF no navegador." },
  "split-pdf": { name: "Dividir PDF", shortDescription: "Extraia páginas ou intervalos de um PDF." },
  "jpg-to-pdf": { name: "JPG para PDF", shortDescription: "Coloque imagens em páginas PDF e baixe o arquivo." },
  "rotate-pdf": { name: "Girar PDF", shortDescription: "Gire todas ou páginas selecionadas em 90°, 180° ou 270°." },
  "organize-pdf": { name: "Organizar PDF", shortDescription: "Reordene ou remova páginas de um PDF." },
  "crop-pdf": { name: "Cortar PDF", shortDescription: "Recorte as margens de todas ou páginas selecionadas." },
  "add-page-numbers": { name: "Adicionar números de página", shortDescription: "Imprima números de página em cada página de um PDF." },
  "watermark-pdf": { name: "Marca d'água PDF", shortDescription: "Imprima texto em cada página de um PDF." },
  "unlock-pdf": { name: "Desbloquear PDF", shortDescription: "Remova restrições de criptografia de um PDF." },
  "pdf-to-jpg": { name: "PDF para JPG", shortDescription: "Converta cada página de um PDF em imagem JPEG." },
  "compress-pdf": { name: "Comprimir PDF", shortDescription: "Reduza o tamanho de arquivo de um PDF." },
  "edit-pdf": { name: "Editar PDF", shortDescription: "Adicione anotações de texto a páginas PDF." },
  "pdf-forms": { name: "Formulários PDF", shortDescription: "Preencha campos de formulários PDF interativos no navegador." },
  "unit-converter": { name: "Conversor de unidades", shortDescription: "Converta comprimento, massa, temperatura, área, volume e velocidade." },
  "date-calculator": { name: "Calculadora de datas", shortDescription: "Conte dias entre datas ou adicione dias." },
  "gst-calculator": { name: "Calculadora de GST", shortDescription: "Adicione ou remova uma taxa de GST que você inserir." },
  "emi-calculator": { name: "Calculadora de EMI", shortDescription: "Estime o pagamento mensal de um empréstimo." },
  "base64": { name: "Codificador Base64", shortDescription: "Codifique e decodifique texto UTF-8 como Base64." },
  "vat-calculator-uk": { name: "Calculadora de IVA do Reino Unido", shortDescription: "Adicione ou remova o IVA do Reino Unido a 20%, 5% reduzido ou taxa zero." },
  "gst-calculator-australia": { name: "Calculadora GST da Austrália", shortDescription: "Adicione 10% de GST ou calcule o GST reverso usando a regra de um onze avos do ATO." },
  "slug-generator": { name: "Gerador de slug", shortDescription: "Gere slugs amigáveis para URLs a partir de texto, acentos e scripts multilíngues." },
  "text-compare": { name: "Comparador de textos", shortDescription: "Compare dois textos lado a lado para destacar adições e exclusões." },
  "france-tva-calculator": { name: "Calculadora de TVA da França", shortDescription: "Calcule o TVA francês nas taxas oficiais de 20%, 10%, 5,5% e 2,1%." },
  "belgium-tva-calculator": { name: "Calculadora de TVA da Bélgica", shortDescription: "Calcule o TVA belga (BTW) nas taxas oficiais de 21%, 12% e 6%." },
  "remove-duplicate-lines": { name: "Limpador de texto", shortDescription: "Remova linhas duplicadas, corte espaços e ordene texto no navegador." },
  "color-converter": { name: "Conversor de cores", shortDescription: "Converta códigos de cor entre HEX, RGB e HSL com pré-visualização ao vivo." },
  "unix-timestamp-converter": { name: "Conversor de timestamp Unix", shortDescription: "Converta timestamps Unix epoch para strings UTC e horário local." },
};

const ar: ToolTranslationCatalog = {
  "word-counter": { name: "عداد الكلمات", shortDescription: "عدّ الكلمات والأحرف والجمل والفقرات ووقت القراءة المقدّر." },
  "percentage-calculator": { name: "حاسبة النسبة المئوية", shortDescription: "احسب نسبة مئوية أو حصة أو تغيير أو فرق بدون اتجاه." },
  "discount-calculator": { name: "حاسبة الخصم", shortDescription: "طبّق خصمًا بالنسبة المئوية أو بمبلغ ثابت، مع خصم ثانٍ اختياري." },
  "case-converter": { name: "محوّل حالة الأحرف", shortDescription: "حوّل النص إلى أحرف كبيرة أو صغيرة أو عنوان أو جملة أو camelCase أو PascalCase أو snake_case أو kebab-case." },
  "json-formatter": { name: "منسّق JSON", shortDescription: "نسّق وصغّر وتحقق من صحة JSON في المتصفح." },
  "character-counter": { name: "عداد الأحرف", shortDescription: "عدّ الأحرف مع حد اختياري." },
  "age-calculator": { name: "حاسبة العمر", shortDescription: "اعرف العمر بالسنوات والأشهر والأيام." },
  "qr-code-generator": { name: "مولّد رمز QR", shortDescription: "أنشئ رمز QR لعنوان URL أو نص أو شبكة Wi-Fi." },
  "password-generator": { name: "مولّد كلمات المرور", shortDescription: "أنشئ كلمة مرور باستخدام المولّد العشوائي الآمن في المتصفح." },
  "image-compressor": { name: "ضاغط الصور", shortDescription: "أعد ترميز JPG أو PNG أو WebP وقارن أحجام الملفات." },
  "image-resizer": { name: "مغيّر حجم الصور", shortDescription: "غيّر حجم صورة مع الحفاظ على نسبة العرض للارتفاع أو تغييرها." },
  "merge-pdf": { name: "دمج PDF", shortDescription: "ادمج ملفات PDF في المتصفح." },
  "split-pdf": { name: "تقسيم PDF", shortDescription: "استخرج صفحات أو نطاقات من ملف PDF." },
  "jpg-to-pdf": { name: "JPG إلى PDF", shortDescription: "ضع صورًا على صفحات PDF وحمّل الملف." },
  "rotate-pdf": { name: "تدوير PDF", shortDescription: "دوّر جميع الصفحات أو صفحات محددة بمقدار 90° أو 180° أو 270°." },
  "organize-pdf": { name: "تنظيم PDF", shortDescription: "أعد ترتيب أو احذف صفحات من ملف PDF." },
  "crop-pdf": { name: "قص PDF", shortDescription: "قص هوامش الصفحات لجميع الصفحات أو صفحات محددة." },
  "add-page-numbers": { name: "إضافة أرقام الصفحات", shortDescription: "اطبع أرقام الصفحات على كل صفحة من ملف PDF." },
  "watermark-pdf": { name: "علامة مائية PDF", shortDescription: "اطبع نصًا على كل صفحة من ملف PDF." },
  "unlock-pdf": { name: "فتح قفل PDF", shortDescription: "أزل قيود التشفير من ملف PDF." },
  "pdf-to-jpg": { name: "PDF إلى JPG", shortDescription: "حوّل كل صفحة PDF إلى صورة JPEG." },
  "compress-pdf": { name: "ضغط PDF", shortDescription: "قلّل حجم ملف PDF." },
  "edit-pdf": { name: "تحرير PDF", shortDescription: "أضف تعليقات نصية إلى صفحات PDF." },
  "pdf-forms": { name: "نماذج PDF", shortDescription: "املأ حقول نماذج PDF التفاعلية في المتصفح." },
  "unit-converter": { name: "محوّل الوحدات", shortDescription: "حوّل الطول والكتلة والحرارة والمساحة والحجم والسرعة." },
  "date-calculator": { name: "حاسبة التاريخ", shortDescription: "احسب الأيام بين التواريخ أو أضف أيامًا." },
  "gst-calculator": { name: "حاسبة GST", shortDescription: "أضف أو أزل معدل GST تدخله." },
  "emi-calculator": { name: "حاسبة EMI", shortDescription: "قدّر القسط الشهري للقرض." },
  "base64": { name: "مشفّر Base64", shortDescription: "شفّر وفكّ تشفير نص UTF-8 كـ Base64." },
  "vat-calculator-uk": { name: "حاسبة ضريبة القيمة المضافة البريطانية", shortDescription: "أضف أو أزل ضريبة القيمة المضافة البريطانية بنسبة 20% أو 5% المخفضة أو نسبة صفر." },
  "gst-calculator-australia": { name: "حاسبة GST الأسترالية", shortDescription: "أضف 10% GST أو احسب GST العكسي باستخدام قاعدة واحد من أحد عشر من ATO." },
  "slug-generator": { name: "مولّد الروابط", shortDescription: "أنشئ روابط صديقة لعناوين URL من نص وتشكيل ونصوص متعددة اللغات." },
  "text-compare": { name: "مقارن النصوص", shortDescription: "قارن نصين جنبًا إلى جنب لتمييز الإضافات والحذف." },
  "france-tva-calculator": { name: "حاسبة TVA الفرنسية", shortDescription: "احسب TVA الفرنسي بالمعدلات الرسمية 20% و10% و5.5% و2.1%." },
  "belgium-tva-calculator": { name: "حاسبة TVA البلجيكية", shortDescription: "احسب TVA البلجيكي (BTW) بالمعدلات الرسمية 21% و12% و6%." },
  "remove-duplicate-lines": { name: "منظّف النصوص", shortDescription: "أزل الأسطر المكررة وقص المسافات ورتّب النص في المتصفح." },
  "color-converter": { name: "محوّل الألوان", shortDescription: "حوّل أكواد الألوان بين HEX وRGB وHSL مع معاينة حية." },
  "unix-timestamp-converter": { name: "محوّل طابع Unix الزمني", shortDescription: "حوّل طوابع Unix الزمنية إلى سلاسل UTC وتوقيت محلي." },
};

const ja: ToolTranslationCatalog = {
  "word-counter": { name: "文字数カウンター", shortDescription: "単語数、文字数、文数、段落数、推定読了時間をカウントします。" },
  "percentage-calculator": { name: "パーセント計算機", shortDescription: "パーセント、割合、変化率、方向なし差分を計算します。" },
  "discount-calculator": { name: "割引計算機", shortDescription: "パーセントまたは金額の割引を適用し、オプションで二重割引にも対応。" },
  "case-converter": { name: "大文字小文字変換", shortDescription: "テキストを大文字、小文字、タイトルケース、センテンスケース、camelCase、PascalCase、snake_case、kebab-caseに変換。" },
  "json-formatter": { name: "JSONフォーマッター", shortDescription: "ブラウザでJSONを整形、圧縮、検証します。" },
  "character-counter": { name: "文字数カウント", shortDescription: "オプションの制限付きで文字数をカウントします。" },
  "age-calculator": { name: "年齢計算機", shortDescription: "年、月、日で年齢を計算します。" },
  "qr-code-generator": { name: "QRコード生成", shortDescription: "URL、テキスト、Wi-FiネットワークのQRコードを作成します。" },
  "password-generator": { name: "パスワード生成", shortDescription: "ブラウザの安全な乱数生成器でパスワードを作成します。" },
  "image-compressor": { name: "画像圧縮", shortDescription: "JPG、PNG、WebPを再エンコードしてファイルサイズを比較します。" },
  "image-resizer": { name: "画像リサイズ", shortDescription: "アスペクト比を維持または変更して画像のサイズを変更します。" },
  "merge-pdf": { name: "PDF結合", shortDescription: "ブラウザでPDFファイルを結合します。" },
  "split-pdf": { name: "PDF分割", shortDescription: "PDFからページまたは範囲を抽出します。" },
  "jpg-to-pdf": { name: "JPGからPDF", shortDescription: "画像をPDFページに配置してファイルをダウンロードします。" },
  "rotate-pdf": { name: "PDF回転", shortDescription: "すべてまたは選択したページを90°、180°、270°回転します。" },
  "organize-pdf": { name: "PDF整理", shortDescription: "PDFのページを並べ替えまたは削除します。" },
  "crop-pdf": { name: "PDFトリミング", shortDescription: "すべてまたは選択したページの余白をトリミングします。" },
  "add-page-numbers": { name: "ページ番号追加", shortDescription: "PDFの各ページにページ番号を印刷します。" },
  "watermark-pdf": { name: "PDF透かし", shortDescription: "PDFの各ページにテキストを印刷します。" },
  "unlock-pdf": { name: "PDFロック解除", shortDescription: "PDFの暗号化制限を解除します。" },
  "pdf-to-jpg": { name: "PDFからJPG", shortDescription: "PDFの各ページをJPEG画像に変換します。" },
  "compress-pdf": { name: "PDF圧縮", shortDescription: "PDFのファイルサイズを削減します。" },
  "edit-pdf": { name: "PDF編集", shortDescription: "PDFページにテキスト注釈を追加します。" },
  "pdf-forms": { name: "PDFフォーム", shortDescription: "ブラウザでインタラクティブなPDFフォームフィールドを入力します。" },
  "unit-converter": { name: "単位変換", shortDescription: "長さ、質量、温度、面積、体積、速度を変換します。" },
  "date-calculator": { name: "日付計算機", shortDescription: "日付間の日数を数えるか日数を追加します。" },
  "gst-calculator": { name: "GST計算機", shortDescription: "入力したGST税率を追加または削除します。" },
  "emi-calculator": { name: "EMI計算機", shortDescription: "月々のローン支払いを見積もります。" },
  "base64": { name: "Base64エンコーダー", shortDescription: "UTF-8テキストをBase64としてエンコード・デコードします。" },
  "vat-calculator-uk": { name: "英国VAT計算機", shortDescription: "英国VATを標準20%、軽減5%、またはゼロ税率で追加・削除します。" },
  "gst-calculator-australia": { name: "オーストラリアGST計算機", shortDescription: "10%GSTを追加するか、ATOの11分の1ルールで逆算GST計算します。" },
  "slug-generator": { name: "スラグ生成", shortDescription: "テキスト、アクセント、多言語スクリプトからURL用スラグを生成します。" },
  "text-compare": { name: "テキスト比較", shortDescription: "2つのテキストを並べて比較し、追加と削除を強調表示します。" },
  "france-tva-calculator": { name: "フランスTVA計算機", shortDescription: "フランスTVAを公式税率20%、10%、5.5%、2.1%で計算します。" },
  "belgium-tva-calculator": { name: "ベルギーTVA計算機", shortDescription: "ベルギーTVA(BTW)を公式税率21%、12%、6%で計算します。" },
  "remove-duplicate-lines": { name: "テキストクリーナー", shortDescription: "重複行の削除、空白のトリミング、テキストの並べ替えをブラウザで行います。" },
  "color-converter": { name: "カラーコンバーター", shortDescription: "HEX、RGB、HSL間でカラーコードを変換し、ライブプレビューで確認します。" },
  "unix-timestamp-converter": { name: "Unixタイムスタンプ変換", shortDescription: "Unixエポックタイムスタンプをadriano UTCとローカル日時文字列に変換します。" },
};

const hi: ToolTranslationCatalog = {
  "word-counter": { name: "शब्द गणक", shortDescription: "शब्द, अक्षर, वाक्य, पैराग्राफ और अनुमानित पठन समय गिनें।" },
  "percentage-calculator": { name: "प्रतिशत कैलकुलेटर", shortDescription: "प्रतिशत, हिस्सा, परिवर्तन या दिशाहीन अंतर की गणना करें।" },
  "discount-calculator": { name: "छूट कैलकुलेटर", shortDescription: "प्रतिशत या राशि छूट लागू करें, एक वैकल्पिक दूसरी छूट के साथ।" },
  "case-converter": { name: "केस कन्वर्टर", shortDescription: "टेक्स्ट को अपरकेस, लोअरकेस, टाइटल, सेंटेंस, camelCase, PascalCase, snake_case या kebab-case में बदलें।" },
  "json-formatter": { name: "JSON फॉर्मेटर", shortDescription: "ब्राउज़र में JSON को फॉर्मेट, मिनिफाई और वैलिडेट करें।" },
  "character-counter": { name: "अक्षर गणक", shortDescription: "वैकल्पिक सीमा के साथ अक्षर गिनें।" },
  "age-calculator": { name: "आयु कैलकुलेटर", shortDescription: "वर्षों, महीनों और दिनों में आयु ज्ञात करें।" },
  "qr-code-generator": { name: "QR कोड जनरेटर", shortDescription: "URL, टेक्स्ट या Wi-Fi नेटवर्क के लिए QR कोड बनाएं।" },
  "password-generator": { name: "पासवर्ड जनरेटर", shortDescription: "ब्राउज़र के सुरक्षित रैंडम जनरेटर से पासवर्ड बनाएं।" },
  "image-compressor": { name: "इमेज कंप्रेसर", shortDescription: "JPG, PNG या WebP को री-एनकोड करें और फ़ाइल आकार की तुलना करें।" },
  "image-resizer": { name: "इमेज रीसाइज़र", shortDescription: "पक्षानुपात बनाए रखते या बदलते हुए इमेज का आकार बदलें।" },
  "merge-pdf": { name: "PDF मर्ज करें", shortDescription: "ब्राउज़र में PDF फ़ाइलें संयोजित करें।" },
  "split-pdf": { name: "PDF विभाजित करें", shortDescription: "PDF से पृष्ठ या श्रेणियाँ निकालें।" },
  "jpg-to-pdf": { name: "JPG से PDF", shortDescription: "छवियों को PDF पृष्ठों पर रखें और फ़ाइल डाउनलोड करें।" },
  "rotate-pdf": { name: "PDF घुमाएं", shortDescription: "सभी या चयनित पृष्ठों को 90°, 180° या 270° घुमाएं।" },
  "organize-pdf": { name: "PDF व्यवस्थित करें", shortDescription: "PDF के पृष्ठों को पुनर्क्रमित या हटाएं।" },
  "crop-pdf": { name: "PDF क्रॉप करें", shortDescription: "सभी या चयनित पृष्ठों के मार्जिन ट्रिम करें।" },
  "add-page-numbers": { name: "पृष्ठ संख्या जोड़ें", shortDescription: "PDF के प्रत्येक पृष्ठ पर पृष्ठ संख्या छापें।" },
  "watermark-pdf": { name: "वॉटरमार्क PDF", shortDescription: "PDF के प्रत्येक पृष्ठ पर टेक्स्ट छापें।" },
  "unlock-pdf": { name: "PDF अनलॉक करें", shortDescription: "PDF से एन्क्रिप्शन प्रतिबंध हटाएं।" },
  "pdf-to-jpg": { name: "PDF से JPG", shortDescription: "PDF के प्रत्येक पृष्ठ को JPEG इमेज में बदलें।" },
  "compress-pdf": { name: "PDF संपीड़ित करें", shortDescription: "PDF का फ़ाइल आकार कम करें।" },
  "edit-pdf": { name: "PDF संपादित करें", shortDescription: "PDF पृष्ठों पर टेक्स्ट एनोटेशन जोड़ें।" },
  "pdf-forms": { name: "PDF फ़ॉर्म", shortDescription: "ब्राउज़र में इंटरैक्टिव PDF फ़ॉर्म फ़ील्ड भरें।" },
  "unit-converter": { name: "इकाई कन्वर्टर", shortDescription: "लंबाई, द्रव्यमान, तापमान, क्षेत्रफल, आयतन और गति बदलें।" },
  "date-calculator": { name: "तारीख कैलकुलेटर", shortDescription: "तारीखों के बीच दिन गिनें या दिन जोड़ें।" },
  "gst-calculator": { name: "GST कैलकुलेटर", shortDescription: "आपके द्वारा दर्ज GST दर जोड़ें या हटाएं।" },
  "emi-calculator": { name: "EMI कैलकुलेटर", shortDescription: "मासिक ऋण भुगतान का अनुमान लगाएं।" },
  "base64": { name: "Base64 एनकोडर", shortDescription: "UTF-8 टेक्स्ट को Base64 के रूप में एनकोड और डिकोड करें।" },
  "vat-calculator-uk": { name: "UK VAT कैलकुलेटर", shortDescription: "UK VAT 20%, कम 5%, या शून्य दर पर जोड़ें या हटाएं।" },
  "gst-calculator-australia": { name: "ऑस्ट्रेलिया GST कैलकुलेटर", shortDescription: "10% GST जोड़ें या ATO के ग्यारहवें नियम से रिवर्स GST गणना करें।" },
  "slug-generator": { name: "स्लग जनरेटर", shortDescription: "टेक्स्ट, एक्सेंट और बहुभाषी स्क्रिप्ट से URL-फ्रेंडली स्लग बनाएं।" },
  "text-compare": { name: "टेक्स्ट तुलना", shortDescription: "दो टेक्स्ट की साइड-बाय-साइड तुलना करके जोड़ और हटाव हाइलाइट करें।" },
  "france-tva-calculator": { name: "फ़्रांस TVA कैलकुलेटर", shortDescription: "फ़्रांसीसी TVA को आधिकारिक दरों 20%, 10%, 5.5% और 2.1% पर गणना करें।" },
  "belgium-tva-calculator": { name: "बेल्जियम TVA कैलकुलेटर", shortDescription: "बेल्जियम TVA (BTW) को आधिकारिक दरों 21%, 12% और 6% पर गणना करें।" },
  "remove-duplicate-lines": { name: "टेक्स्ट क्लीनर", shortDescription: "ब्राउज़र में डुप्लिकेट लाइनें हटाएं, व्हाइटस्पेस ट्रिम करें और टेक्स्ट सॉर्ट करें।" },
  "color-converter": { name: "कलर कन्वर्टर", shortDescription: "HEX, RGB और HSL के बीच कलर कोड बदलें लाइव प्रीव्यू के साथ।" },
  "unix-timestamp-converter": { name: "Unix टाइमस्टैम्प कन्वर्टर", shortDescription: "Unix epoch टाइमस्टैम्प को UTC और स्थानीय दिनांक-समय स्ट्रिंग में बदलें।" },
};

const id_ID: ToolTranslationCatalog = {
  "word-counter": { name: "Penghitung kata", shortDescription: "Hitung kata, karakter, kalimat, paragraf, dan estimasi waktu baca." },
  "percentage-calculator": { name: "Kalkulator persentase", shortDescription: "Hitung persentase, bagian dari total, perubahan, atau selisih tanpa arah." },
  "discount-calculator": { name: "Kalkulator diskon", shortDescription: "Terapkan diskon persen atau jumlah, dengan diskon kedua opsional." },
  "case-converter": { name: "Pengubah huruf besar/kecil", shortDescription: "Ubah teks ke huruf besar, kecil, judul, kalimat, camelCase, PascalCase, snake_case, atau kebab-case." },
  "json-formatter": { name: "Pemformat JSON", shortDescription: "Format, perkecil, dan validasi JSON di browser." },
  "character-counter": { name: "Penghitung karakter", shortDescription: "Hitung karakter dengan batas opsional." },
  "age-calculator": { name: "Kalkulator usia", shortDescription: "Hitung usia dalam tahun, bulan, dan hari." },
  "qr-code-generator": { name: "Generator kode QR", shortDescription: "Buat kode QR untuk URL, teks, atau jaringan Wi-Fi." },
  "password-generator": { name: "Generator kata sandi", shortDescription: "Buat kata sandi dengan generator acak aman browser." },
  "image-compressor": { name: "Kompresor gambar", shortDescription: "Encode ulang JPG, PNG, atau WebP dan bandingkan ukuran file." },
  "image-resizer": { name: "Pengubah ukuran gambar", shortDescription: "Ubah ukuran gambar dengan mempertahankan atau mengubah rasio aspek." },
  "merge-pdf": { name: "Gabung PDF", shortDescription: "Gabungkan file PDF di browser." },
  "split-pdf": { name: "Pisahkan PDF", shortDescription: "Ekstrak halaman atau rentang dari PDF." },
  "jpg-to-pdf": { name: "JPG ke PDF", shortDescription: "Tempatkan gambar di halaman PDF dan unduh file." },
  "rotate-pdf": { name: "Putar PDF", shortDescription: "Putar semua atau halaman terpilih 90°, 180°, atau 270°." },
  "organize-pdf": { name: "Atur PDF", shortDescription: "Susun ulang atau hapus halaman dari PDF." },
  "crop-pdf": { name: "Potong PDF", shortDescription: "Pangkas margin halaman untuk semua atau halaman terpilih." },
  "add-page-numbers": { name: "Tambah nomor halaman", shortDescription: "Cetak nomor halaman di setiap halaman PDF." },
  "watermark-pdf": { name: "Watermark PDF", shortDescription: "Cetak teks di setiap halaman PDF." },
  "unlock-pdf": { name: "Buka kunci PDF", shortDescription: "Hapus pembatasan enkripsi dari PDF." },
  "pdf-to-jpg": { name: "PDF ke JPG", shortDescription: "Konversi setiap halaman PDF menjadi gambar JPEG." },
  "compress-pdf": { name: "Kompres PDF", shortDescription: "Kurangi ukuran file PDF." },
  "edit-pdf": { name: "Edit PDF", shortDescription: "Tambahkan anotasi teks ke halaman PDF." },
  "pdf-forms": { name: "Formulir PDF", shortDescription: "Isi kolom formulir PDF interaktif di browser." },
  "unit-converter": { name: "Konverter satuan", shortDescription: "Konversi panjang, massa, suhu, luas, volume, dan kecepatan." },
  "date-calculator": { name: "Kalkulator tanggal", shortDescription: "Hitung hari antar tanggal atau tambahkan hari." },
  "gst-calculator": { name: "Kalkulator GST", shortDescription: "Tambah atau hapus tarif GST yang Anda masukkan." },
  "emi-calculator": { name: "Kalkulator EMI", shortDescription: "Perkirakan pembayaran pinjaman bulanan." },
  "base64": { name: "Encoder Base64", shortDescription: "Encode dan decode teks UTF-8 sebagai Base64." },
  "vat-calculator-uk": { name: "Kalkulator PPN Inggris", shortDescription: "Tambah atau hapus PPN Inggris 20%, 5% dikurangi, atau tarif nol." },
  "gst-calculator-australia": { name: "Kalkulator GST Australia", shortDescription: "Tambah 10% GST atau hitung GST terbalik menggunakan aturan sepersebelas ATO." },
  "slug-generator": { name: "Generator slug", shortDescription: "Buat slug ramah URL dari teks, aksen, dan skrip multibahasa." },
  "text-compare": { name: "Pembanding teks", shortDescription: "Bandingkan dua teks berdampingan untuk menyoroti penambahan dan penghapusan." },
  "france-tva-calculator": { name: "Kalkulator TVA Prancis", shortDescription: "Hitung TVA Prancis pada tarif resmi 20%, 10%, 5,5%, dan 2,1%." },
  "belgium-tva-calculator": { name: "Kalkulator TVA Belgia", shortDescription: "Hitung TVA Belgia (BTW) pada tarif resmi 21%, 12%, dan 6%." },
  "remove-duplicate-lines": { name: "Pembersih teks", shortDescription: "Hapus baris duplikat, potong spasi, dan urutkan teks di browser." },
  "color-converter": { name: "Konverter warna", shortDescription: "Konversi kode warna antara HEX, RGB, dan HSL dengan pratinjau warna langsung." },
  "unix-timestamp-converter": { name: "Konverter timestamp Unix", shortDescription: "Konversi timestamp Unix epoch ke string UTC dan waktu lokal." },
};

const it: ToolTranslationCatalog = {
  "word-counter": { name: "Contatore di parole", shortDescription: "Conta parole, caratteri, frasi, paragrafi e tempo di lettura stimato." },
  "percentage-calculator": { name: "Calcolatrice di percentuale", shortDescription: "Calcola una percentuale, una quota, una variazione o una differenza senza direzione." },
  "discount-calculator": { name: "Calcolatrice di sconti", shortDescription: "Applica uno sconto percentuale o fisso, con un secondo sconto opzionale." },
  "case-converter": { name: "Convertitore di maiuscole/minuscole", shortDescription: "Converti il testo in maiuscolo, minuscolo, titolo, frase, camelCase, PascalCase, snake_case o kebab-case." },
  "json-formatter": { name: "Formattatore JSON", shortDescription: "Formatta, minimizza e valida JSON nel browser." },
  "character-counter": { name: "Contatore di caratteri", shortDescription: "Conta i caratteri con un limite opzionale." },
  "age-calculator": { name: "Calcolatrice dell'età", shortDescription: "Calcola l'età in anni, mesi e giorni." },
  "qr-code-generator": { name: "Generatore di codici QR", shortDescription: "Crea un codice QR per un URL, testo o una rete Wi-Fi." },
  "password-generator": { name: "Generatore di password", shortDescription: "Crea una password con il generatore casuale sicuro del browser." },
  "image-compressor": { name: "Compressore di immagini", shortDescription: "Ri-codifica un JPG, PNG o WebP e confronta le dimensioni dei file." },
  "image-resizer": { name: "Ridimensionatore di immagini", shortDescription: "Ridimensiona un'immagine mantenendo o modificando le proporzioni." },
  "merge-pdf": { name: "Unisci PDF", shortDescription: "Combina file PDF nel browser." },
  "split-pdf": { name: "Dividi PDF", shortDescription: "Estrai pagine o intervalli da un PDF." },
  "jpg-to-pdf": { name: "JPG in PDF", shortDescription: "Posiziona immagini su pagine PDF e scarica il file." },
  "rotate-pdf": { name: "Ruota PDF", shortDescription: "Ruota tutte o le pagine selezionate di 90°, 180° o 270°." },
  "organize-pdf": { name: "Organizza PDF", shortDescription: "Riordina o rimuovi pagine da un PDF." },
  "crop-pdf": { name: "Ritaglia PDF", shortDescription: "Ritaglia i margini di tutte o delle pagine selezionate." },
  "add-page-numbers": { name: "Aggiungi numeri di pagina", shortDescription: "Stampa numeri di pagina su ogni pagina di un PDF." },
  "watermark-pdf": { name: "Filigrana PDF", shortDescription: "Stampa testo su ogni pagina di un PDF." },
  "unlock-pdf": { name: "Sblocca PDF", shortDescription: "Rimuovi le restrizioni di crittografia da un PDF." },
  "pdf-to-jpg": { name: "PDF in JPG", shortDescription: "Converti ogni pagina PDF in un'immagine JPEG." },
  "compress-pdf": { name: "Comprimi PDF", shortDescription: "Riduci la dimensione del file PDF." },
  "edit-pdf": { name: "Modifica PDF", shortDescription: "Aggiungi annotazioni di testo alle pagine PDF." },
  "pdf-forms": { name: "Moduli PDF", shortDescription: "Compila i campi dei moduli PDF interattivi nel browser." },
  "unit-converter": { name: "Convertitore di unità", shortDescription: "Converti lunghezza, massa, temperatura, area, volume e velocità." },
  "date-calculator": { name: "Calcolatrice di date", shortDescription: "Conta i giorni tra date o aggiungi giorni." },
  "gst-calculator": { name: "Calcolatrice GST", shortDescription: "Aggiungi o rimuovi un'aliquota GST che inserisci." },
  "emi-calculator": { name: "Calcolatrice EMI", shortDescription: "Stima la rata mensile di un prestito." },
  "base64": { name: "Codificatore Base64", shortDescription: "Codifica e decodifica testo UTF-8 come Base64." },
  "vat-calculator-uk": { name: "Calcolatrice IVA UK", shortDescription: "Aggiungi o rimuovi l'IVA del Regno Unito al 20%, 5% ridotta o aliquota zero." },
  "gst-calculator-australia": { name: "Calcolatrice GST Australia", shortDescription: "Aggiungi il 10% di GST o calcola il GST inverso con la regola dell'undicesimo dell'ATO." },
  "slug-generator": { name: "Generatore di slug", shortDescription: "Genera slug compatibili con gli URL da testo, accenti e script multilingue." },
  "text-compare": { name: "Comparatore di testi", shortDescription: "Confronta due testi affiancati per evidenziare aggiunte e cancellazioni." },
  "france-tva-calculator": { name: "Calcolatrice TVA Francia", shortDescription: "Calcola la TVA francese alle aliquote ufficiali 20%, 10%, 5,5% e 2,1%." },
  "belgium-tva-calculator": { name: "Calcolatrice TVA Belgio", shortDescription: "Calcola la TVA belga (BTW) alle aliquote ufficiali 21%, 12% e 6%." },
  "remove-duplicate-lines": { name: "Pulitore di testo", shortDescription: "Rimuovi righe duplicate, taglia spazi e ordina il testo nel browser." },
  "color-converter": { name: "Convertitore di colori", shortDescription: "Converti codici colore tra HEX, RGB e HSL con anteprima dal vivo." },
  "unix-timestamp-converter": { name: "Convertitore timestamp Unix", shortDescription: "Converti i timestamp Unix epoch in stringhe UTC e ora locale." },
};

const toolCatalogs: Record<string, ToolTranslationCatalog> = {
  es,
  fr,
  de,
  "pt-BR": ptBR,
  ar,
  ja,
  hi,
  id: id_ID,
  it,
};

/**
 * Returns the translated tool name and description for a locale.
 * Falls back to the English values from the tool definition.
 */
export function getToolTranslation(localeCode: string, toolId: string, fallback: { name: string; shortDescription: string }): ToolTranslation {
  const catalog = toolCatalogs[localeCode];
  if (!catalog) return fallback;
  return catalog[toolId] ?? fallback;
}

/* ------------------------------------------------------------------ */
/*  UI message translations                                           */
/* ------------------------------------------------------------------ */

type UiMessages = Record<MessageKey, string>;

const uiEs: UiMessages = {
  skipToContent: "Saltar al contenido",
  home: "Inicio",
  privacy: "Privacidad",
  contact: "Contacto",
  toolsNav: "Herramientas",
  siteNav: "Sitio",
  footerNote: "Todas las herramientas se ejecutan en tu navegador. Nada sale de la página.",
  consent: "La medición opcional registra qué herramienta se usó. No registra el texto que escribes ni los números que calculas. No se envía nada hasta que se configure una dirección de análisis.",
  allowMeasurement: "Permitir medición",
  denyMeasurement: "No permitir",
  notFoundTitle: "Página no encontrada",
  notFoundBody: "Esa dirección no es una de las herramientas de este sitio.",
  notFoundLink: "Volver a las herramientas",
};

const uiFr: UiMessages = {
  skipToContent: "Aller au contenu",
  home: "Accueil",
  privacy: "Confidentialité",
  contact: "Contact",
  toolsNav: "Outils",
  siteNav: "Site",
  footerNote: "Tous les outils fonctionnent dans votre navigateur. Rien ne quitte la page.",
  consent: "La mesure optionnelle enregistre quel outil a été utilisé. Elle n'enregistre pas le texte que vous tapez ni les chiffres que vous calculez. Rien n'est envoyé tant qu'une adresse d'analyse n'est pas configurée.",
  allowMeasurement: "Autoriser la mesure",
  denyMeasurement: "Ne pas autoriser",
  notFoundTitle: "Page non trouvée",
  notFoundBody: "Cette adresse ne correspond à aucun outil de ce site.",
  notFoundLink: "Retour aux outils",
};

const uiDe: UiMessages = {
  skipToContent: "Zum Inhalt springen",
  home: "Startseite",
  privacy: "Datenschutz",
  contact: "Kontakt",
  toolsNav: "Werkzeuge",
  siteNav: "Seite",
  footerNote: "Alle Werkzeuge laufen in deinem Browser. Nichts verlässt die Seite.",
  consent: "Die optionale Messung erfasst, welches Werkzeug verwendet wurde. Sie erfasst nicht den Text, den du eingibst, oder die Zahlen, die du berechnest. Nichts wird gesendet, bis eine Analyseadresse konfiguriert ist.",
  allowMeasurement: "Messung erlauben",
  denyMeasurement: "Nicht erlauben",
  notFoundTitle: "Seite nicht gefunden",
  notFoundBody: "Diese Adresse gehört zu keinem Werkzeug auf dieser Website.",
  notFoundLink: "Zurück zu den Werkzeugen",
};

const uiPtBR: UiMessages = {
  skipToContent: "Pular para o conteúdo",
  home: "Início",
  privacy: "Privacidade",
  contact: "Contato",
  toolsNav: "Ferramentas",
  siteNav: "Site",
  footerNote: "Todas as ferramentas funcionam no seu navegador. Nada sai da página.",
  consent: "A medição opcional registra qual ferramenta foi usada. Não registra o texto que você digita nem os números que calcula. Nada é enviado até que um endereço de análise seja configurado.",
  allowMeasurement: "Permitir medição",
  denyMeasurement: "Não permitir",
  notFoundTitle: "Página não encontrada",
  notFoundBody: "Esse endereço não é uma das ferramentas deste site.",
  notFoundLink: "Voltar às ferramentas",
};

const uiAr: UiMessages = {
  skipToContent: "انتقل إلى المحتوى",
  home: "الرئيسية",
  privacy: "الخصوصية",
  contact: "اتصل بنا",
  toolsNav: "الأدوات",
  siteNav: "الموقع",
  footerNote: "جميع الأدوات تعمل في متصفحك. لا شيء يغادر الصفحة.",
  consent: "القياس الاختياري يسجّل أي أداة تم استخدامها. لا يسجّل النص الذي تكتبه أو الأرقام التي تحسبها. لا يتم إرسال أي شيء حتى يتم تكوين عنوان تحليلات.",
  allowMeasurement: "السماح بالقياس",
  denyMeasurement: "عدم السماح",
  notFoundTitle: "الصفحة غير موجودة",
  notFoundBody: "هذا العنوان ليس إحدى الأدوات في هذا الموقع.",
  notFoundLink: "العودة إلى الأدوات",
};

const uiJa: UiMessages = {
  skipToContent: "コンテンツへスキップ",
  home: "ホーム",
  privacy: "プライバシー",
  contact: "お問い合わせ",
  toolsNav: "ツール",
  siteNav: "サイト",
  footerNote: "すべてのツールはブラウザ内で動作します。データはページ外に送信されません。",
  consent: "オプションの測定は使用されたツールを記録します。入力したテキストや計算した数値は記録しません。分析アドレスが設定されるまで何も送信されません。",
  allowMeasurement: "測定を許可",
  denyMeasurement: "許可しない",
  notFoundTitle: "ページが見つかりません",
  notFoundBody: "このアドレスはこのサイトのツールではありません。",
  notFoundLink: "ツールに戻る",
};

const uiHi: UiMessages = {
  skipToContent: "सामग्री पर जाएं",
  home: "होम",
  privacy: "गोपनीयता",
  contact: "संपर्क",
  toolsNav: "उपकरण",
  siteNav: "साइट",
  footerNote: "सभी उपकरण आपके ब्राउज़र में चलते हैं। कुछ भी पेज से बाहर नहीं जाता।",
  consent: "वैकल्पिक मापन रिकॉर्ड करता है कि कौन सा उपकरण उपयोग किया गया। यह आपके टाइप किए गए टेक्स्ट या गणना किए गए नंबरों को रिकॉर्ड नहीं करता। एनालिटिक्स पता कॉन्फ़िगर होने तक कुछ भी नहीं भेजा जाता।",
  allowMeasurement: "मापन की अनुमति दें",
  denyMeasurement: "अनुमति न दें",
  notFoundTitle: "पेज नहीं मिला",
  notFoundBody: "यह पता इस साइट के किसी उपकरण का नहीं है।",
  notFoundLink: "उपकरणों पर वापस जाएं",
};

const uiId: UiMessages = {
  skipToContent: "Langsung ke konten",
  home: "Beranda",
  privacy: "Privasi",
  contact: "Kontak",
  toolsNav: "Alat",
  siteNav: "Situs",
  footerNote: "Semua alat berjalan di browser Anda. Tidak ada yang meninggalkan halaman.",
  consent: "Pengukuran opsional mencatat alat mana yang digunakan. Tidak mencatat teks yang Anda ketik atau angka yang Anda hitung. Tidak ada yang dikirim sampai alamat analitik dikonfigurasi.",
  allowMeasurement: "Izinkan pengukuran",
  denyMeasurement: "Jangan izinkan",
  notFoundTitle: "Halaman tidak ditemukan",
  notFoundBody: "Alamat itu bukan salah satu alat di situs ini.",
  notFoundLink: "Kembali ke alat",
};

const uiIt: UiMessages = {
  skipToContent: "Vai al contenuto",
  home: "Home",
  privacy: "Privacy",
  contact: "Contatti",
  toolsNav: "Strumenti",
  siteNav: "Sito",
  footerNote: "Tutti gli strumenti funzionano nel tuo browser. Nulla lascia la pagina.",
  consent: "La misurazione opzionale registra quale strumento è stato usato. Non registra il testo che scrivi né i numeri che calcoli. Nulla viene inviato finché non viene configurato un indirizzo di analisi.",
  allowMeasurement: "Consenti misurazione",
  denyMeasurement: "Non consentire",
  notFoundTitle: "Pagina non trovata",
  notFoundBody: "Questo indirizzo non corrisponde a nessuno strumento di questo sito.",
  notFoundLink: "Torna agli strumenti",
};

const uiCatalogs: Record<string, UiMessages> = {
  es: uiEs,
  fr: uiFr,
  de: uiDe,
  "pt-BR": uiPtBR,
  ar: uiAr,
  ja: uiJa,
  hi: uiHi,
  id: uiId,
  it: uiIt,
};

/**
 * Returns the UI messages for a locale. Falls back to English.
 */
export function getUiMessages(localeCode: string): UiMessages {
  if (localeCode === "en") {
    // Dynamic import would be cleaner, but we keep it sync for simplicity
    return {
      skipToContent: "Skip to content",
      home: "Home",
      privacy: "Privacy",
      contact: "Contact",
      toolsNav: "Tools",
      siteNav: "Site",
      footerNote: "Every tool runs in your browser. Nothing leaves the page.",
      consent: "Optional measurement records which tool was used. It does not record the text you type or the numbers you calculate. Nothing is sent until an analytics address is configured.",
      allowMeasurement: "Allow measurement",
      denyMeasurement: "Don't allow",
      notFoundTitle: "Page not found",
      notFoundBody: "That address is not one of the tools on this site.",
      notFoundLink: "Back to the tools",
    };
  }
  return uiCatalogs[localeCode] ?? getUiMessages("en");
}

/* ------------------------------------------------------------------ */
/*  Locale page headings                                              */
/* ------------------------------------------------------------------ */

export type PageHeadings = {
  heroTitle: string;
  heroSubtitle: string;
  popularTools: string;
  recentlyUsed: string;
  browseByCategory: string;
  allTools: string;
  searchPlaceholder: string;
};

const defaultHeadings: PageHeadings = {
  heroTitle: "Count, calculate, convert — right here.",
  heroSubtitle: "Free browser tools. No signup, no upload, no tracking.",
  popularTools: "Popular tools",
  recentlyUsed: "Recently used",
  browseByCategory: "Browse by category",
  allTools: "All tools",
  searchPlaceholder: "Search tools…",
};

const headingCatalogs: Record<string, PageHeadings> = {
  es: {
    heroTitle: "Cuenta, calcula, convierte — aquí mismo.",
    heroSubtitle: "Herramientas gratuitas en el navegador. Sin registro, sin carga, sin rastreo.",
    popularTools: "Herramientas populares",
    recentlyUsed: "Usadas recientemente",
    browseByCategory: "Explorar por categoría",
    allTools: "Todas las herramientas",
    searchPlaceholder: "Buscar herramientas…",
  },
  fr: {
    heroTitle: "Comptez, calculez, convertissez — ici même.",
    heroSubtitle: "Outils gratuits dans le navigateur. Sans inscription, sans téléchargement, sans suivi.",
    popularTools: "Outils populaires",
    recentlyUsed: "Utilisés récemment",
    browseByCategory: "Parcourir par catégorie",
    allTools: "Tous les outils",
    searchPlaceholder: "Rechercher des outils…",
  },
  de: {
    heroTitle: "Zählen, berechnen, konvertieren — direkt hier.",
    heroSubtitle: "Kostenlose Browser-Werkzeuge. Ohne Anmeldung, ohne Upload, ohne Tracking.",
    popularTools: "Beliebte Werkzeuge",
    recentlyUsed: "Kürzlich verwendet",
    browseByCategory: "Nach Kategorie durchsuchen",
    allTools: "Alle Werkzeuge",
    searchPlaceholder: "Werkzeuge suchen…",
  },
  "pt-BR": {
    heroTitle: "Conte, calcule, converta — bem aqui.",
    heroSubtitle: "Ferramentas gratuitas no navegador. Sem cadastro, sem upload, sem rastreamento.",
    popularTools: "Ferramentas populares",
    recentlyUsed: "Usadas recentemente",
    browseByCategory: "Navegar por categoria",
    allTools: "Todas as ferramentas",
    searchPlaceholder: "Buscar ferramentas…",
  },
  ar: {
    heroTitle: "عُدّ، احسب، حوّل — هنا مباشرة.",
    heroSubtitle: "أدوات مجانية في المتصفح. بدون تسجيل، بدون رفع، بدون تتبع.",
    popularTools: "الأدوات الشائعة",
    recentlyUsed: "المستخدمة مؤخرًا",
    browseByCategory: "تصفح حسب الفئة",
    allTools: "جميع الأدوات",
    searchPlaceholder: "ابحث عن أدوات…",
  },
  ja: {
    heroTitle: "数える、計算する、変換する — ここで。",
    heroSubtitle: "無料のブラウザツール。登録不要、アップロード不要、追跡なし。",
    popularTools: "人気のツール",
    recentlyUsed: "最近使用したツール",
    browseByCategory: "カテゴリで探す",
    allTools: "すべてのツール",
    searchPlaceholder: "ツールを検索…",
  },
  hi: {
    heroTitle: "गिनें, गणना करें, बदलें — यहीं पर।",
    heroSubtitle: "मुफ़्त ब्राउज़र उपकरण। कोई साइनअप नहीं, कोई अपलोड नहीं, कोई ट्रैकिंग नहीं।",
    popularTools: "लोकप्रिय उपकरण",
    recentlyUsed: "हाल ही में उपयोग किए गए",
    browseByCategory: "श्रेणी के अनुसार ब्राउज़ करें",
    allTools: "सभी उपकरण",
    searchPlaceholder: "उपकरण खोजें…",
  },
  id: {
    heroTitle: "Hitung, kalkulasi, konversi — di sini.",
    heroSubtitle: "Alat browser gratis. Tanpa daftar, tanpa unggah, tanpa pelacakan.",
    popularTools: "Alat populer",
    recentlyUsed: "Baru digunakan",
    browseByCategory: "Telusuri berdasarkan kategori",
    allTools: "Semua alat",
    searchPlaceholder: "Cari alat…",
  },
  it: {
    heroTitle: "Conta, calcola, converti — proprio qui.",
    heroSubtitle: "Strumenti gratuiti nel browser. Senza registrazione, senza caricamento, senza tracciamento.",
    popularTools: "Strumenti popolari",
    recentlyUsed: "Usati di recente",
    browseByCategory: "Esplora per categoria",
    allTools: "Tutti gli strumenti",
    searchPlaceholder: "Cerca strumenti…",
  },
};

export function getPageHeadings(localeCode: string): PageHeadings {
  return headingCatalogs[localeCode] ?? defaultHeadings;
}

/* ------------------------------------------------------------------ */
/*  Category name translations                                        */
/* ------------------------------------------------------------------ */

const defaultCategories: Record<string, string> = {
  text: "Text tools",
  calculator: "Calculators",
  developer: "Developer tools",
  image: "Image tools",
  pdf: "PDF tools",
};

const categoryCatalogs: Record<string, Record<string, string>> = {
  es: { text: "Herramientas de texto", calculator: "Calculadoras", developer: "Herramientas para desarrolladores", image: "Herramientas de imagen", pdf: "Herramientas PDF" },
  fr: { text: "Outils texte", calculator: "Calculateurs", developer: "Outils développeur", image: "Outils image", pdf: "Outils PDF" },
  de: { text: "Textwerkzeuge", calculator: "Rechner", developer: "Entwicklerwerkzeuge", image: "Bildwerkzeuge", pdf: "PDF-Werkzeuge" },
  "pt-BR": { text: "Ferramentas de texto", calculator: "Calculadoras", developer: "Ferramentas para desenvolvedores", image: "Ferramentas de imagem", pdf: "Ferramentas PDF" },
  ar: { text: "أدوات النص", calculator: "الآلات الحاسبة", developer: "أدوات المطورين", image: "أدوات الصور", pdf: "أدوات PDF" },
  ja: { text: "テキストツール", calculator: "計算機", developer: "開発者ツール", image: "画像ツール", pdf: "PDFツール" },
  hi: { text: "टेक्स्ट उपकरण", calculator: "कैलकुलेटर", developer: "डेवलपर उपकरण", image: "इमेज उपकरण", pdf: "PDF उपकरण" },
  id: { text: "Alat teks", calculator: "Kalkulator", developer: "Alat pengembang", image: "Alat gambar", pdf: "Alat PDF" },
  it: { text: "Strumenti testo", calculator: "Calcolatrici", developer: "Strumenti sviluppatore", image: "Strumenti immagine", pdf: "Strumenti PDF" },
};

export function getCategoryName(localeCode: string, categoryId: string): string {
  const catalog = categoryCatalogs[localeCode];
  return catalog?.[categoryId] ?? defaultCategories[categoryId] ?? categoryId;
}
