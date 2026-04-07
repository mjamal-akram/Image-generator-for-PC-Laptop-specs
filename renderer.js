const DEFAULT_LAYOUT_OFFSETS = {
  os: { x: 0, y: 0 },
  storage: { x: 0, y: 0 },
  guarantee: { x: 0, y: 0 },
  logo: { x: 0, y: 0 },
  device: { x: 0, y: 0 },
  tags: { x: 0, y: 0 },
  spec: { x: 0, y: 0 },
  brand: { x: 0, y: 0 },
  price: { x: 0, y: 0 },
  chargerCompatibility: { x: 0, y: 0 },
};

function cloneDefaultLayoutOffsets() {
  return Object.fromEntries(
    Object.entries(DEFAULT_LAYOUT_OFFSETS).map(([key, value]) => [key, { x: value.x, y: value.y }])
  );
}

function resetLayoutToDefault() {
  state.layoutOffsets = cloneDefaultLayoutOffsets();
}

const state = {
  generator: 'device',
  uiTheme: 'light',
  lang: 'en',
  theme: 'Modern',
  type: 'PC',
  os: 'Windows',
  ram: '8 GB',
  ramType: 'DDR4',
  keyboardBacklight: 'Yes',
  storageType: 'SSD',
  storageSize: '480 GB',
  titleTop: 'SSD',
  titleBottom: 'HARD DRIVE',
  brand: 'Dell',
  processor: 'Intel Core i5-3470 3.2 GHz',
  processorCore: 'i5',
  processorGeneration: '3rd Gen',
  processorNumber: '',
  processorSpeed: '2.2 GHz',
  screenSize: '16"',
  usbSpec: 'Yes',
  wifiSpec: 'Yes',
  batteryPercentage: '85',
  guaranteePeriod: '12 Months',
  chargerTitle: 'FAST CHARGER',
  chargerType: 'USB-C Charger',
  chargerPower: '65W',
  chargerVoltage: '20V',
  chargerAmpere: '3.25A',
  chargerCondition: 'New',
  chargerCompatibility: 'Dell Latitude 5490',
  price: '',
  currency: 'USD',
  showIntelBadge: true,
  showProcessorSpeedBadge: true,
  showScreenBadge: true,
  showBatteryBadge: true,
  showStorageBadge: true,
  showRamBadge: true,
  showGuaranteeBadge: true,
  showChargerTypeBadge: true,
  showChargerVoltageBadge: true,
  showChargerAmpereBadge: true,
  showChargerPowerBadge: true,
  showChargerConditionBadge: true,
  showChargerCompatibilityBadge: true,
  deviceImageDataUrl: '',
  chargerImageDataUrl: '',
  deviceImages: {
    PC: [],
    Laptop: [],
  },
  chargerImages: [],
  selectedDeviceImageId: {
    PC: null,
    Laptop: null,
  },
  selectedChargerImageId: null,
  logoImageDataUrl: '',
  logoSize: 56,
  logoBadgeSize: { w: 150, h: 150 },
  showLogoBadge: true,
  customThemeColors: {},
  customTexts: [],
  layoutOffsets: cloneDefaultLayoutOffsets(),
  sectionEnabled: {
    type: true,
    image: true,
    logo: true,
    charger: true,
    os: true,
    ram: true,
    keyboard: true,
    storage: true,
    brand: true,
    processor: true,
    battery: true,
    guarantee: true,
    price: true,
    badges: true,
  },
};

const i18n = {
  en: {
    appTitle: 'Jam_iw Softwares',
    generatePng: 'Generate PNG',
    generateJpg: 'Generate JPG',
    chooseRatio: 'Choose Aspect Ratio',
    ratioHelp: 'Select a ratio before generating the image.',
    cancel: 'Cancel',
    continue: 'Continue',
    sections: {
      generator: 'Generator',
      theme: 'Theme',
      colors: 'Colors',
      type: 'Device Type',
      image: 'Device Image',
      chargerImage: 'Charger Image',
      logo: 'Logo',
      os: 'Operating System',
      ram: 'RAM',
      keyboard: 'Keyboard Backlight',
      storage: 'Storage',
      brand: 'Brand Name',
      processor: 'Processor Details',
      battery: 'Battery',
      guarantee: 'Guarantee',
      price: 'Price',
      badges: 'Badge Visibility',
    },
    labels: {
      generatorDevice: 'PC/Laptop',
      generatorCharger: 'Charger',
      storageType: 'Drive Type',
      titleTop: 'Top Title Text',
      titleTopHint: 'Example: SSD',
      titleBottom: 'Bottom Title Text',
      titleBottomHint: 'Example: HARD DRIVE',
      storageTypeCustom: 'Custom Drive Type',
      storageTypeHint: 'Type custom value (example: NVMe)',
      storageSize: 'Capacity',
      storageCustom: 'Custom Capacity',
      storageHint: 'Type custom value (example: 750 GB)',
      brand: 'Brand',
      processor: 'Processor',
      processorCore: 'Core Type',
      processorGeneration: 'Generation',
      processorNumber: 'Processor Number',
      processorNumberHint: 'Example: 3470',
      processorSpeed: 'Processor Speed',
      processorSpeedHint: 'Example: 3.2 GHz',
      screenSize: 'Screen Size',
      usbSpec: 'USB (Specifications)',
      usbSpecHint: 'Example: Yes or USB 3.0',
      wifiSpec: 'Wi-Fi (Specifications)',
      wifiSpecHint: 'Example: Yes or Wi-Fi 6',
      ramType: 'RAM Type',
      keyboardBacklight: 'Keyboard Backlight',
      osCustom: 'Custom OS Name',
      osHint: 'Type custom value (example: Ubuntu)',
      batteryHealth: 'Battery Status',
      batteryPercentage: 'Battery Percentage',
      batteryPercentageHint: 'Example: 85',
      guaranteePeriod: 'Guarantee Period',
      guaranteePeriodHint: 'Example: 12 Months or 2 Years',
      price: 'Price',
      currency: 'Currency',
      priceHint: 'Typeable value (example: 450 USD)',
      uploadImage: 'Upload PC/Laptop Image',
      uploadChargerImage: 'Upload Charger Image',
      clearChargerImage: 'Remove Charger Image',
      chargerImageHint: 'Upload charger product image for charger generator.',
      clearImage: 'Remove Uploaded Image',
      removeSelectedImage: 'Remove Selected Image',
      clearAllImages: 'Remove All Images',
      imageLayerHint: 'Upload multiple images. Drag image to move, drag corner handle to resize.',
      uploadLogo: 'Upload Logo',
      clearLogo: 'Remove Logo',
      logoHint: 'After upload, drag the logo handle on preview to resize.',
      showIntelBadge: 'Processor Badge',
      showBatteryBadge: 'Battery Badge',
      showGuaranteeBadge: 'Guarantee Badge',
      showLogoBadge: 'Logo Badge',
      chargerTitle: 'Title Text',
      chargerTitleHint: 'Example: Fast Charger',
      chargerType: 'Charger Type',
      chargerTypeHint: 'Example: USB-C Charger',
      chargerPower: 'Charger Power',
      chargerPowerHint: 'Example: 65W',
      chargerVoltage: 'Charger Voltage',
      chargerVoltageHint: 'Example: 20V',
      chargerAmpere: 'Charger Ampere',
      chargerAmpereHint: 'Example: 3.25A',
      chargerCondition: 'Charger Condition',
      chargerConditionHint: 'Example: New',
      chargerCompatibility: 'Compatibility',
      chargerCompatibilityHint: 'One model per line (example: Dell Latitude 5490)',
    },
    statusReady: 'Ready to generate.',
    statusGenerating: 'Generating image...',
    statusCanceled: 'Export canceled.',
    statusSaved: (path) => `Image saved: ${path}`,
    ratioNames: {
      '1:1': 'Square (1:1)',
      '4:5': 'Portrait (4:5)',
      '16:9': 'Landscape (16:9)',
      '9:16': 'Story (9:16)',
    },
    memory: 'Memory',
    osCaption: 'Operating System',
    specTitle: 'Specifications',
    specGeneration: 'Generation',
    specHardDrive: 'Hard Drive',
    specKeyboard: 'Keyboard Backlight',
    specUsb: 'USB',
    specWifi: 'Wi-Fi',
    themeNames: {
      Modern: 'Modern',
      Minimal: 'Minimal',
      Bold: 'Bold',
    },
    currencyNames: {
      USD: 'Dollar ($)',
      EUR: 'Euro (€)',
    },
    batteryHealthValues: {
      Excellent: 'Excellent',
      Good: 'Good',
      Fair: 'Fair',
      Poor: 'Poor',
    },
    keyboardBacklightValues: {
      Yes: 'Yes',
      No: 'No',
    },
  },
  fr: {
    appTitle: 'Jam_iw Softwares',
    generatePng: 'Generer PNG',
    generateJpg: 'Generer JPG',
    chooseRatio: 'Choisir Le Format',
    ratioHelp: 'Selectionnez un ratio avant de generer limage.',
    cancel: 'Annuler',
    continue: 'Continuer',
    sections: {
      generator: 'Generateur',
      theme: 'Theme',
      colors: 'Couleurs',
      type: 'Type D Appareil',
      image: 'Image Appareil',
      chargerImage: 'Image Chargeur',
      logo: 'Logo',
      os: 'Systeme D Exploitation',
      ram: 'RAM',
      keyboard: 'Retroeclairage Clavier',
      storage: 'Stockage',
      brand: 'Marque',
      processor: 'Details Processeur',
      battery: 'Batterie',
      guarantee: 'Garantie',
      price: 'Prix',
      badges: 'Visibilite Des Badges',
    },
    labels: {
      generatorDevice: 'PC/Portable',
      generatorCharger: 'Chargeur',
      storageType: 'Type De Disque',
      titleTop: 'Texte Titre Haut',
      titleTopHint: 'Exemple: SSD',
      titleBottom: 'Texte Titre Bas',
      titleBottomHint: 'Exemple: DISQUE DUR',
      storageTypeCustom: 'Type De Disque Personnalise',
      storageTypeHint: 'Saisir une valeur (exemple: NVMe)',
      storageSize: 'Capacite',
      storageCustom: 'Capacite Personnalisee',
      storageHint: 'Saisir une valeur (exemple: 750 GB)',
      brand: 'Marque',
      processor: 'Processeur',
      processorCore: 'Type De Core',
      processorGeneration: 'Generation',
      processorNumber: 'Numero Processeur',
      processorNumberHint: 'Exemple: 3470',
      processorSpeed: 'Vitesse Processeur',
      processorSpeedHint: 'Exemple: 3.2 GHz',
      screenSize: 'Taille Ecran',
      usbSpec: 'USB (Caracteristiques)',
      usbSpecHint: 'Exemple: Oui ou USB 3.0',
      wifiSpec: 'Wi-Fi (Caracteristiques)',
      wifiSpecHint: 'Exemple: Oui ou Wi-Fi 6',
      ramType: 'Type RAM',
      keyboardBacklight: 'Retroeclairage Clavier',
      osCustom: 'Nom OS Personnalise',
      osHint: 'Saisir une valeur (exemple: Ubuntu)',
      batteryHealth: 'Etat Batterie',
      batteryPercentage: 'Pourcentage Batterie',
      batteryPercentageHint: 'Exemple: 85',
      guaranteePeriod: 'Periode Garantie',
      guaranteePeriodHint: 'Exemple: 12 Mois ou 2 Ans',
      price: 'Prix',
      currency: 'Devise',
      priceHint: 'Valeur a saisir (exemple: 450 EUR)',
      uploadImage: 'Telecharger Image PC/Portable',
      uploadChargerImage: 'Telecharger Image Chargeur',
      clearChargerImage: 'Supprimer Image Chargeur',
      chargerImageHint: 'Telechargez limage du chargeur pour le generateur chargeur.',
      clearImage: 'Supprimer Image',
      removeSelectedImage: 'Supprimer Image Selectionnee',
      clearAllImages: 'Supprimer Toutes Les Images',
      imageLayerHint: 'Telechargez plusieurs images. Glissez pour deplacer, glissez le coin pour redimensionner.',
      uploadLogo: 'Telecharger Logo',
      clearLogo: 'Supprimer Logo',
      logoHint: 'Apres upload, faites glisser la poignee du logo pour redimensionner.',
      showIntelBadge: 'Badge Processeur',
      showBatteryBadge: 'Badge Batterie',
      showGuaranteeBadge: 'Badge Garantie',
      showLogoBadge: 'Badge Logo',
      chargerTitle: 'Texte Titre',
      chargerTitleHint: 'Exemple: Chargeur Rapide',
      chargerType: 'Type De Chargeur',
      chargerTypeHint: 'Exemple: Chargeur USB-C',
      chargerPower: 'Puissance Chargeur',
      chargerPowerHint: 'Exemple: 65W',
      chargerVoltage: 'Tension Chargeur',
      chargerVoltageHint: 'Exemple: 20V',
      chargerAmpere: 'Amperage Chargeur',
      chargerAmpereHint: 'Exemple: 3.25A',
      chargerCondition: 'Etat Du Chargeur',
      chargerConditionHint: 'Exemple: Neuf',
      chargerCompatibility: 'Compatibilite',
      chargerCompatibilityHint: 'Un modele par ligne (exemple: Dell Latitude 5490)',
    },
    statusReady: 'Pret pour la generation.',
    statusGenerating: 'Generation de limage...',
    statusCanceled: 'Export annule.',
    statusSaved: (path) => `Image enregistree: ${path}`,
    ratioNames: {
      '1:1': 'Carre (1:1)',
      '4:5': 'Portrait (4:5)',
      '16:9': 'Paysage (16:9)',
      '9:16': 'Story (9:16)',
    },
    memory: 'Memoire',
    osCaption: 'Systeme D Exploitation',
    specTitle: 'Caracteristiques',
    specGeneration: 'Generation',
    specHardDrive: 'Disque Dur',
    specKeyboard: 'Retroeclairage Clavier',
    specUsb: 'USB',
    specWifi: 'Wi-Fi',
    themeNames: {
      Modern: 'Moderne',
      Minimal: 'Minimal',
      Bold: 'Audacieux',
    },
    currencyNames: {
      USD: 'Dollar ($)',
      EUR: 'Euro (€)',
    },
    batteryHealthValues: {
      Excellent: 'Excellente',
      Good: 'Bonne',
      Fair: 'Moyenne',
      Poor: 'Faible',
    },
    keyboardBacklightValues: {
      Yes: 'Oui',
      No: 'Non',
    },
  },
};

const options = {
  theme: ['Modern', 'Minimal', 'Bold'],
  type: ['PC', 'Laptop'],
  os: ['Windows', 'Mac'],
  ram: ['2 GB', '4 GB', '8 GB', '12 GB', '16 GB', '32 GB'],
  ramType: ['DDR3', 'DDR4', 'DDR5'],
  keyboardBacklight: ['Yes', 'No'],
  storageType: ['SSD', 'HDD', 'M.2'],
  storageSize: ['128 GB', '256 GB', '480 GB', '512 GB', '1 TB', '2 TB'],
  brand: ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Apple'],
  processor: [
    'Intel Core i3-10100 3.6 GHz',
    'Intel Core i5-3470 3.2 GHz',
    'Intel Core i7-10700 2.9 GHz',
    'AMD Ryzen 5 5600G 3.9 GHz',
    'AMD Ryzen 7 5800X 3.8 GHz',
    'Apple M1 3.2 GHz',
  ],
  batteryHealth: ['Excellent', 'Good', 'Fair', 'Poor'],
};

const themePalettes = {
  Modern: {
    frameTop: '#161f30',
    frameBottom: '#070d17',
    cardBg: '#ffffff',
    cardStroke: '#dbe3ef',
    filename: '#e5edf7',
    osCard: '#28c3dd',
    osCardText: '#f3feff',
    title: '#121c2d',
    subtitle: '#1a2435',
    bodyDark: '#2e3746',
    bodyMid: '#4a556b',
    bodyLight: '#a8b2c2',
    screenOuter: '#3a4658',
    screenInner: '#0d1626',
    screenGradA: '#1550a2',
    screenGradB: '#6630a8',
    screenGradC: '#2ad4e4',
    standA: '#687488',
    standB: '#55627a',
    base: '#1d2433',
    mouse: '#222b3f',
    tag1: '#0d7abd',
    tag2: '#327fe5',
    tag3: '#101010',
    tag4: '#8a2fe0',
    tag5: '#efc73e',
    tag5Text: '#182336',
    burst: '#12cae2',
    burstText: '#f8ffff',
    batteryBadge: '#27ae60',
    logoBadge: '#3a82df',
    brand: '#1f293b',
    priceBox: '#08142f',
    priceText: '#ffffff',
    specOuter: '#ffffff',
    specInnerA: '#0d204b',
    specInnerB: '#132f6f',
    specLabel: '#9bb3db',
    specValue: '#ffffff',
    specDivider: 'rgba(255,255,255,0.16)',
  },
  Minimal: {
    frameTop: '#dfe4ea',
    frameBottom: '#cfd6df',
    cardBg: '#fbfcfe',
    cardStroke: '#c8d1dc',
    filename: '#6f7a88',
    osCard: '#7f93ab',
    osCardText: '#ffffff',
    title: '#2f3b4c',
    subtitle: '#5d6979',
    bodyDark: '#5d6676',
    bodyMid: '#798396',
    bodyLight: '#c2c9d4',
    screenOuter: '#738094',
    screenInner: '#273245',
    screenGradA: '#5c697f',
    screenGradB: '#7a8699',
    screenGradC: '#9ba8ba',
    standA: '#8895a8',
    standB: '#6f7d92',
    base: '#3e4959',
    mouse: '#4a5669',
    tag1: '#5f738f',
    tag2: '#6f87a6',
    tag3: '#2d3440',
    tag4: '#6e7f95',
    tag5: '#bac2cf',
    tag5Text: '#293444',
    burst: '#8fa2ba',
    burstText: '#ffffff',
    batteryBadge: '#27ae60',
    logoBadge: '#7f93ab',
    brand: '#2b3647',
    priceBox: '#445166',
    priceText: '#ffffff',
    specOuter: '#edf1f6',
    specInnerA: '#43536a',
    specInnerB: '#5b6d87',
    specLabel: '#d4deeb',
    specValue: '#ffffff',
    specDivider: 'rgba(255,255,255,0.18)',
  },
  Bold: {
    frameTop: '#260c0f',
    frameBottom: '#09060f',
    cardBg: '#fffaf7',
    cardStroke: '#f0d7ca',
    filename: '#ffe6dd',
    osCard: '#ff5c44',
    osCardText: '#fff6f2',
    title: '#201217',
    subtitle: '#4a1a16',
    bodyDark: '#262b38',
    bodyMid: '#374057',
    bodyLight: '#b4bece',
    screenOuter: '#2e3446',
    screenInner: '#10182a',
    screenGradA: '#ff5d3a',
    screenGradB: '#db2b76',
    screenGradC: '#ffb339',
    standA: '#6b7488',
    standB: '#525d73',
    base: '#1f2535',
    mouse: '#2a3043',
    tag1: '#ff5b37',
    tag2: '#d24eff',
    tag3: '#17151b',
    tag4: '#ff8a00',
    tag5: '#ffe14a',
    tag5Text: '#332900',
    burst: '#ff3645',
    burstText: '#fff2f2',
    batteryBadge: '#27ae60',
    logoBadge: '#ff5c44',
    brand: '#3a2025',
    priceBox: '#2d0d16',
    priceText: '#fff2f2',
    specOuter: '#fff1ea',
    specInnerA: '#3a0f24',
    specInnerB: '#5a1834',
    specLabel: '#f8c8d6',
    specValue: '#fff8fb',
    specDivider: 'rgba(255,255,255,0.2)',
  },
};

const canvas = document.getElementById('posterCanvas');
const ctx = canvas.getContext('2d');
const controlsPanel = document.getElementById('controlsPanel');
const statusText = document.getElementById('statusText');
let logoImageObj = null;
let chargerImageObj = null;
let isGenerating = false;
let statusAnimTimer = null;
let logoResizeHandleRect = null;
let logoBadgeResizeHandleRect = null;
let logoBadgeBodyRect = null;
let logoImageBodyRect = null;
let isLogoSelected = false;
let isResizingLogo = false;
let logoResizeStart = null;
let isResizingLogoBadge = false;
let logoBadgeResizeStart = null;
let draggableRegions = [];
let removableElements = [];
let removeButtonRects = [];
let selectAllElementsMode = false;
const MAX_UNDO_STEPS = 40;
let undoStack = [];
let activeDrag = null;
let deviceImageHandles = [];
let isResizingDeviceImage = false;
let resizingDeviceImageId = null;
let deviceResizeStart = null;
let isDraggingDeviceImage = false;
let draggingDeviceImageId = null;
let deviceDragStart = null;
let deviceImageIdCounter = 1;
let isTextInsertMode = false;
let activeTextId = null;
let textIdCounter = 1;
let textCaretVisible = true;
let textCaretTimer = null;
let textEditorRoot = null;
let textEditorInput = null;
let textEditorBoldBtn = null;
let textEditorItalicBtn = null;
let textEditorUnderlineBtn = null;
let textEditorApplyBtn = null;
let textEditorCancelBtn = null;
let isDraggingText = false;
let draggingTextId = null;
let textDragStart = null;

function t() {
  return i18n[state.lang];
}

function getLayoutOffset(key) {
  const current = state.layoutOffsets?.[key];
  if (current && Number.isFinite(current.x) && Number.isFinite(current.y)) {
    return current;
  }
  return { x: 0, y: 0 };
}

function setLayoutOffset(key, x, y) {
  state.layoutOffsets[key] = { x, y };
}

function registerDraggableRegion(key, x, y, w, h) {
  draggableRegions.push({ key, x, y, w, h });
}

function registerRemovableElement(x, y, w, h, onRemove) {
  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(w) || !Number.isFinite(h)) {
    return;
  }
  if (w <= 0 || h <= 0 || typeof onRemove !== 'function') {
    return;
  }
  removableElements.push({ x, y, w, h, onRemove });
}

function snapshotForUndo() {
  const snapshotDeviceImages = {};
  Object.entries(state.deviceImages || {}).forEach(([key, layers]) => {
    snapshotDeviceImages[key] = Array.isArray(layers)
      ? layers.map((layer) => ({
        id: layer.id,
        dataUrl: layer.dataUrl,
        x: layer.x,
        y: layer.y,
        w: layer.w,
        h: layer.h,
      }))
      : [];
  });
  const snapshotChargerImages = Array.isArray(state.chargerImages)
    ? state.chargerImages.map((layer) => ({
      id: layer.id,
      dataUrl: layer.dataUrl,
      x: layer.x,
      y: layer.y,
      w: layer.w,
      h: layer.h,
    }))
    : [];
  const snapshotCustomTexts = Array.isArray(state.customTexts)
    ? state.customTexts.map((item) => ({
      id: item.id,
      x: item.x,
      y: item.y,
      text: item.text,
      size: item.size,
      color: item.color,
      bold: !!item.bold,
      italic: !!item.italic,
      underline: !!item.underline,
      family: item.family || 'Segoe UI',
    }))
    : [];

  return {
    sectionEnabled: JSON.parse(JSON.stringify(state.sectionEnabled || {})),
    layoutOffsets: JSON.parse(JSON.stringify(state.layoutOffsets || {})),
    showLogoBadge: !!state.showLogoBadge,
    showIntelBadge: !!state.showIntelBadge,
    showProcessorSpeedBadge: !!state.showProcessorSpeedBadge,
    showScreenBadge: !!state.showScreenBadge,
    showBatteryBadge: !!state.showBatteryBadge,
    showStorageBadge: !!state.showStorageBadge,
    showRamBadge: !!state.showRamBadge,
    showGuaranteeBadge: !!state.showGuaranteeBadge,
    showChargerTypeBadge: !!state.showChargerTypeBadge,
    showChargerVoltageBadge: !!state.showChargerVoltageBadge,
    showChargerAmpereBadge: !!state.showChargerAmpereBadge,
    showChargerPowerBadge: !!state.showChargerPowerBadge,
    showChargerConditionBadge: !!state.showChargerConditionBadge,
    showChargerCompatibilityBadge: !!state.showChargerCompatibilityBadge,
    brand: state.brand,
    deviceImages: snapshotDeviceImages,
    selectedDeviceImageId: JSON.parse(JSON.stringify(state.selectedDeviceImageId || {})),
    chargerImages: snapshotChargerImages,
    selectedChargerImageId: state.selectedChargerImageId,
    customTexts: snapshotCustomTexts,
    chargerTitle: state.chargerTitle,
    chargerImageDataUrl: state.chargerImageDataUrl,
    logoImageDataUrl: state.logoImageDataUrl,
  };
}

function pushUndoSnapshot() {
  undoStack.push(snapshotForUndo());
  if (undoStack.length > MAX_UNDO_STEPS) {
    undoStack = undoStack.slice(undoStack.length - MAX_UNDO_STEPS);
  }
}

function restoreFromUndoSnapshot(snapshot) {
  if (!snapshot) {
    return;
  }
  state.sectionEnabled = JSON.parse(JSON.stringify(snapshot.sectionEnabled || state.sectionEnabled));
  state.layoutOffsets = JSON.parse(JSON.stringify(snapshot.layoutOffsets || state.layoutOffsets));
  state.showLogoBadge = !!snapshot.showLogoBadge;
  state.showIntelBadge = !!snapshot.showIntelBadge;
  state.showProcessorSpeedBadge = !!snapshot.showProcessorSpeedBadge;
  state.showScreenBadge = !!snapshot.showScreenBadge;
  state.showBatteryBadge = !!snapshot.showBatteryBadge;
  state.showStorageBadge = !!snapshot.showStorageBadge;
  state.showRamBadge = !!snapshot.showRamBadge;
  state.showGuaranteeBadge = !!snapshot.showGuaranteeBadge;
  state.showChargerTypeBadge = !!snapshot.showChargerTypeBadge;
  state.showChargerVoltageBadge = !!snapshot.showChargerVoltageBadge;
  state.showChargerAmpereBadge = !!snapshot.showChargerAmpereBadge;
  state.showChargerPowerBadge = !!snapshot.showChargerPowerBadge;
  state.showChargerConditionBadge = !!snapshot.showChargerConditionBadge;
  state.showChargerCompatibilityBadge = !!snapshot.showChargerCompatibilityBadge;
  state.brand = snapshot.brand ?? state.brand;
  state.chargerTitle = snapshot.chargerTitle ?? state.chargerTitle;

  const hydrateLayer = (layer) => {
    const imageObj = new Image();
    imageObj.src = layer.dataUrl;
    return {
      id: layer.id,
      dataUrl: layer.dataUrl,
      imageObj,
      x: layer.x,
      y: layer.y,
      w: layer.w,
      h: layer.h,
    };
  };

  if (snapshot.deviceImages && typeof snapshot.deviceImages === 'object') {
    const restoredDeviceImages = {};
    Object.entries(snapshot.deviceImages).forEach(([key, layers]) => {
      restoredDeviceImages[key] = Array.isArray(layers) ? layers.map(hydrateLayer) : [];
    });
    state.deviceImages = restoredDeviceImages;
  }
  if (snapshot.selectedDeviceImageId && typeof snapshot.selectedDeviceImageId === 'object') {
    state.selectedDeviceImageId = JSON.parse(JSON.stringify(snapshot.selectedDeviceImageId));
  }

  if (Array.isArray(snapshot.chargerImages)) {
    state.chargerImages = snapshot.chargerImages.map(hydrateLayer);
    state.selectedChargerImageId = snapshot.selectedChargerImageId || null;
  } else {
    state.chargerImages = [];
    state.selectedChargerImageId = null;
  }
  state.customTexts = Array.isArray(snapshot.customTexts)
    ? snapshot.customTexts.map((item) => ({ ...item }))
    : [];

  state.chargerImageDataUrl = snapshot.chargerImageDataUrl ?? '';
  if (state.chargerImageDataUrl) {
    chargerImageObj = new Image();
    chargerImageObj.src = state.chargerImageDataUrl;
  } else if (state.chargerImages.length > 0) {
    chargerImageObj = state.chargerImages[state.chargerImages.length - 1].imageObj || null;
  } else {
    chargerImageObj = null;
  }

  state.logoImageDataUrl = snapshot.logoImageDataUrl ?? '';
  if (state.logoImageDataUrl) {
    logoImageObj = new Image();
    logoImageObj.src = state.logoImageDataUrl;
  } else {
    logoImageObj = null;
  }
}

function drawSelectAllOverlay() {
  removeButtonRects = [];
  if (!selectAllElementsMode) {
    return;
  }
  removableElements.forEach((item) => {
    ctx.save();
    ctx.strokeStyle = '#0a84ff';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(item.x, item.y, item.w, item.h);
    ctx.restore();

    const size = 16;
    const bx = item.x + item.w - (size / 2);
    const by = item.y - (size / 2);
    drawRoundedRect(bx, by, size, size, 4, '#e53935');
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + 4, by + 4);
    ctx.lineTo(bx + size - 4, by + size - 4);
    ctx.moveTo(bx + size - 4, by + 4);
    ctx.lineTo(bx + 4, by + size - 4);
    ctx.stroke();
    ctx.restore();

    removeButtonRects.push({
      x: bx - 4,
      y: by - 4,
      w: size + 8,
      h: size + 8,
      onRemove: item.onRemove,
    });
  });
}

function getCurrentDeviceImages() {
  return state.deviceImages[state.type] || [];
}

function getSelectedDeviceImageId() {
  return state.selectedDeviceImageId[state.type] || null;
}

function setSelectedDeviceImageId(id) {
  state.selectedDeviceImageId[state.type] = id;
}

function isTypingInFormField() {
  const el = document.activeElement;
  if (!el) {
    return false;
  }
  const tag = String(el.tagName || '').toUpperCase();
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

function getActiveTextLayer() {
  return state.customTexts.find((item) => item.id === activeTextId) || null;
}

function getTextLayerById(id) {
  return state.customTexts.find((item) => item.id === id) || null;
}

function ensureTextEditorUI() {
  if (textEditorRoot) {
    return;
  }
  const panel = document.querySelector('.preview-panel');
  if (!panel) {
    return;
  }
  panel.style.position = 'relative';

  const root = document.createElement('div');
  root.style.position = 'absolute';
  root.style.display = 'none';
  root.style.alignItems = 'center';
  root.style.gap = '6px';
  root.style.padding = '6px';
  root.style.background = 'rgba(255,255,255,0.98)';
  root.style.border = '1px solid #cfd8e5';
  root.style.borderRadius = '8px';
  root.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
  root.style.zIndex = '25';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Type text';
  input.style.width = '220px';
  input.style.padding = '6px 8px';
  input.style.border = '1px solid #cad4e2';
  input.style.borderRadius = '6px';

  const mkBtn = (label) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.style.minWidth = '32px';
    btn.style.padding = '5px 8px';
    btn.style.border = '1px solid #cfd8e5';
    btn.style.background = '#fff';
    btn.style.borderRadius = '6px';
    btn.style.fontWeight = '700';
    return btn;
  };
  const bBtn = mkBtn('B');
  const iBtn = mkBtn('I');
  iBtn.style.fontStyle = 'italic';
  const uBtn = mkBtn('U');
  uBtn.style.textDecoration = 'underline';
  const applyBtn = mkBtn('✓');
  applyBtn.style.color = '#0b8a3b';
  const cancelBtn = mkBtn('✕');
  cancelBtn.style.color = '#c62828';

  input.addEventListener('input', (e) => {
    const active = getActiveTextLayer();
    if (!active) {
      return;
    }
    active.text = e.target.value;
    drawPoster();
  });

  bBtn.addEventListener('click', () => {
    const active = getActiveTextLayer();
    if (!active) {
      return;
    }
    active.bold = !active.bold;
    updateTextEditorSelectionState();
    drawPoster();
  });

  iBtn.addEventListener('click', () => {
    const active = getActiveTextLayer();
    if (!active) {
      return;
    }
    active.italic = !active.italic;
    updateTextEditorSelectionState();
    drawPoster();
  });

  uBtn.addEventListener('click', () => {
    const active = getActiveTextLayer();
    if (!active) {
      return;
    }
    active.underline = !active.underline;
    updateTextEditorSelectionState();
    drawPoster();
  });

  applyBtn.addEventListener('click', () => {
    const active = getActiveTextLayer();
    if (active && !String(active.text || '').trim()) {
      state.customTexts = state.customTexts.filter((t) => t.id !== active.id);
    }
    isTextInsertMode = false;
    activeTextId = null;
    hideTextEditor();
    stopTextCaretBlink();
    canvas.style.cursor = 'default';
    statusText.textContent = t().statusReady;
    drawPoster();
  });

  cancelBtn.addEventListener('click', () => {
    const active = getActiveTextLayer();
    if (active) {
      state.customTexts = state.customTexts.filter((t) => t.id !== active.id);
    }
    isTextInsertMode = false;
    activeTextId = null;
    hideTextEditor();
    stopTextCaretBlink();
    canvas.style.cursor = 'default';
    statusText.textContent = t().statusReady;
    drawPoster();
  });

  root.appendChild(input);
  root.appendChild(bBtn);
  root.appendChild(iBtn);
  root.appendChild(uBtn);
  root.appendChild(applyBtn);
  root.appendChild(cancelBtn);
  panel.appendChild(root);

  textEditorRoot = root;
  textEditorInput = input;
  textEditorBoldBtn = bBtn;
  textEditorItalicBtn = iBtn;
  textEditorUnderlineBtn = uBtn;
  textEditorApplyBtn = applyBtn;
  textEditorCancelBtn = cancelBtn;
}

function updateTextEditorSelectionState() {
  const active = getActiveTextLayer();
  if (!textEditorRoot || !textEditorBoldBtn || !textEditorItalicBtn || !textEditorUnderlineBtn) {
    return;
  }
  const setBtn = (btn, on) => {
    btn.style.background = on ? '#e6f4ff' : '#fff';
    btn.style.borderColor = on ? '#0a8eff' : '#cfd8e5';
    btn.style.color = on ? '#07559e' : '#1f2733';
  };
  setBtn(textEditorBoldBtn, !!active?.bold);
  setBtn(textEditorItalicBtn, !!active?.italic);
  setBtn(textEditorUnderlineBtn, !!active?.underline);
}

function positionTextEditorForLayer(layer) {
  if (!textEditorRoot || !layer) {
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const sx = rect.width / canvas.width;
  const sy = rect.height / canvas.height;
  const px = (layer.x * sx) + 8;
  const py = Math.max(8, (layer.y * sy) - 48);
  textEditorRoot.style.left = `${px}px`;
  textEditorRoot.style.top = `${py}px`;
}

function showTextEditorForActiveLayer() {
  ensureTextEditorUI();
  const active = getActiveTextLayer();
  if (!textEditorRoot || !textEditorInput) {
    return;
  }
  if (!active) {
    textEditorRoot.style.display = 'none';
    return;
  }
  textEditorRoot.style.display = 'flex';
  textEditorInput.value = active.text || '';
  positionTextEditorForLayer(active);
  updateTextEditorSelectionState();
}

function hideTextEditor() {
  if (textEditorRoot) {
    textEditorRoot.style.display = 'none';
  }
}

function selectTextLayer(id) {
  activeTextId = id;
  showTextEditorForActiveLayer();
  if (textEditorInput) {
    textEditorInput.focus();
    textEditorInput.select();
  }
  drawPoster();
}

function clearTextSelection() {
  activeTextId = null;
  hideTextEditor();
  drawPoster();
}

function getTextLayerRect(layer) {
  if (!layer) {
    return null;
  }
  const text = String(layer.text || 'Text');
  const fontSize = Math.max(12, Number(layer.size) || 40);
  const weight = layer.bold ? '700' : '400';
  const italic = layer.italic ? 'italic ' : '';
  const family = layer.family || 'Segoe UI';
  ctx.font = `${italic}${weight} ${fontSize}px ${family}`;
  const w = Math.max(20, ctx.measureText(text).width);
  const h = fontSize + 8;
  return { x: layer.x - 4, y: layer.y - h + 2, w: w + 8, h: h + 6 };
}

function findTopTextLayerAtPoint(point) {
  for (let i = state.customTexts.length - 1; i >= 0; i -= 1) {
    const layer = state.customTexts[i];
    const rect = getTextLayerRect(layer);
    if (rect && pointInRect(point, rect)) {
      return layer;
    }
  }
  return null;
}

function startTextCaretBlink() {
  if (textCaretTimer) {
    return;
  }
  textCaretTimer = setInterval(() => {
    if (!isTextInsertMode) {
      return;
    }
    textCaretVisible = !textCaretVisible;
    drawPoster();
  }, 500);
}

function stopTextCaretBlink() {
  if (textCaretTimer) {
    clearInterval(textCaretTimer);
    textCaretTimer = null;
  }
  textCaretVisible = true;
}

function getCurrentInteractiveImages() {
  return state.generator === 'charger' ? (state.chargerImages || []) : getCurrentDeviceImages();
}

function getSelectedInteractiveImageId() {
  return state.generator === 'charger' ? state.selectedChargerImageId : getSelectedDeviceImageId();
}

function setSelectedInteractiveImageId(id) {
  if (state.generator === 'charger') {
    state.selectedChargerImageId = id;
  } else {
    setSelectedDeviceImageId(id);
  }
}

function getChargerImageBoxRect() {
  const cardX = 28;
  const cardY = 30;
  const cardW = canvas.width - 56;
  const boxOffset = getLayoutOffset('device');
  return {
    x: cardX + 130 + boxOffset.x,
    y: cardY + 214 + boxOffset.y,
    w: cardW - 420,
    h: 520,
  };
}


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isHexColor(value) {
  return /^#([0-9a-f]{6})$/i.test(String(value || '').trim());
}

function shadeHexColor(hex, percent) {
  const value = String(hex || '').trim();
  const normalized = /^#([0-9a-f]{6})$/i.test(value) ? value : '#327fe5';
  const n = Number.parseInt(normalized.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const factor = Math.max(-1, Math.min(1, percent));
  const adjust = (c) => Math.max(0, Math.min(255, Math.round(c + (factor >= 0 ? (255 - c) * factor : c * factor))));
  const nr = adjust(r).toString(16).padStart(2, '0');
  const ng = adjust(g).toString(16).padStart(2, '0');
  const nb = adjust(b).toString(16).padStart(2, '0');
  return `#${nr}${ng}${nb}`;
}

function getActiveThemePalette() {
  const baseTheme = themePalettes[state.theme] || themePalettes.Modern;
  const activeTheme = { ...baseTheme };
  Object.entries(state.customThemeColors || {}).forEach(([key, value]) => {
    if (Object.prototype.hasOwnProperty.call(baseTheme, key) && isHexColor(value)) {
      activeTheme[key] = value;
    }
  });
  return activeTheme;
}

function buildColorsSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.colors;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const theme = themePalettes[state.theme] || themePalettes.Modern;
  const items = [
    ['cardBg', state.lang === 'fr' ? 'Carte Fond' : 'Card Background'],
    ['osCard', state.lang === 'fr' ? 'Badge OS' : 'OS Badge'],
    ['priceBox', state.lang === 'fr' ? 'Fond Prix' : 'Price Box'],
    ['specOuter', state.lang === 'fr' ? 'Tableau Specs Exterieur' : 'Specs Table Outer'],
    ['specInnerA', state.lang === 'fr' ? 'Tableau Specs A' : 'Specs Table A'],
    ['specInnerB', state.lang === 'fr' ? 'Tableau Specs B' : 'Specs Table B'],
    ['tag1', state.lang === 'fr' ? 'Badge Processeur' : 'Processor Badge'],
    ['tag2', state.lang === 'fr' ? 'Badge Secondaire 1' : 'Secondary Badge 1'],
    ['tag3', state.lang === 'fr' ? 'Badge Secondaire 2' : 'Secondary Badge 2'],
    ['batteryBadge', state.lang === 'fr' ? 'Badge Batterie' : 'Battery Badge'],
    ['tag4', state.lang === 'fr' ? 'Badge Stockage' : 'Storage Badge'],
    ['tag5', state.lang === 'fr' ? 'Badge RAM' : 'RAM Badge'],
    ['burst', state.lang === 'fr' ? 'Badge Garantie' : 'Guarantee Badge'],
    ['logoBadge', state.lang === 'fr' ? 'Badge Logo' : 'Logo Badge'],
  ];

  items.forEach(([key, label]) => {
    if (!isHexColor(theme[key])) {
      return;
    }
    const row = document.createElement('label');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.gap = '10px';

    const text = document.createElement('span');
    text.textContent = label;

    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = state.customThemeColors[key] || theme[key];
    picker.addEventListener('input', (e) => {
      state.customThemeColors[key] = e.target.value;
      drawPoster();
    });

    row.appendChild(text);
    row.appendChild(picker);
    wrap.appendChild(row);
  });

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.textContent = state.lang === 'fr' ? 'Reinitialiser Couleurs' : 'Reset Colors';
  resetBtn.addEventListener('click', () => {
    state.customThemeColors = {};
    drawPoster();
    renderControls();
  });
  wrap.appendChild(resetBtn);

  section.appendChild(wrap);
  return section;
}

function startStatusLoadingAnimation() {
  if (statusAnimTimer) {
    clearInterval(statusAnimTimer);
  }
  let dots = 0;
  statusText.classList.add('status-loading');
  statusText.textContent = t().statusGenerating;
  statusAnimTimer = setInterval(() => {
    dots = (dots + 1) % 4;
    statusText.textContent = `${t().statusGenerating}${'.'.repeat(dots)}`;
  }, 180);
}

function stopStatusLoadingAnimation() {
  if (statusAnimTimer) {
    clearInterval(statusAnimTimer);
    statusAnimTimer = null;
  }
  statusText.classList.remove('status-loading');
}

function setGeneratingState(active) {
  isGenerating = active;
  const pngBtn = document.getElementById('btnGeneratePng');
  const jpgBtn = document.getElementById('btnGenerateJpg');

  pngBtn.disabled = active;
  jpgBtn.disabled = active;
  pngBtn.classList.toggle('loading', active);
  jpgBtn.classList.toggle('loading', active);

  if (active) {
    pngBtn.textContent = 'Generating...';
    jpgBtn.textContent = 'Generating...';
    startStatusLoadingAnimation();
  } else {
    stopStatusLoadingAnimation();
    pngBtn.textContent = t().generatePng;
    jpgBtn.textContent = t().generateJpg;
  }
}

function buildTileSection(title, key, values, labelMap = null) {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = title;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'options';

  values.forEach((value) => {
    const btn = document.createElement('button');
    btn.className = `tile ${state[key] === value ? 'active' : ''}`;
    btn.textContent = labelMap ? labelMap(value) : value;
    btn.addEventListener('click', () => {
      state[key] = value;
      renderControls();
      drawPoster();
    });
    wrap.appendChild(btn);
  });

  section.appendChild(wrap);
  return section;
}

function buildStorageSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.storage;
  section.appendChild(h3);

  const labels = t().labels;

  const titleGroup = document.createElement('div');
  titleGroup.className = 'input-group';
  titleGroup.style.marginBottom = '10px';

  const topTitleLabel = document.createElement('label');
  topTitleLabel.textContent = labels.titleTop;
  titleGroup.appendChild(topTitleLabel);

  const topTitleInput = document.createElement('input');
  topTitleInput.type = 'text';
  topTitleInput.value = state.titleTop;
  topTitleInput.placeholder = labels.titleTopHint;
  topTitleInput.addEventListener('input', (e) => {
    state.titleTop = e.target.value;
    drawPoster();
  });
  titleGroup.appendChild(topTitleInput);

  const bottomTitleLabel = document.createElement('label');
  bottomTitleLabel.textContent = labels.titleBottom;
  titleGroup.appendChild(bottomTitleLabel);

  const bottomTitleInput = document.createElement('input');
  bottomTitleInput.type = 'text';
  bottomTitleInput.value = state.titleBottom;
  bottomTitleInput.placeholder = labels.titleBottomHint;
  bottomTitleInput.addEventListener('input', (e) => {
    state.titleBottom = e.target.value;
    drawPoster();
  });
  titleGroup.appendChild(bottomTitleInput);

  section.appendChild(titleGroup);

  const typeTitle = document.createElement('div');
  typeTitle.textContent = labels.storageType;
  typeTitle.style.marginBottom = '6px';
  section.appendChild(typeTitle);

  const typeWrap = document.createElement('div');
  typeWrap.className = 'options';
  options.storageType.forEach((value) => {
    const btn = document.createElement('button');
    btn.className = `tile ${state.storageType === value ? 'active' : ''}`;
    btn.textContent = value;
    btn.addEventListener('click', () => {
      state.storageType = value;
      renderControls();
      drawPoster();
    });
    typeWrap.appendChild(btn);
  });
  section.appendChild(typeWrap);

  const typeCustomGroup = document.createElement('div');
  typeCustomGroup.className = 'input-group';
  typeCustomGroup.style.marginTop = '10px';

  const typeCustomLabel = document.createElement('label');
  typeCustomLabel.textContent = labels.storageTypeCustom;
  typeCustomGroup.appendChild(typeCustomLabel);

  const typeCustomInput = document.createElement('input');
  typeCustomInput.type = 'text';
  typeCustomInput.value = state.storageType;
  typeCustomInput.placeholder = labels.storageTypeHint;
  typeCustomInput.addEventListener('input', (e) => {
    state.storageType = e.target.value;
    drawPoster();
  });
  typeCustomGroup.appendChild(typeCustomInput);
  section.appendChild(typeCustomGroup);

  const sizeTitle = document.createElement('div');
  sizeTitle.textContent = labels.storageSize;
  sizeTitle.style.margin = '10px 0 6px';
  section.appendChild(sizeTitle);

  const sizeWrap = document.createElement('div');
  sizeWrap.className = 'options';
  options.storageSize.forEach((value) => {
    const btn = document.createElement('button');
    btn.className = `tile ${state.storageSize === value ? 'active' : ''}`;
    btn.textContent = value;
    btn.addEventListener('click', () => {
      state.storageSize = value;
      renderControls();
      drawPoster();
    });
    sizeWrap.appendChild(btn);
  });
  section.appendChild(sizeWrap);

  const customGroup = document.createElement('div');
  customGroup.className = 'input-group';
  customGroup.style.marginTop = '10px';

  const customLabel = document.createElement('label');
  customLabel.textContent = labels.storageCustom;
  customGroup.appendChild(customLabel);

  const customInput = document.createElement('input');
  customInput.type = 'text';
  customInput.value = state.storageSize;
  customInput.placeholder = labels.storageHint;
  customInput.addEventListener('input', (e) => {
    state.storageSize = e.target.value;
    drawPoster();
  });
  customGroup.appendChild(customInput);
  section.appendChild(customGroup);

  return section;
}

function buildRamSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.ram;
  section.appendChild(h3);

  const sizeWrap = document.createElement('div');
  sizeWrap.className = 'options';
  options.ram.forEach((value) => {
    const btn = document.createElement('button');
    btn.className = `tile ${state.ram === value ? 'active' : ''}`;
    btn.textContent = value;
    btn.addEventListener('click', () => {
      state.ram = value;
      renderControls();
      drawPoster();
    });
    sizeWrap.appendChild(btn);
  });
  section.appendChild(sizeWrap);

  const typeGroup = document.createElement('div');
  typeGroup.className = 'input-group';
  typeGroup.style.marginTop = '10px';

  const typeLabel = document.createElement('label');
  typeLabel.textContent = t().labels.ramType;
  typeGroup.appendChild(typeLabel);

  const typeInput = document.createElement('input');
  typeInput.type = 'text';
  typeInput.value = state.ramType;
  typeInput.placeholder = 'DDR4';
  typeInput.addEventListener('input', (e) => {
    state.ramType = e.target.value;
    drawPoster();
  });
  typeGroup.appendChild(typeInput);
  section.appendChild(typeGroup);

  return section;
}

function buildInputSection(title, label, key, placeholder = '') {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = title;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const textLabel = document.createElement('label');
  textLabel.textContent = label;
  wrap.appendChild(textLabel);

  const input = document.createElement('input');
  input.type = 'text';
  input.value = state[key];
  input.placeholder = placeholder;
  input.addEventListener('input', (e) => {
    state[key] = e.target.value;
    drawPoster();
  });

  wrap.appendChild(input);
  section.appendChild(wrap);

  return section;
}

function buildGeneratorSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.generator;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'options';

  const items = [
    ['device', t().labels.generatorDevice],
    ['charger', t().labels.generatorCharger],
  ];

  items.forEach(([value, label]) => {
    const btn = document.createElement('button');
    btn.className = `tile ${state.generator === value ? 'active' : ''}`;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      state.generator = value;
      renderControls();
      drawPoster();
    });
    wrap.appendChild(btn);
  });

  section.appendChild(wrap);
  return section;
}

function buildChargerSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().labels.generatorCharger;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const titleLabel = document.createElement('label');
  titleLabel.textContent = t().labels.chargerTitle;
  wrap.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = state.chargerTitle;
  titleInput.placeholder = t().labels.chargerTitleHint;
  titleInput.addEventListener('input', (e) => {
    state.chargerTitle = e.target.value;
    drawPoster();
  });
  wrap.appendChild(titleInput);

  const typeLabel = document.createElement('label');
  typeLabel.textContent = t().labels.chargerType;
  wrap.appendChild(typeLabel);

  const typeInput = document.createElement('input');
  typeInput.type = 'text';
  typeInput.value = state.chargerType;
  typeInput.placeholder = t().labels.chargerTypeHint;
  typeInput.addEventListener('input', (e) => {
    state.chargerType = e.target.value;
    drawPoster();
  });
  wrap.appendChild(typeInput);

  const powerLabel = document.createElement('label');
  powerLabel.textContent = t().labels.chargerPower;
  wrap.appendChild(powerLabel);

  const powerInput = document.createElement('input');
  powerInput.type = 'text';
  powerInput.value = state.chargerPower;
  powerInput.placeholder = t().labels.chargerPowerHint;
  powerInput.addEventListener('input', (e) => {
    state.chargerPower = e.target.value;
    drawPoster();
  });
  wrap.appendChild(powerInput);

  const companyLabel = document.createElement('label');
  companyLabel.textContent = t().labels.brand;
  wrap.appendChild(companyLabel);

  const companyInput = document.createElement('input');
  companyInput.type = 'text';
  companyInput.value = state.brand;
  companyInput.placeholder = 'Dell';
  companyInput.addEventListener('input', (e) => {
    state.brand = e.target.value;
    drawPoster();
  });
  wrap.appendChild(companyInput);

  const voltageLabel = document.createElement('label');
  voltageLabel.textContent = t().labels.chargerVoltage;
  wrap.appendChild(voltageLabel);

  const voltageInput = document.createElement('input');
  voltageInput.type = 'text';
  voltageInput.value = state.chargerVoltage;
  voltageInput.placeholder = t().labels.chargerVoltageHint;
  voltageInput.addEventListener('input', (e) => {
    state.chargerVoltage = e.target.value;
    drawPoster();
  });
  wrap.appendChild(voltageInput);

  const ampereLabel = document.createElement('label');
  ampereLabel.textContent = t().labels.chargerAmpere;
  wrap.appendChild(ampereLabel);

  const ampereInput = document.createElement('input');
  ampereInput.type = 'text';
  ampereInput.value = state.chargerAmpere;
  ampereInput.placeholder = t().labels.chargerAmpereHint;
  ampereInput.addEventListener('input', (e) => {
    state.chargerAmpere = e.target.value;
    drawPoster();
  });
  wrap.appendChild(ampereInput);

  const conditionLabel = document.createElement('label');
  conditionLabel.textContent = t().labels.chargerCondition;
  wrap.appendChild(conditionLabel);

  const conditionInput = document.createElement('input');
  conditionInput.type = 'text';
  conditionInput.value = state.chargerCondition;
  conditionInput.placeholder = t().labels.chargerConditionHint;
  conditionInput.addEventListener('input', (e) => {
    state.chargerCondition = e.target.value;
    drawPoster();
  });
  wrap.appendChild(conditionInput);

  const compatibilityLabel = document.createElement('label');
  compatibilityLabel.textContent = t().labels.chargerCompatibility;
  wrap.appendChild(compatibilityLabel);

  const compatibilityInput = document.createElement('textarea');
  compatibilityInput.value = state.chargerCompatibility;
  compatibilityInput.placeholder = t().labels.chargerCompatibilityHint;
  compatibilityInput.rows = 4;
  compatibilityInput.style.resize = 'vertical';
  compatibilityInput.addEventListener('input', (e) => {
    state.chargerCompatibility = e.target.value;
    drawPoster();
  });
  wrap.appendChild(compatibilityInput);

  section.appendChild(wrap);
  return section;
}

function buildPriceSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.price;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const currencyLabel = document.createElement('label');
  currencyLabel.textContent = t().labels.currency;
  wrap.appendChild(currencyLabel);

  const currencySelect = document.createElement('select');
  ['USD', 'EUR'].forEach((code) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = t().currencyNames[code] || code;
    opt.selected = state.currency === code;
    currencySelect.appendChild(opt);
  });
  currencySelect.addEventListener('change', (e) => {
    state.currency = e.target.value;
    drawPoster();
  });
  wrap.appendChild(currencySelect);

  const priceLabel = document.createElement('label');
  priceLabel.textContent = t().labels.price;
  wrap.appendChild(priceLabel);

  const input = document.createElement('input');
  input.type = 'text';
  input.value = state.price;
  input.placeholder = t().labels.priceHint;
  input.addEventListener('input', (e) => {
    state.price = e.target.value;
    drawPoster();
  });
  wrap.appendChild(input);

  section.appendChild(wrap);
  return section;
}

function buildTilePlusInputSection(title, key, values, inputLabel, placeholder = '') {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = title;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'options';

  values.forEach((value) => {
    const btn = document.createElement('button');
    btn.className = `tile ${state[key] === value ? 'active' : ''}`;
    btn.textContent = value;
    btn.addEventListener('click', () => {
      state[key] = value;
      renderControls();
      drawPoster();
    });
    wrap.appendChild(btn);
  });

  section.appendChild(wrap);

  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';
  inputGroup.style.marginTop = '10px';

  const lbl = document.createElement('label');
  lbl.textContent = inputLabel;
  inputGroup.appendChild(lbl);

  const input = document.createElement('input');
  input.type = 'text';
  input.value = state[key];
  input.placeholder = placeholder;
  input.addEventListener('input', (e) => {
    state[key] = e.target.value;
    drawPoster();
  });
  inputGroup.appendChild(input);

  section.appendChild(inputGroup);
  return section;
}

function composeProcessorFromFields() {
  const core = (state.processorCore || '').trim();
  const gen = (state.processorGeneration || '').trim();
  const number = (state.processorNumber || '').trim();
  if (!core || !gen || !number) {
    return null;
  }
  return `Intel Core ${core}-${number} (${gen})`;
}

function buildProcessorSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.processor;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const coreLabel = document.createElement('label');
  coreLabel.textContent = t().labels.processorCore;
  wrap.appendChild(coreLabel);

  const coreWrap = document.createElement('div');
  coreWrap.className = 'options';
  ['i3', 'i5', 'i7', 'i9'].forEach((value) => {
    const btn = document.createElement('button');
    btn.className = `tile ${state.processorCore === value ? 'active' : ''}`;
    btn.textContent = value;
    btn.addEventListener('click', () => {
      state.processorCore = value;
      const composed = composeProcessorFromFields();
      if (composed) {
        state.processor = composed;
      }
      renderControls();
      drawPoster();
    });
    coreWrap.appendChild(btn);
  });
  wrap.appendChild(coreWrap);

  const genLabel = document.createElement('label');
  genLabel.textContent = t().labels.processorGeneration;
  wrap.appendChild(genLabel);

  const genSelect = document.createElement('select');
  ['1st Gen', '2nd Gen', '3rd Gen', '4th Gen', '5th Gen', '6th Gen', '7th Gen', '8th Gen', '9th Gen', '10th Gen', '11th Gen', '12th Gen', '13th Gen', '14th Gen'].forEach((value) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    opt.selected = state.processorGeneration === value;
    genSelect.appendChild(opt);
  });
  genSelect.addEventListener('change', (e) => {
    state.processorGeneration = e.target.value;
    const composed = composeProcessorFromFields();
    if (composed) {
      state.processor = composed;
    }
    drawPoster();
  });
  wrap.appendChild(genSelect);

  const numLabel = document.createElement('label');
  numLabel.textContent = t().labels.processorNumber;
  wrap.appendChild(numLabel);

  const numInput = document.createElement('input');
  numInput.type = 'text';
  numInput.value = state.processorNumber;
  numInput.placeholder = t().labels.processorNumberHint;
  numInput.addEventListener('input', (e) => {
    state.processorNumber = e.target.value;
    const composed = composeProcessorFromFields();
    if (composed) {
      state.processor = composed;
    }
    drawPoster();
  });
  wrap.appendChild(numInput);

  const speedLabel = document.createElement('label');
  speedLabel.textContent = t().labels.processorSpeed;
  wrap.appendChild(speedLabel);

  const speedInput = document.createElement('input');
  speedInput.type = 'text';
  speedInput.value = state.processorSpeed;
  speedInput.placeholder = t().labels.processorSpeedHint;
  speedInput.addEventListener('input', (e) => {
    state.processorSpeed = e.target.value;
    drawPoster();
  });
  wrap.appendChild(speedInput);

  section.appendChild(wrap);
  return section;
}

function buildDeviceImageSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.image;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const uploadBtn = document.createElement('button');
  uploadBtn.type = 'button';
  uploadBtn.textContent = t().labels.uploadImage;

  const removeSelectedBtn = document.createElement('button');
  removeSelectedBtn.type = 'button';
  removeSelectedBtn.textContent = t().labels.removeSelectedImage;
  removeSelectedBtn.disabled = !getSelectedDeviceImageId();

  const clearAllBtn = document.createElement('button');
  clearAllBtn.type = 'button';
  clearAllBtn.textContent = t().labels.clearAllImages;
  clearAllBtn.disabled = getCurrentDeviceImages().length === 0;

  const hint = document.createElement('div');
  hint.textContent = `${t().labels.imageLayerHint} (${getCurrentDeviceImages().length})`;
  hint.style.color = '#5b6678';
  hint.style.fontSize = '13px';

  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'file';
  hiddenInput.accept = 'image/*';
  hiddenInput.multiple = true;
  hiddenInput.style.display = 'none';

  uploadBtn.addEventListener('click', () => hiddenInput.click());
  hiddenInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      // eslint-disable-next-line no-await-in-loop
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
      });
      if (!dataUrl) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const chosenUrl = dataUrl;
      const imageObj = new Image();
      imageObj.src = chosenUrl;
      await new Promise((resolve) => {
        imageObj.onload = () => resolve();
        imageObj.onerror = () => resolve();
      });
      const box = getDeviceImageBoxRect();
      const maxBaseW = box.w * 0.55;
      const maxBaseH = box.h * 0.55;
      const ratio = imageObj.width && imageObj.height ? imageObj.width / imageObj.height : 1;
      let drawW = maxBaseW;
      let drawH = drawW / ratio;
      if (drawH > maxBaseH) {
        drawH = maxBaseH;
        drawW = drawH * ratio;
      }
      const layer = {
        id: `dev-${deviceImageIdCounter++}`,
        dataUrl: chosenUrl,
        imageObj,
        x: (box.w - drawW) / 2,
        y: (box.h - drawH) / 2,
        w: drawW,
        h: drawH,
      };
      getCurrentDeviceImages().push(layer);
      setSelectedDeviceImageId(layer.id);
    }
    statusText.textContent = t().statusReady;
    hiddenInput.value = '';
    drawPoster();
    renderControls();
  });

  removeSelectedBtn.addEventListener('click', () => {
    const selectedId = getSelectedDeviceImageId();
    if (!selectedId) {
      return;
    }
    state.deviceImages[state.type] = getCurrentDeviceImages().filter((img) => img.id !== selectedId);
    const next = state.deviceImages[state.type][state.deviceImages[state.type].length - 1] || null;
    setSelectedDeviceImageId(next ? next.id : null);
    drawPoster();
    renderControls();
  });

  clearAllBtn.addEventListener('click', () => {
    state.deviceImages[state.type] = [];
    setSelectedDeviceImageId(null);
    drawPoster();
    renderControls();
  });

  wrap.appendChild(uploadBtn);
  wrap.appendChild(removeSelectedBtn);
  wrap.appendChild(clearAllBtn);
  wrap.appendChild(hint);
  wrap.appendChild(hiddenInput);
  section.appendChild(wrap);
  return section;
}

function buildChargerImageSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.chargerImage || t().sections.image;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const uploadBtn = document.createElement('button');
  uploadBtn.type = 'button';
  uploadBtn.textContent = t().labels.uploadChargerImage;

  const removeSelectedBtn = document.createElement('button');
  removeSelectedBtn.type = 'button';
  removeSelectedBtn.textContent = t().labels.removeSelectedImage;
  removeSelectedBtn.disabled = !state.selectedChargerImageId;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = t().labels.clearAllImages;
  clearBtn.disabled = (state.chargerImages || []).length === 0;

  const hint = document.createElement('div');
  hint.textContent = t().labels.chargerImageHint;
  hint.style.color = '#5b6678';
  hint.style.fontSize = '13px';

  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'file';
  hiddenInput.accept = 'image/*';
  hiddenInput.multiple = true;
  hiddenInput.style.display = 'none';

  uploadBtn.addEventListener('click', () => hiddenInput.click());
  hiddenInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      // eslint-disable-next-line no-await-in-loop
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
      });
      if (!dataUrl) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const imageObj = new Image();
      imageObj.src = dataUrl;
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        imageObj.onload = () => resolve();
        imageObj.onerror = () => resolve();
      });
      const box = getChargerImageBoxRect();
      const maxBaseW = box.w * 0.72;
      const maxBaseH = box.h * 0.72;
      const ratio = imageObj.width && imageObj.height ? imageObj.width / imageObj.height : 1;
      let drawW = maxBaseW;
      let drawH = drawW / ratio;
      if (drawH > maxBaseH) {
        drawH = maxBaseH;
        drawW = drawH * ratio;
      }
      const layer = {
        id: `chg-${deviceImageIdCounter++}`,
        dataUrl,
        imageObj,
        x: (box.w - drawW) / 2,
        y: (box.h - drawH) / 2,
        w: drawW,
        h: drawH,
      };
      state.chargerImages.push(layer);
      state.selectedChargerImageId = layer.id;
    }
    hiddenInput.value = '';
    drawPoster();
    renderControls();
  });

  removeSelectedBtn.addEventListener('click', () => {
    const selectedId = state.selectedChargerImageId;
    if (!selectedId) {
      return;
    }
    state.chargerImages = (state.chargerImages || []).filter((img) => img.id !== selectedId);
    const next = state.chargerImages[state.chargerImages.length - 1] || null;
    state.selectedChargerImageId = next ? next.id : null;
    drawPoster();
    renderControls();
  });

  clearBtn.addEventListener('click', () => {
    state.chargerImageDataUrl = '';
    chargerImageObj = null;
    state.chargerImages = [];
    state.selectedChargerImageId = null;
    drawPoster();
    renderControls();
  });

  wrap.appendChild(uploadBtn);
  wrap.appendChild(removeSelectedBtn);
  wrap.appendChild(clearBtn);
  wrap.appendChild(hint);
  wrap.appendChild(hiddenInput);
  section.appendChild(wrap);
  return section;
}

function buildLogoSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.logo;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const uploadBtn = document.createElement('button');
  uploadBtn.type = 'button';
  uploadBtn.textContent = t().labels.uploadLogo;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = t().labels.clearLogo;
  clearBtn.disabled = !state.logoImageDataUrl;

  const hint = document.createElement('div');
  hint.textContent = t().labels.logoHint;
  hint.style.color = '#5b6678';
  hint.style.fontSize = '13px';

  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'file';
  hiddenInput.accept = 'image/*';
  hiddenInput.style.display = 'none';

  uploadBtn.addEventListener('click', () => hiddenInput.click());
  hiddenInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      state.logoImageDataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (state.logoImageDataUrl) {
        logoImageObj = new Image();
        logoImageObj.onload = () => drawPoster();
        logoImageObj.src = state.logoImageDataUrl;
        isLogoSelected = true;
      }
      drawPoster();
      renderControls();
    };
    reader.readAsDataURL(file);
  });

  clearBtn.addEventListener('click', () => {
    state.logoImageDataUrl = '';
    logoImageObj = null;
    logoResizeHandleRect = null;
    logoImageBodyRect = null;
    isLogoSelected = false;
    drawPoster();
    renderControls();
  });

  wrap.appendChild(uploadBtn);
  wrap.appendChild(clearBtn);
  wrap.appendChild(hint);
  wrap.appendChild(hiddenInput);
  section.appendChild(wrap);
  return section;
}

function buildBadgesSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.badges;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  [
    ['showLogoBadge', t().labels.showLogoBadge],
    ['showIntelBadge', t().labels.showIntelBadge],
    ['showBatteryBadge', t().labels.showBatteryBadge],
    ['showGuaranteeBadge', t().labels.showGuaranteeBadge],
  ].forEach(([key, label]) => {
    const row = document.createElement('label');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '8px';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!state[key];
    input.addEventListener('change', (e) => {
      state[key] = e.target.checked;
      drawPoster();
    });

    const text = document.createElement('span');
    text.textContent = label;
    row.appendChild(input);
    row.appendChild(text);
    wrap.appendChild(row);
  });

  const usbLabel = document.createElement('label');
  usbLabel.textContent = t().labels.usbSpec;
  wrap.appendChild(usbLabel);

  const usbInput = document.createElement('input');
  usbInput.type = 'text';
  usbInput.value = state.usbSpec;
  usbInput.placeholder = t().labels.usbSpecHint;
  usbInput.addEventListener('input', (e) => {
    state.usbSpec = e.target.value;
    drawPoster();
  });
  wrap.appendChild(usbInput);

  const wifiLabel = document.createElement('label');
  wifiLabel.textContent = t().labels.wifiSpec;
  wrap.appendChild(wifiLabel);

  const wifiInput = document.createElement('input');
  wifiInput.type = 'text';
  wifiInput.value = state.wifiSpec;
  wifiInput.placeholder = t().labels.wifiSpecHint;
  wifiInput.addEventListener('input', (e) => {
    state.wifiSpec = e.target.value;
    drawPoster();
  });
  wrap.appendChild(wifiInput);

  section.appendChild(wrap);
  return section;
}

function buildChargerBadgesSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.badges;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  [
    ['showLogoBadge', t().labels.showLogoBadge],
    ['showGuaranteeBadge', t().labels.showGuaranteeBadge],
    ['showChargerCompatibilityBadge', t().labels.chargerCompatibility],
  ].forEach(([key, label]) => {
    const row = document.createElement('label');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '8px';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!state[key];
    input.addEventListener('change', (e) => {
      state[key] = e.target.checked;
      drawPoster();
    });

    const text = document.createElement('span');
    text.textContent = label;
    row.appendChild(input);
    row.appendChild(text);
    wrap.appendChild(row);
  });

  section.appendChild(wrap);
  return section;
}

function buildBatterySection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.battery;
  section.appendChild(h3);

  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';
  inputGroup.style.marginTop = '2px';

  const pctLabel = document.createElement('label');
  pctLabel.textContent = t().labels.batteryPercentage;
  inputGroup.appendChild(pctLabel);

  const pctInput = document.createElement('input');
  pctInput.type = 'number';
  pctInput.min = '0';
  pctInput.max = '100';
  pctInput.step = '1';
  pctInput.value = state.batteryPercentage;
  pctInput.placeholder = t().labels.batteryPercentageHint;
  pctInput.addEventListener('input', (e) => {
    state.batteryPercentage = e.target.value;
    drawPoster();
  });
  inputGroup.appendChild(pctInput);
  section.appendChild(inputGroup);

  return section;
}

function buildGuaranteeSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.guarantee;
  section.appendChild(h3);

  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';
  inputGroup.style.marginTop = '2px';

  const periodLabel = document.createElement('label');
  periodLabel.textContent = t().labels.guaranteePeriod;
  inputGroup.appendChild(periodLabel);

  const periodInput = document.createElement('input');
  periodInput.type = 'text';
  periodInput.value = state.guaranteePeriod;
  periodInput.placeholder = t().labels.guaranteePeriodHint;
  periodInput.addEventListener('input', (e) => {
    state.guaranteePeriod = e.target.value;
    drawPoster();
  });

  inputGroup.appendChild(periodInput);
  section.appendChild(inputGroup);

  return section;
}

function applySectionToggle(section, key) {
  const titleNode = section.querySelector('h3');
  if (!titleNode) {
    return section;
  }

  const head = document.createElement('div');
  head.className = 'section-head';

  const title = document.createElement('h3');
  title.textContent = titleNode.textContent;

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = state.sectionEnabled[key] !== false;
  toggle.className = 'section-toggle';
  toggle.addEventListener('change', (e) => {
    state.sectionEnabled[key] = e.target.checked;
    drawPoster();
    renderControls();
  });

  head.appendChild(title);
  head.appendChild(toggle);
  titleNode.replaceWith(head);

  const contentNodes = Array.from(section.children).filter((el) => !el.classList.contains('section-head'));
  if (state.sectionEnabled[key] === false) {
    section.classList.add('section-disabled');
    contentNodes.forEach((el) => {
      el.style.opacity = '0.5';
      el.style.pointerEvents = 'none';
    });
  }
  return section;
}

function renderControls() {
  controlsPanel.innerHTML = '';
  const labels = t();

  if (state.generator === 'charger') {
    controlsPanel.appendChild(
      buildTileSection(labels.sections.theme, 'theme', options.theme, (value) => labels.themeNames[value] || value)
    );
    controlsPanel.appendChild(applySectionToggle(buildChargerImageSection(), 'image'));
    controlsPanel.appendChild(applySectionToggle(buildLogoSection(), 'logo'));
    controlsPanel.appendChild(applySectionToggle(buildGuaranteeSection(), 'guarantee'));
    controlsPanel.appendChild(applySectionToggle(buildPriceSection(), 'price'));
    controlsPanel.appendChild(applySectionToggle(buildChargerBadgesSection(), 'badges'));
    controlsPanel.appendChild(applySectionToggle(buildChargerSection(), 'charger'));
    controlsPanel.appendChild(buildColorsSection());
    return;
  }

  controlsPanel.appendChild(
    buildTileSection(labels.sections.theme, 'theme', options.theme, (value) => labels.themeNames[value] || value)
  );
  controlsPanel.appendChild(applySectionToggle(buildTileSection(labels.sections.type, 'type', options.type), 'type'));
  controlsPanel.appendChild(applySectionToggle(buildDeviceImageSection(), 'image'));
  controlsPanel.appendChild(applySectionToggle(buildLogoSection(), 'logo'));
  controlsPanel.appendChild(
    applySectionToggle(
      buildTilePlusInputSection(labels.sections.os, 'os', options.os, labels.labels.osCustom, labels.labels.osHint),
      'os'
    )
  );
  controlsPanel.appendChild(applySectionToggle(buildRamSection(), 'ram'));
  controlsPanel.appendChild(
    applySectionToggle(
      buildTileSection(
        labels.sections.keyboard,
        'keyboardBacklight',
        options.keyboardBacklight,
        (value) => labels.keyboardBacklightValues[value] || value
      ),
      'keyboard'
    )
  );
  controlsPanel.appendChild(applySectionToggle(buildStorageSection(), 'storage'));
  controlsPanel.appendChild(
    applySectionToggle(
      buildTilePlusInputSection(
        labels.sections.brand,
        'brand',
        options.brand,
        labels.labels.brand,
        'HP / Dell / Apple...'
      ),
      'brand'
    )
  );
  controlsPanel.appendChild(
    applySectionToggle(
      buildProcessorSection(),
      'processor'
    )
  );
  controlsPanel.appendChild(
    applySectionToggle(buildBatterySection(), 'battery')
  );
  controlsPanel.appendChild(
    applySectionToggle(buildGuaranteeSection(), 'guarantee')
  );
  controlsPanel.appendChild(
    applySectionToggle(buildPriceSection(), 'price')
  );
  controlsPanel.appendChild(applySectionToggle(buildBadgesSection(), 'badges'));
  controlsPanel.appendChild(buildColorsSection());
}

function drawRoundedRect(x, y, w, h, r, fill, stroke = null) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

function drawTagIcon(x, y, icon, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.4;

  if (icon === 'intel') {
    ctx.beginPath();
    ctx.ellipse(x + 20, y + 20, 15, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = 'bold 12px Segoe UI';
    ctx.fillText('i', x + 17, y + 24);
  }
  ctx.restore();
}

function drawTag(x, y, w, h, color, textA, textB = '', textColor = '#fff', icon = '') {
  drawRoundedRect(x, y, w, h, 16, color);
  ctx.fillStyle = textColor;
  const leftPad = icon ? 46 : 14;
  const rightPad = 12;
  const textOffsetX = leftPad;
  const maxTextWidth = Math.max(40, w - leftPad - rightPad);
  const hasSecondLine = !!textB;
  if (icon) {
    drawTagIcon(x + 8, y + 16, icon, textColor);
  }

  if (hasSecondLine) {
    const rawPrimarySize = fitText(String(textA), maxTextWidth, '600', 28, 15, 'Segoe UI');
    const primarySize = Math.min(rawPrimarySize, Math.max(22, Math.round(h * 0.40)));
    const rawSecondarySize = fitText(String(textB), maxTextWidth, '600', 19, 11, 'Segoe UI');
    const secondaryCapByPrimary = Math.max(11, Math.round(primarySize * 0.64));
    const secondarySize = Math.min(rawSecondarySize, secondaryCapByPrimary);
    const topPad = Math.max(8, Math.round(h * 0.14));
    const bottomPad = Math.max(8, Math.round(h * 0.14));
    const lineGap = Math.max(3, Math.round(h * 0.05));
    const totalTextHeight = primarySize + lineGap + secondarySize;
    const startY = y + topPad + ((h - topPad - bottomPad - totalTextHeight) / 2) + primarySize;

    ctx.font = `600 ${primarySize}px Segoe UI`;
    ctx.fillText(String(textA), x + textOffsetX, startY);
    ctx.font = `600 ${secondarySize}px Segoe UI`;
    ctx.fillText(String(textB), x + textOffsetX, startY + lineGap + secondarySize);
    return;
  }

  const rawSingleSize = fitText(String(textA), maxTextWidth, '600', 28, 15, 'Segoe UI');
  const singleSize = Math.min(rawSingleSize, Math.max(22, Math.round(h * 0.42)));
  const baselineY = y + ((h - singleSize) / 2) + singleSize;
  ctx.font = `600 ${singleSize}px Segoe UI`;
  ctx.fillText(String(textA), x + textOffsetX, baselineY);
}

function drawImageContain(img, x, y, w, h) {
  const srcRatio = img.width / img.height;
  const boxRatio = w / h;
  let drawW = w;
  let drawH = h;
  let dx = x;
  let dy = y;

  if (srcRatio > boxRatio) {
    drawH = w / srcRatio;
    dy = y + (h - drawH) / 2;
  } else {
    drawW = h * srcRatio;
    dx = x + (w - drawW) / 2;
  }
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

function getDeviceImageBoxRect() {
  const cardX = 28;
  const cardY = 30;
  const cardW = canvas.width - 56;
  const deviceOffset = getLayoutOffset('device');
  return state.type === 'Laptop'
    ? { x: cardX + 148 + deviceOffset.x, y: cardY + 220 + deviceOffset.y, w: 510, h: 360 }
    : { x: cardX + 140 + deviceOffset.x, y: cardY + 220 + deviceOffset.y, w: 560, h: 430 };
}

function drawDeviceImageLayers(box) {
  const images = getCurrentInteractiveImages();
  const selectedId = getSelectedInteractiveImageId();
  deviceImageHandles = [];
  images.forEach((layer, idx) => {
    const img = layer.imageObj;
    if (!img.complete) {
      return;
    }
    const drawX = box.x + layer.x;
    const drawY = box.y + layer.y;
    ctx.drawImage(img, drawX, drawY, layer.w, layer.h);

    const isSelected = selectedId === layer.id;
    if (isSelected) {
      ctx.save();
      ctx.strokeStyle = '#0a84ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(drawX, drawY, layer.w, layer.h);
      ctx.restore();
      const handleSize = 12;
      const hx = drawX + layer.w - handleSize / 2;
      const hy = drawY + layer.h - handleSize / 2;
      drawRoundedRect(hx, hy, handleSize, handleSize, 3, '#0a84ff');
      deviceImageHandles.push({
        id: layer.id,
        body: { x: drawX, y: drawY, w: layer.w, h: layer.h },
        handle: { x: hx, y: hy, w: handleSize, h: handleSize },
        z: idx,
      });
    } else {
      deviceImageHandles.push({
        id: layer.id,
        body: { x: drawX, y: drawY, w: layer.w, h: layer.h },
        handle: null,
        z: idx,
      });
    }
  });
}

function drawProcessorLogoBadge(x, y, w, h, tierText, baseColor = null) {
  const theme = themePalettes[state.theme] || themePalettes.Modern;
  const bg = ctx.createLinearGradient(x, y, x + w, y + h);
  const start = baseColor || theme.tag1;
  bg.addColorStop(0, start);
  bg.addColorStop(1, shadeHexColor(start, -0.32));
  drawRoundedRect(x, y, w, h, 14, bg);
  drawRoundedRect(x + 6, y + 6, w - 12, h - 12, 10, 'rgba(255,255,255,0.08)');

  ctx.fillStyle = '#eaf4ff';
  const leftPad = 12;
  const rightPad = 12;
  const headerText = 'PROCESSOR';
  const textRightEdge = x + w - rightPad;
  const maxTextWidth = Math.max(60, textRightEdge - (x + leftPad));
  const coreText = `CORE ${tierText.toLowerCase()}`;
  const headerSize = fitText(headerText, maxTextWidth, '600', 11, 9, 'Segoe UI');
  const rawCoreSize = fitText(coreText, maxTextWidth, '600', 34, 16, 'Segoe UI');
  const coreSize = Math.min(rawCoreSize, Math.max(23, Math.round(h * 0.43)));
  const topPad = Math.max(8, Math.round(h * 0.13));
  const bottomPad = Math.max(8, Math.round(h * 0.13));
  const gap = Math.max(3, Math.round(h * 0.05));
  const textBlockH = headerSize + gap + coreSize;
  const startY = y + topPad + ((h - topPad - bottomPad - textBlockH) / 2);

  ctx.font = `600 ${headerSize}px Segoe UI`;
  ctx.fillText(headerText, x + leftPad, startY + headerSize);
  ctx.font = `600 ${coreSize}px Segoe UI`;
  const coreY = startY + headerSize + gap + coreSize;
  ctx.fillText(coreText, x + leftPad, coreY);
}

function fitText(text, maxWidth, weight = 'bold', startSize = 34, minSize = 12, family = 'Segoe UI') {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) {
      return size;
    }
    size -= 1;
  }
  return minSize;
}

function splitPriceDisplay() {
  const value = (state.price || '').trim();
  if (!value) {
    return { symbol: '', value: '' };
  }
  const explicitMatch = value.match(/^([€$])\s*(.*)$/);
  if (explicitMatch) {
    return { symbol: explicitMatch[1], value: explicitMatch[2] || '' };
  }
  const symbol = state.currency === 'EUR' ? '€' : '$';
  return { symbol, value };
}

function parseGenerationLabel(processorText) {
  if (state.processorGeneration) {
    return state.processorGeneration;
  }
  const intelMatch = processorText.match(/i[3579][-\s]?(\d{4,5})/i);
  if (intelMatch) {
    const first = intelMatch[1][0];
    const n = Number(first);
    if (Number.isFinite(n) && n > 0) {
      return `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} Gen`;
    }
  }

  const ryzenMatch = processorText.match(/ryzen\s*[3579]\s*(\d{4})/i);
  if (ryzenMatch) {
    return `${ryzenMatch[1][0]}th Gen`;
  }

  return 'Gen N/A';
}

function normalizeProcessorNumber(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return '';
  }
  const digits = raw.replace(/\D/g, '');
  if (digits.length >= 4) {
    return digits;
  }
  return raw;
}

function localizeBinarySpec(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return state.lang === 'fr' ? 'Oui' : 'Yes';
  }
  const norm = raw.toLowerCase();
  if (norm === 'yes' || norm === 'oui') {
    return state.lang === 'fr' ? 'Oui' : 'Yes';
  }
  if (norm === 'no' || norm === 'non') {
    return state.lang === 'fr' ? 'Non' : 'No';
  }
  return raw;
}

function canonicalBinaryValue(value) {
  const norm = String(value || '').trim().toLowerCase();
  if (norm === 'yes' || norm === 'oui') {
    return 'yes';
  }
  if (norm === 'no' || norm === 'non') {
    return 'no';
  }
  return '';
}

function translatePosterTitleText(value, targetLang) {
  const raw = String(value || '').trim();
  if (!raw) {
    return raw;
  }
  const mapToFr = {
    'SSD': 'SSD',
    'HARD DRIVE': 'DISQUE DUR',
    'LAPTOP': 'PORTABLE',
    'PC': 'PC',
    'NEW CONDITION': 'NOUVEL ETAT',
  };
  const mapToEn = {
    'SSD': 'SSD',
    'DISQUE DUR': 'HARD DRIVE',
    'PORTABLE': 'LAPTOP',
    'PC': 'PC',
    'NOUVEL ETAT': 'NEW CONDITION',
  };
  const key = raw.toUpperCase();
  if (targetLang === 'fr' && mapToFr[key]) {
    return mapToFr[key];
  }
  if (targetLang === 'en' && mapToEn[key]) {
    return mapToEn[key];
  }
  return raw;
}

function translateChargerTitleText(value, targetLang) {
  const raw = String(value || '').trim();
  if (!raw) {
    return raw;
  }
  const mapToFr = {
    'FAST CHARGER': 'CHARGEUR RAPIDE',
  };
  const mapToEn = {
    'CHARGEUR RAPIDE': 'FAST CHARGER',
  };
  const key = raw.toUpperCase();
  if (targetLang === 'fr' && mapToFr[key]) {
    return mapToFr[key];
  }
  if (targetLang === 'en' && mapToEn[key]) {
    return mapToEn[key];
  }
  return raw;
}

function getBatteryPercentLabel() {
  const digits = String(state.batteryPercentage || '').replace(/\D/g, '');
  if (!digits) {
    return '0%';
  }
  const clamped = Math.max(0, Math.min(100, Number(digits)));
  return `${clamped}%`;
}

function getChargerCompatibilityModels() {
  const raw = String(state.chargerCompatibility || '');
  return raw
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function drawBurst(cx, cy, spikes, outerRadius, innerRadius, fill) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i += 1) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }

  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawChargerPoster(cardX, cardY, cardW, cardH, theme) {
  const titleOffset = getLayoutOffset('storage');
  const titleText = (state.chargerTitle || 'FAST CHARGER').trim().toUpperCase();
  const titleX = cardX + 34 + titleOffset.x;
  const titleY = cardY + 96 + titleOffset.y;
  ctx.fillStyle = theme.title;
  const titleSize = fitText(titleText, cardW - 360, 'italic bold', 76, 26, 'Segoe UI');
  ctx.font = `italic bold ${titleSize}px Segoe UI`;
  ctx.fillText(titleText, titleX, titleY);
  registerDraggableRegion('storage', titleX - 8, titleY - titleSize, Math.max(280, cardW - 370), titleSize + 20);
  registerRemovableElement(titleX - 8, titleY - titleSize, Math.max(280, cardW - 370), titleSize + 20, () => {
    state.chargerTitle = '';
  });

  const showTopGuarantee = state.sectionEnabled.badges !== false
    && state.sectionEnabled.guarantee !== false
    && state.showGuaranteeBadge;
  if (showTopGuarantee) {
    const guaranteeOffset = getLayoutOffset('guarantee');
    const badgeX = cardX + 34 + guaranteeOffset.x;
    const badgeY = cardY + cardH - 186 + guaranteeOffset.y;
    const badgeW = 126;
    const badgeH = 150;
    const periodText = (state.guaranteePeriod || '12 Months').toUpperCase();
    const line1 = state.lang === 'fr' ? 'GARANTIE' : 'GUARANTEE';

    drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 2, theme.burst);
    ctx.fillStyle = theme.osCardText;
    ctx.fillRect(badgeX + 6, badgeY + 6, badgeW - 12, 90);
    ctx.fillStyle = theme.burst;
    const periodSize = fitText(periodText, 102, 'bold', 34, 10, 'Segoe UI');
    ctx.font = `bold ${periodSize}px Segoe UI`;
    const periodWidth = ctx.measureText(periodText).width;
    ctx.fillText(periodText, badgeX + 6 + (114 - periodWidth) / 2, badgeY + 70);
    ctx.fillStyle = theme.osCardText;
    const lineSize = fitText(line1, 104, 'bold', 16, 10, 'Segoe UI');
    ctx.font = `bold ${lineSize}px Segoe UI`;
    const lineW = ctx.measureText(line1).width;
    ctx.fillText(line1, badgeX + 6 + (114 - lineW) / 2, badgeY + 126);
    registerDraggableRegion('guarantee', badgeX, badgeY, badgeW, badgeH);
    registerRemovableElement(badgeX, badgeY, badgeW, badgeH, () => {
      state.showGuaranteeBadge = false;
    });
  }

  if (state.sectionEnabled.image !== false && (state.chargerImages || []).length > 0) {
    const box = getChargerImageBoxRect();
    drawDeviceImageLayers(box);
    registerDraggableRegion('device', box.x, box.y, box.w, box.h);
    registerRemovableElement(box.x, box.y, box.w, box.h, () => {
      state.chargerImages = [];
      state.selectedChargerImageId = null;
      state.chargerImageDataUrl = '';
      chargerImageObj = null;
    });
  }

  const chargerDetailsEnabled = state.sectionEnabled.charger !== false;
  if (chargerDetailsEnabled) {
    const typeOffset = getLayoutOffset('tags');
    const badgeX = cardX + cardW - 220 + typeOffset.x;
    const tagsStartY = cardY + 250 + typeOffset.y;
    let badgeY = tagsStartY;
    const badgeW = 186;
    let tagsBottom = badgeY + 86;

    drawTag(
      badgeX,
      badgeY,
      badgeW,
      86,
      shadeHexColor(theme.tag2, -0.05),
      (state.brand || 'Dell').trim() || 'Dell',
      state.lang === 'fr' ? 'MARQUE' : 'COMPANY',
      '#fff'
    );
    registerRemovableElement(badgeX, badgeY, badgeW, 86, () => {
      state.brand = '';
    });
    badgeY += 98;
    tagsBottom = badgeY - 12;
    if (state.showChargerTypeBadge) {
      drawTag(
        badgeX,
        badgeY,
        badgeW,
        86,
        shadeHexColor(theme.tag2, 0.05),
        (state.chargerType || 'USB-C Charger').trim(),
        state.lang === 'fr' ? 'TYPE' : 'TYPE',
        '#fff'
      );
      registerRemovableElement(badgeX, badgeY, badgeW, 86, () => {
        state.showChargerTypeBadge = false;
      });
      badgeY += 98;
      tagsBottom = badgeY - 12;
    }
    if (state.showChargerVoltageBadge) {
      drawTag(
        badgeX,
        badgeY,
        badgeW,
        86,
        shadeHexColor(theme.tag4, 0.05),
        (state.chargerVoltage || '20V').trim(),
        state.lang === 'fr' ? 'TENSION' : 'VOLTAGE',
        '#fff'
      );
      registerRemovableElement(badgeX, badgeY, badgeW, 86, () => {
        state.showChargerVoltageBadge = false;
      });
      badgeY += 98;
      tagsBottom = badgeY - 12;
    }
    if (state.showChargerAmpereBadge) {
      drawTag(
        badgeX,
        badgeY,
        badgeW,
        86,
        shadeHexColor(theme.batteryBadge, -0.04),
        (state.chargerAmpere || '3.25A').trim(),
        state.lang === 'fr' ? 'AMPERAGE' : 'AMPERE',
        '#fff'
      );
      registerRemovableElement(badgeX, badgeY, badgeW, 86, () => {
        state.showChargerAmpereBadge = false;
      });
      badgeY += 98;
      tagsBottom = badgeY - 12;
    }
    if (state.showChargerPowerBadge) {
      drawTag(
        badgeX,
        badgeY,
        badgeW,
        86,
        theme.tag1,
        (state.chargerPower || '65W').trim(),
        state.lang === 'fr' ? 'PUISSANCE' : 'POWER',
        '#fff'
      );
      registerRemovableElement(badgeX, badgeY, badgeW, 86, () => {
        state.showChargerPowerBadge = false;
      });
      badgeY += 98;
      tagsBottom = badgeY - 12;
    }
    if (state.showChargerConditionBadge) {
      drawTag(
        badgeX,
        badgeY,
        badgeW,
        86,
        shadeHexColor(theme.tag3, 0.06),
        (state.chargerCondition || 'New').trim(),
        state.lang === 'fr' ? 'ETAT' : 'CONDITION',
        '#fff'
      );
      registerRemovableElement(badgeX, badgeY, badgeW, 86, () => {
        state.showChargerConditionBadge = false;
      });
      badgeY += 98;
      tagsBottom = badgeY - 12;
    }
    registerDraggableRegion('tags', badgeX, tagsStartY, badgeW, Math.max(86, tagsBottom - tagsStartY));

    if (state.showChargerCompatibilityBadge) {
      const compatibilityOffset = getLayoutOffset('chargerCompatibility');
      const models = getChargerCompatibilityModels();
      const fallbackModel = state.lang === 'fr' ? 'Dell Latitude 5490' : 'Dell Latitude 5490';
      const displayModels = models.length > 0 ? models.slice(0, 8) : [fallbackModel];
      const compatX = cardX + 34 + compatibilityOffset.x;
      const compatY = cardY + cardH - 296 + compatibilityOffset.y;
      const rowH = 27;
      const titleH = 46;
      const maxRows = 8;
      const rowsToDraw = Math.min(maxRows, Math.max(1, displayModels.length));
      const compatH = titleH + 16 + (rowsToDraw * rowH);
      const compatTitle = String(t().labels.chargerCompatibility || 'Compatibility').toUpperCase();

      ctx.font = 'bold 16px Segoe UI';
      const titleWidth = ctx.measureText(compatTitle).width;
      let widestModelWidth = 0;
      displayModels.slice(0, rowsToDraw).forEach((model) => {
        const label = model.toUpperCase();
        ctx.font = 'bold 15px Segoe UI';
        widestModelWidth = Math.max(widestModelWidth, ctx.measureText(label).width);
      });
      const contentWidth = Math.max(titleWidth, widestModelWidth);
      const horizontalPadding = 40;
      const maxCompatWidth = Math.max(220, Math.floor(cardW - 70));
      const compatW = Math.max(220, Math.min(maxCompatWidth, Math.ceil(contentWidth + horizontalPadding)));

      drawRoundedRect(compatX, compatY, compatW, compatH, 14, theme.specOuter);
      const compatGrad = ctx.createLinearGradient(compatX + 6, compatY + 6, compatX + compatW - 6, compatY + compatH - 6);
      compatGrad.addColorStop(0, theme.specInnerA);
      compatGrad.addColorStop(1, theme.specInnerB);
      drawRoundedRect(compatX + 6, compatY + 6, compatW - 12, compatH - 12, 12, compatGrad);

      ctx.fillStyle = theme.specValue;
      ctx.font = 'bold 16px Segoe UI';
      ctx.fillText(compatTitle, compatX + 20, compatY + 31);

      const lineStartY = compatY + titleH + 2;
      for (let i = 0; i < rowsToDraw; i += 1) {
        drawRoundedRect(compatX + 16, lineStartY + (i * rowH), compatW - 32, 1, 0, theme.specDivider);
      }

      ctx.fillStyle = theme.specValue;
      displayModels.slice(0, rowsToDraw).forEach((model, index) => {
        const label = model.toUpperCase();
        const size = fitText(label, compatW - 40, 'bold', 15, 11, 'Segoe UI');
        ctx.font = `bold ${size}px Segoe UI`;
        ctx.fillText(label, compatX + 20, compatY + titleH + 21 + (index * rowH));
      });

      registerDraggableRegion('chargerCompatibility', compatX, compatY, compatW, compatH);
      registerRemovableElement(compatX, compatY, compatW, compatH, () => {
        state.showChargerCompatibilityBadge = false;
      });
    }
  }

  const showLogoBadge = state.sectionEnabled.badges !== false
    && state.sectionEnabled.logo !== false
    && state.showLogoBadge;
  if (showLogoBadge) {
    const logoOffset = getLayoutOffset('logo');
    const logoBadgeX = cardX + cardW - 184 + logoOffset.x;
    const logoBadgeY = cardY + 24 + logoOffset.y;
    const hasLogoImage = !!(logoImageObj && logoImageObj.complete);
    const logoBadgeW = Math.max(120, Number(state.logoBadgeSize?.w) || 150);
    const minLogoBadgeH = hasLogoImage ? 116 : 150;
    const logoBadgeH = Math.max(minLogoBadgeH, Number(state.logoBadgeSize?.h) || minLogoBadgeH);
    const logoInnerX = logoBadgeX + 8;
    const logoInnerY = logoBadgeY + 8;
    const logoInnerW = logoBadgeW - 16;
    const logoInnerH = hasLogoImage ? (logoBadgeH - 16) : 92;
    logoBadgeBodyRect = hasLogoImage ? null : { x: logoBadgeX, y: logoBadgeY, w: logoBadgeW, h: logoBadgeH };

    if (!hasLogoImage) {
      drawRoundedRect(logoBadgeX, logoBadgeY, logoBadgeW, logoBadgeH, 12, theme.logoBadge);
      drawRoundedRect(logoInnerX, logoInnerY, logoInnerW, logoInnerH, 8, '#f7fbff');
    }
    if (hasLogoImage) {
      const maxSize = Math.max(canvas.width, canvas.height) * 2;
      const rawSize = Number(state.logoSize) || 56;
      const fitSize = Math.max(24, Math.min(maxSize, rawSize));
      const ratio = logoImageObj.width / logoImageObj.height || 1;
      let drawW = fitSize;
      let drawH = fitSize;
      if (ratio > 1) {
        drawH = fitSize / ratio;
      } else {
        drawW = fitSize * ratio;
      }
      const drawX = logoInnerX + (logoInnerW - drawW) / 2;
      const drawY = logoInnerY + (logoInnerH - drawH) / 2;
      ctx.drawImage(logoImageObj, drawX, drawY, drawW, drawH);
      logoImageBodyRect = { x: drawX, y: drawY, w: drawW, h: drawH };
      if (isLogoSelected) {
        const handleSize = 12;
        const handleX = drawX + drawW - handleSize / 2;
        const handleY = drawY + drawH - handleSize / 2;
        drawRoundedRect(handleX, handleY, handleSize, handleSize, 3, '#0c4ca5');
        logoResizeHandleRect = { x: handleX, y: handleY, w: handleSize, h: handleSize, maxSize };
      } else {
        logoResizeHandleRect = null;
      }
    } else {
      logoResizeHandleRect = null;
      logoImageBodyRect = null;
      ctx.fillStyle = '#2f4f76';
      const logoText = 'LOGO';
      const topSize = fitText(logoText, logoInnerW - 18, 'bold', 38, 14, 'Segoe UI');
      ctx.font = `bold ${topSize}px Segoe UI`;
      const topW = ctx.measureText(logoText).width;
      const topY = logoInnerY + ((logoInnerH - topSize) / 2) + topSize;
      ctx.fillText(logoText, logoInnerX + (logoInnerW - topW) / 2, topY);
      ctx.fillStyle = '#f2f8ff';
      const captionSize = fitText(logoText, logoBadgeW - 16, 'bold', 24, 12, 'Segoe UI');
      ctx.font = `bold ${captionSize}px Segoe UI`;
      const captionW = ctx.measureText(logoText).width;
      const captionTop = logoInnerY + logoInnerH;
      const captionH = logoBadgeH - 8 - logoInnerH;
      const captionY = captionTop + ((captionH - captionSize) / 2) + captionSize;
      ctx.fillText(logoText, logoBadgeX + (logoBadgeW - captionW) / 2, captionY);
    }

    if (isLogoSelected && !hasLogoImage) {
      const handleSize = 14;
      const hitPad = 8;
      const badgeHandleX = logoBadgeX + logoBadgeW - handleSize / 2;
      const badgeHandleY = logoBadgeY + logoBadgeH - handleSize / 2;
      drawRoundedRect(badgeHandleX, badgeHandleY, handleSize, handleSize, 3, '#0a84ff');
      logoBadgeResizeHandleRect = {
        x: badgeHandleX - hitPad,
        y: badgeHandleY - hitPad,
        w: handleSize + (hitPad * 2),
        h: handleSize + (hitPad * 2),
        minW: 120,
        minH: minLogoBadgeH,
      };
    } else {
      logoBadgeResizeHandleRect = null;
    }
    const logoDragRect = hasLogoImage && logoImageBodyRect
      ? logoImageBodyRect
      : { x: logoBadgeX, y: logoBadgeY, w: logoBadgeW, h: logoBadgeH };
    registerDraggableRegion('logo', logoDragRect.x, logoDragRect.y, logoDragRect.w, logoDragRect.h);
    registerRemovableElement(logoDragRect.x, logoDragRect.y, logoDragRect.w, logoDragRect.h, () => {
      state.showLogoBadge = false;
    });
  } else {
    logoResizeHandleRect = null;
    logoBadgeResizeHandleRect = null;
    logoBadgeBodyRect = null;
    logoImageBodyRect = null;
  }

  const priceParts = splitPriceDisplay();
  if (state.sectionEnabled.price !== false && priceParts.value) {
    const symbolFontSize = 52;
    const valueFontSize = 46;
    const symbolGap = 20;
    const leftPad = 22;
    const rightPad = 26;
    ctx.font = `bold ${symbolFontSize}px Segoe UI`;
    const symbolWidth = ctx.measureText(priceParts.symbol).width;
    ctx.font = `bold ${valueFontSize}px Segoe UI`;
    const valueWidth = ctx.measureText(priceParts.value).width;

    const contentWidth = leftPad + symbolWidth + symbolGap + valueWidth + rightPad;
    const badgeW = Math.max(240, Math.min(430, Math.ceil(contentWidth + 8)));
    const badgeH = 84;
    const priceOffset = getLayoutOffset('price');
    const badgeX = cardX + cardW - badgeW - 24 + priceOffset.x;
    const badgeY = cardY + cardH - badgeH - 22 + priceOffset.y;

    const glowGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY + badgeH);
    glowGrad.addColorStop(0, '#ffffff');
    glowGrad.addColorStop(1, '#dbe5f3');
    drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 16, glowGrad);

    const innerGrad = ctx.createLinearGradient(badgeX + 8, badgeY + 8, badgeX + badgeW - 8, badgeY + badgeH - 8);
    innerGrad.addColorStop(0, theme.priceBox);
    innerGrad.addColorStop(1, '#0b1f4b');
    drawRoundedRect(badgeX + 8, badgeY + 8, badgeW - 16, badgeH - 16, 12, innerGrad);

    const topHighlight = ctx.createLinearGradient(badgeX + 14, badgeY + 14, badgeX + badgeW - 14, badgeY + 30);
    topHighlight.addColorStop(0, 'rgba(255,255,255,0.32)');
    topHighlight.addColorStop(1, 'rgba(255,255,255,0)');
    drawRoundedRect(badgeX + 14, badgeY + 14, badgeW - 28, 14, 7, topHighlight);

    const priceLabel = state.lang === 'fr' ? 'Prix' : 'Price';
    const labelText = priceLabel.toUpperCase();
    ctx.font = 'bold 16px Segoe UI';
    const labelW = Math.ceil(ctx.measureText(labelText).width) + 24;
    const labelH = 24;
    const labelX = badgeX + 12;
    const labelY = badgeY - 14;
    drawRoundedRect(labelX, labelY, labelW, labelH, 7, '#ffffff');
    drawRoundedRect(labelX + 2, labelY + 2, labelW - 4, labelH - 4, 6, '#0b1f4b');
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Segoe UI';
    ctx.fillText(labelText, labelX + 12, labelY + 18);

    ctx.fillStyle = theme.priceText;
    ctx.font = `bold ${symbolFontSize}px Segoe UI`;
    ctx.fillText(priceParts.symbol, badgeX + leftPad, badgeY + 74);

    const valueX = badgeX + leftPad + symbolWidth + symbolGap;
    const valueFitWidth = badgeW - (valueX - badgeX) - rightPad;
    const valueFitSize = fitText(priceParts.value, valueFitWidth, 'bold', valueFontSize, 24, 'Segoe UI');
    ctx.font = `bold ${valueFitSize}px Segoe UI`;
    ctx.fillText(priceParts.value, valueX, badgeY + 72);
    registerDraggableRegion('price', badgeX, badgeY - 16, badgeW, badgeH + 20);
    registerRemovableElement(badgeX, badgeY - 16, badgeW, badgeH + 20, () => {
      state.sectionEnabled.price = false;
    });
  }
}

function drawCustomTextLayers() {
  if (!Array.isArray(state.customTexts) || state.customTexts.length === 0) {
    return;
  }
  state.customTexts.forEach((item) => {
    const text = String(item.text || '');
    const fontSize = Math.max(12, Number(item.size) || 40);
    const fontWeight = item.bold ? '700' : '400';
    const fontStyle = item.italic ? 'italic ' : '';
    const fontFamily = item.family || 'Segoe UI';
    ctx.fillStyle = item.color || '#1f2733';
    ctx.font = `${fontStyle}${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillText(text || 'Text', item.x, item.y);

    if (item.underline) {
      const lineText = text || 'Text';
      const textW = ctx.measureText(lineText).width;
      const underlineY = item.y + 4;
      ctx.save();
      ctx.strokeStyle = item.color || '#1f2733';
      ctx.lineWidth = Math.max(1, Math.round(fontSize * 0.07));
      ctx.beginPath();
      ctx.moveTo(item.x, underlineY);
      ctx.lineTo(item.x + textW, underlineY);
      ctx.stroke();
      ctx.restore();
    }

    const metricsText = text || 'Text';
    const w = Math.max(40, ctx.measureText(metricsText).width);
    const h = fontSize + 8;
    registerRemovableElement(item.x - 4, item.y - h + 2, w + 8, h + 6, () => {
      state.customTexts = state.customTexts.filter((t) => t.id !== item.id);
      if (activeTextId === item.id) {
        activeTextId = null;
      }
    });

    if (isTextInsertMode && activeTextId === item.id && textCaretVisible) {
      const caretX = item.x + ctx.measureText(text).width + 1;
      const caretTop = item.y - fontSize + 4;
      ctx.save();
      ctx.strokeStyle = item.color || '#1f2733';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(caretX, caretTop);
      ctx.lineTo(caretX, caretTop + fontSize);
      ctx.stroke();
      ctx.restore();
    }
    if (activeTextId === item.id) {
      ctx.save();
      ctx.strokeStyle = '#0a84ff';
      ctx.setLineDash([5, 4]);
      ctx.strokeRect(item.x - 4, item.y - h + 2, w + 8, h + 6);
      ctx.restore();
    }
  });
}

function drawPoster() {
  draggableRegions = [];
  removableElements = [];
  removeButtonRects = [];
  deviceImageHandles = [];
  const w = canvas.width;
  const h = canvas.height;
  const theme = getActiveThemePalette();
  ctx.clearRect(0, 0, w, h);

  const cardX = 28;
  const cardY = 30;
  const cardW = w - 56;
  const cardH = h - 60;

  const frameGrad = ctx.createLinearGradient(0, 0, 0, h);
  frameGrad.addColorStop(0, theme.frameTop);
  frameGrad.addColorStop(1, theme.frameBottom);
  ctx.fillStyle = frameGrad;
  ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cardX + cardW - 120, cardY + 110, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  ctx.arc(cardX + 150, cardY + cardH - 120, 100, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  drawRoundedRect(cardX, cardY, cardW, cardH, 2, theme.cardBg);
  ctx.strokeStyle = theme.cardStroke;
  ctx.lineWidth = 2;
  ctx.strokeRect(cardX, cardY, cardW, cardH);

  if (state.generator === 'charger') {
    drawChargerPoster(cardX, cardY, cardW, cardH, theme);
    drawCustomTextLayers();
    if (activeTextId) {
      showTextEditorForActiveLayer();
    } else {
      hideTextEditor();
    }
    drawSelectAllOverlay();
    return;
  }

  if (state.sectionEnabled.os !== false) {
    const osOffset = getLayoutOffset('os');
    const osX = cardX + 18 + osOffset.x;
    const osY = cardY + 18 + osOffset.y;
    drawRoundedRect(osX, osY, 126, 150, 2, theme.osCard);
    ctx.fillStyle = theme.osCardText;
    ctx.fillRect(osX + 6, osY + 6, 114, 90);
    ctx.fillStyle = theme.osCard;
    const rawOsText = (state.os || '').trim();
    const osText = rawOsText.toLowerCase() === 'mac' ? 'macOS' : (rawOsText || 'Windows');
    const osFontSize = fitText(osText, 102, 'bold', 34, 10, 'Segoe UI');
    ctx.font = `bold ${osFontSize}px Segoe UI`;
    const osTextWidth = ctx.measureText(osText).width;
    const osTextX = osX + 6 + (114 - osTextWidth) / 2;
    ctx.fillText(osText, osTextX, osY + 70);
    ctx.fillStyle = theme.osCardText;
    const osLine1 = state.lang === 'fr' ? 'Systeme' : 'Operating';
    const osLine2 = state.lang === 'fr' ? 'Exploitation' : 'System';
    const osLine1Size = fitText(osLine1, 104, 'bold', 16, 10, 'Segoe UI');
    const osLine2Size = fitText(osLine2, 104, 'bold', 16, 10, 'Segoe UI');
    const osCaptionTop = osY + 94;
    const osCaptionHeight = 54;
    const osCaptionGap = 4;
    const osCaptionTotal = osLine1Size + osCaptionGap + osLine2Size;
    const osLine1Y = osCaptionTop + ((osCaptionHeight - osCaptionTotal) / 2) + osLine1Size;
    const osLine2Y = osLine1Y + osCaptionGap + osLine2Size;
    ctx.font = `bold ${osLine1Size}px Segoe UI`;
    const osLine1Width = ctx.measureText(osLine1).width;
    ctx.fillText(osLine1, osX + 6 + (114 - osLine1Width) / 2, osLine1Y);
    ctx.font = `bold ${osLine2Size}px Segoe UI`;
    const osLine2Width = ctx.measureText(osLine2).width;
    ctx.fillText(osLine2, osX + 6 + (114 - osLine2Width) / 2, osLine2Y);
    registerDraggableRegion('os', osX, osY, 126, 150);
    registerRemovableElement(osX, osY, 126, 150, () => {
      state.sectionEnabled.os = false;
    });
  }

  const showTopGuarantee = state.sectionEnabled.badges !== false
    && state.sectionEnabled.guarantee !== false
    && state.showGuaranteeBadge;
  const storageOffset = getLayoutOffset('storage');
  const storageTitleX = (showTopGuarantee ? cardX + 300 : cardX + 182) + storageOffset.x;
  const storageTitleY = cardY + storageOffset.y;

  if (state.sectionEnabled.storage !== false) {
    const topTitle = (state.titleTop || '').trim() || state.storageType || 'SSD';
    const bottomTitle = (state.titleBottom || '').trim() || (state.lang === 'fr' ? 'DISQUE DUR' : 'HARD DRIVE');
    ctx.fillStyle = theme.title;
    ctx.font = 'italic bold 68px Segoe UI';
    ctx.fillText(topTitle, storageTitleX, storageTitleY + 88);
    ctx.fillStyle = theme.subtitle;
    ctx.font = 'bold 38px Segoe UI';
    ctx.fillText(bottomTitle, storageTitleX + 2, storageTitleY + 128);
    registerDraggableRegion('storage', storageTitleX - 8, storageTitleY + 22, 350, 120);
    registerRemovableElement(storageTitleX - 8, storageTitleY + 22, 350, 120, () => {
      state.sectionEnabled.storage = false;
    });
  }

  if (showTopGuarantee) {
    const guaranteeOffset = getLayoutOffset('guarantee');
    const badgeX = cardX + 154 + guaranteeOffset.x;
    const badgeY = cardY + 18 + guaranteeOffset.y;
    const badgeW = 126;
    const badgeH = 150;
    const periodText = (state.guaranteePeriod || '12 Months').toUpperCase();
    const guaranteeText = state.lang === 'fr' ? 'GARANTIE' : 'GUARANTEE';

    drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 2, theme.burst);
    ctx.fillStyle = theme.osCardText;
    ctx.fillRect(badgeX + 6, badgeY + 6, badgeW - 12, 90);

    ctx.fillStyle = theme.burst;
    const periodSize = fitText(periodText, 102, 'bold', 34, 10, 'Segoe UI');
    ctx.font = `bold ${periodSize}px Segoe UI`;
    const periodWidth = ctx.measureText(periodText).width;
    const periodX = badgeX + 6 + (114 - periodWidth) / 2;
    ctx.fillText(periodText, periodX, badgeY + 70);

    ctx.fillStyle = theme.osCardText;
    const line1 = state.lang === 'fr' ? 'GARANTIE' : 'GUARANTEE';
    const line1Size = fitText(line1, 104, 'bold', 16, 10, 'Segoe UI');
    const captionTop = badgeY + 94;
    const captionHeight = 54;
    const captionTotal = line1Size;
    const line1Y = captionTop + ((captionHeight - captionTotal) / 2) + line1Size;
    ctx.font = `bold ${line1Size}px Segoe UI`;
    const line1Width = ctx.measureText(line1).width;
    ctx.fillText(line1, badgeX + 6 + (114 - line1Width) / 2, line1Y);
    registerDraggableRegion('guarantee', badgeX, badgeY, badgeW, badgeH);
    registerRemovableElement(badgeX, badgeY, badgeW, badgeH, () => {
      state.showGuaranteeBadge = false;
    });
  }

  const showLogoBadge = state.sectionEnabled.badges !== false
    && state.sectionEnabled.logo !== false
    && state.showLogoBadge;
  if (showLogoBadge) {
    const logoOffset = getLayoutOffset('logo');
    const logoBadgeX = cardX + cardW - 178 + logoOffset.x;
    const logoBadgeY = cardY + 18 + logoOffset.y;
    const hasLogoImage = !!(logoImageObj && logoImageObj.complete);
    const logoBadgeW = Math.max(120, Number(state.logoBadgeSize?.w) || 150);
    const minLogoBadgeH = hasLogoImage ? 116 : 150;
    const logoBadgeH = Math.max(minLogoBadgeH, Number(state.logoBadgeSize?.h) || minLogoBadgeH);
    const logoInnerX = logoBadgeX + 8;
    const logoInnerY = logoBadgeY + 8;
    const logoInnerW = logoBadgeW - 16;
    const logoInnerH = hasLogoImage ? (logoBadgeH - 16) : 92;
    logoBadgeBodyRect = hasLogoImage ? null : { x: logoBadgeX, y: logoBadgeY, w: logoBadgeW, h: logoBadgeH };

    if (!hasLogoImage) {
      drawRoundedRect(logoBadgeX, logoBadgeY, logoBadgeW, logoBadgeH, 12, theme.logoBadge);
      drawRoundedRect(logoInnerX, logoInnerY, logoInnerW, logoInnerH, 8, '#f7fbff');
    }

    if (hasLogoImage) {
      const maxSize = Math.max(canvas.width, canvas.height) * 2;
      const rawSize = Number(state.logoSize) || 56;
      const fitSize = Math.max(24, Math.min(maxSize, rawSize));
      const ratio = logoImageObj.width / logoImageObj.height || 1;
      let drawW = fitSize;
      let drawH = fitSize;
      if (ratio > 1) {
        drawH = fitSize / ratio;
      } else {
        drawW = fitSize * ratio;
      }
      const drawX = logoInnerX + (logoInnerW - drawW) / 2;
      const drawY = logoInnerY + (logoInnerH - drawH) / 2;
      ctx.drawImage(logoImageObj, drawX, drawY, drawW, drawH);
      logoImageBodyRect = { x: drawX, y: drawY, w: drawW, h: drawH };

      if (isLogoSelected) {
        const handleSize = 12;
        const handleX = drawX + drawW - handleSize / 2;
        const handleY = drawY + drawH - handleSize / 2;
        drawRoundedRect(handleX, handleY, handleSize, handleSize, 3, '#0c4ca5');
        logoResizeHandleRect = { x: handleX, y: handleY, w: handleSize, h: handleSize, maxSize };
      } else {
        logoResizeHandleRect = null;
      }
    } else {
      logoResizeHandleRect = null;
      logoImageBodyRect = null;
      ctx.fillStyle = '#2f4f76';
      const logoText = 'LOGO';
      const logoTextSize = fitText(logoText, logoInnerW - 18, 'bold', 28, 14, 'Segoe UI');
      ctx.font = `bold ${logoTextSize}px Segoe UI`;
      const logoTextWidth = ctx.measureText(logoText).width;
      ctx.fillText(logoText, logoInnerX + (logoInnerW - logoTextWidth) / 2, logoInnerY + 56);
      ctx.fillStyle = '#f2f8ff';
      ctx.font = 'bold 24px Segoe UI';
      const caption = 'LOGO';
      const captionWidth = ctx.measureText(caption).width;
      ctx.fillText(caption, logoBadgeX + (logoBadgeW - captionWidth) / 2, logoBadgeY + 135);
    }

    if (isLogoSelected && !hasLogoImage) {
      const handleSize = 14;
      const hitPad = 8;
      const badgeHandleX = logoBadgeX + logoBadgeW - handleSize / 2;
      const badgeHandleY = logoBadgeY + logoBadgeH - handleSize / 2;
      drawRoundedRect(badgeHandleX, badgeHandleY, handleSize, handleSize, 3, '#0a84ff');
      logoBadgeResizeHandleRect = {
        x: badgeHandleX - hitPad,
        y: badgeHandleY - hitPad,
        w: handleSize + (hitPad * 2),
        h: handleSize + (hitPad * 2),
        minW: 120,
        minH: minLogoBadgeH,
      };
    } else {
      logoBadgeResizeHandleRect = null;
    }

    const logoDragRect = hasLogoImage && logoImageBodyRect
      ? logoImageBodyRect
      : { x: logoBadgeX, y: logoBadgeY, w: logoBadgeW, h: logoBadgeH };
    registerDraggableRegion('logo', logoDragRect.x, logoDragRect.y, logoDragRect.w, logoDragRect.h);
    registerRemovableElement(logoDragRect.x, logoDragRect.y, logoDragRect.w, logoDragRect.h, () => {
      state.showLogoBadge = false;
    });
  } else {
    logoResizeHandleRect = null;
    logoBadgeResizeHandleRect = null;
    logoBadgeBodyRect = null;
    logoImageBodyRect = null;
  }

  const currentDeviceImages = getCurrentDeviceImages();
  const hasUploadedDeviceImage = state.sectionEnabled.image !== false && currentDeviceImages.length > 0;
  const deviceOffset = getLayoutOffset('device');
  if (state.sectionEnabled.type !== false && hasUploadedDeviceImage) {
    const imageBox = getDeviceImageBoxRect();
    drawDeviceImageLayers(imageBox);
    registerDraggableRegion('device', imageBox.x, imageBox.y, imageBox.w, imageBox.h);
    registerRemovableElement(imageBox.x, imageBox.y, imageBox.w, imageBox.h, () => {
      state.sectionEnabled.image = false;
    });
  } else if (state.sectionEnabled.type !== false && state.type === 'Laptop') {
    deviceImageHandles = [];
    const lx = cardX + 170 + deviceOffset.x;
    const ly = cardY + 268 + deviceOffset.y;
    drawRoundedRect(lx, ly, 420, 250, 12, theme.bodyDark);
    drawRoundedRect(lx + 18, ly + 18, 384, 208, 8, theme.screenInner);
    const lapGrad = ctx.createLinearGradient(lx + 18, ly + 18, lx + 402, ly + 226);
    lapGrad.addColorStop(0, theme.screenGradA);
    lapGrad.addColorStop(0.6, theme.screenGradB);
    lapGrad.addColorStop(1, theme.screenGradC);
    ctx.fillStyle = lapGrad;
    ctx.fillRect(lx + 20, ly + 20, 380, 204);
    drawRoundedRect(cardX + 140 + deviceOffset.x, cardY + 520 + deviceOffset.y, 480, 26, 10, theme.bodyLight);
    registerDraggableRegion('device', cardX + 140 + deviceOffset.x, cardY + 268 + deviceOffset.y, 480, 278);
    registerRemovableElement(cardX + 140 + deviceOffset.x, cardY + 268 + deviceOffset.y, 480, 278, () => {
      state.sectionEnabled.type = false;
    });
  } else if (state.sectionEnabled.type !== false) {
    deviceImageHandles = [];
    const dx = deviceOffset.x;
    const dy = deviceOffset.y;
    drawRoundedRect(cardX + 164 + dx, cardY + 250 + dy, 175, 338, 6, theme.bodyDark);
    drawRoundedRect(cardX + 178 + dx, cardY + 274 + dy, 146, 118, 4, theme.bodyMid);
    drawRoundedRect(cardX + 182 + dx, cardY + 278 + dy, 138, 110, 4, theme.bodyLight);
    drawRoundedRect(cardX + 188 + dx, cardY + 406 + dy, 126, 32, 4, '#e4e9f1');
    drawRoundedRect(cardX + 188 + dx, cardY + 444 + dy, 126, 112, 4, theme.bodyLight);

    drawRoundedRect(cardX + 336 + dx, cardY + 252 + dy, 372, 302, 10, theme.screenOuter);
    drawRoundedRect(cardX + 352 + dx, cardY + 270 + dy, 340, 262, 8, theme.screenInner);
    const screenGrad = ctx.createLinearGradient(cardX + 352 + dx, cardY + 270 + dy, cardX + 692 + dx, cardY + 532 + dy);
    screenGrad.addColorStop(0, theme.screenGradA);
    screenGrad.addColorStop(0.5, theme.screenGradB);
    screenGrad.addColorStop(1, theme.screenGradC);
    ctx.fillStyle = screenGrad;
    ctx.fillRect(cardX + 354 + dx, cardY + 272 + dy, 336, 258);

    drawRoundedRect(cardX + 474 + dx, cardY + 572 + dy, 92, 20, 8, theme.standA);
    drawRoundedRect(cardX + 438 + dx, cardY + 594 + dy, 164, 18, 8, theme.standB);
    drawRoundedRect(cardX + 376 + dx, cardY + 664 + dy, 286, 18, 5, theme.base);
    drawRoundedRect(cardX + 680 + dx, cardY + 652 + dy, 66, 32, 16, theme.mouse);
    registerDraggableRegion('device', cardX + 164 + dx, cardY + 250 + dy, 582, 434);
    registerRemovableElement(cardX + 164 + dx, cardY + 250 + dy, 582, 434, () => {
      state.sectionEnabled.type = false;
    });
  }

  const procParts = state.processor.split(' ');
  const procMain = procParts.slice(0, 2).join(' ') || 'Intel';
  const procSub = procParts.slice(2, 4).join(' ') || 'Core';

  const tagsOffset = getLayoutOffset('tags');
  const tagsX = cardX + cardW - 180 + tagsOffset.x;
  const tagW = 154;
  const tagsStartY = cardY + 188 + tagsOffset.y;
  let tagY = tagsStartY;
  const tagGap = 12;
  let tagsBottom = tagsStartY;

  if (state.sectionEnabled.processor !== false && state.showIntelBadge) {
    const badgeH = 78;
    const tier = (state.processorCore || state.processor.match(/i[3579]/i)?.[0] || 'i5').toUpperCase();
    drawProcessorLogoBadge(tagsX, tagY, tagW, badgeH, tier, theme.tag1);
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showIntelBadge = false;
    });
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.processor !== false && state.showProcessorSpeedBadge && (state.processorSpeed || '').trim()) {
    const badgeH = 74;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      shadeHexColor(theme.tag1, 0.12),
      (state.processorSpeed || '').trim(),
      state.lang === 'fr' ? 'VITESSE CPU' : 'CPU SPEED',
      '#fff'
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showProcessorSpeedBadge = false;
    });
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.badges !== false && state.showScreenBadge && (state.screenSize || '').trim()) {
    const badgeH = 74;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      shadeHexColor(theme.tag2, 0.08),
      (state.screenSize || '').trim(),
      state.lang === 'fr' ? 'ECRAN' : 'SCREEN',
      '#fff'
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showScreenBadge = false;
    });
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.badges !== false && state.sectionEnabled.battery !== false && state.showBatteryBadge) {
    const badgeH = 78;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      theme.batteryBadge,
      getBatteryPercentLabel(),
      state.lang === 'fr' ? 'BATTERIE' : 'BATTERY',
      '#fff'
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showBatteryBadge = false;
    });
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.storage !== false && state.showStorageBadge) {
    const badgeH = 78;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      theme.tag4,
      state.storageSize.replace(' ', ''),
      state.storageType
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showStorageBadge = false;
    });
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.ram !== false && state.showRamBadge) {
    const badgeH = 78;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      theme.tag5,
      state.ram.replace(' ', ''),
      t().memory,
      theme.tag5Text
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showRamBadge = false;
    });
    tagsBottom = tagY + badgeH;
  }
  registerDraggableRegion(
    'tags',
    tagsX,
    tagsStartY,
    tagW,
    Math.max(78, tagsBottom - tagsStartY)
  );

  if (state.sectionEnabled.processor !== false) {
    const specOffset = getLayoutOffset('spec');
    const specX = cardX + 34 + specOffset.x;
    const specY = cardY + cardH - 350 + specOffset.y;
    const specW = 296;
    const specH = 284;
    drawRoundedRect(specX, specY, specW, specH, 14, theme.specOuter);
    const specInnerGrad = ctx.createLinearGradient(specX + 6, specY + 6, specX + specW - 6, specY + specH - 6);
    specInnerGrad.addColorStop(0, theme.specInnerA);
    specInnerGrad.addColorStop(1, theme.specInnerB);
    drawRoundedRect(specX + 6, specY + 6, specW - 12, specH - 12, 12, specInnerGrad);

    const rowH = 30;
    const rowStartY = specY + 50;
    const lineY = rowStartY + 2;
    drawRoundedRect(specX + 16, lineY, specW - 32, 1, 0, theme.specDivider);
    drawRoundedRect(specX + 16, lineY + rowH, specW - 32, 1, 0, theme.specDivider);
    drawRoundedRect(specX + 16, lineY + rowH * 2, specW - 32, 1, 0, theme.specDivider);
    drawRoundedRect(specX + 16, lineY + rowH * 3, specW - 32, 1, 0, theme.specDivider);
    drawRoundedRect(specX + 16, lineY + rowH * 4, specW - 32, 1, 0, theme.specDivider);
    drawRoundedRect(specX + 16, lineY + rowH * 5, specW - 32, 1, 0, theme.specDivider);
    drawRoundedRect(specX + 16, lineY + rowH * 6, specW - 32, 1, 0, theme.specDivider);

    ctx.fillStyle = theme.specValue;
    ctx.font = 'bold 16px Segoe UI';
    ctx.fillText(t().specTitle.toUpperCase(), specX + 20, specY + 32);

    const labelX = specX + 20;
    const valueX = specX + 178;
    const labelColW = valueX - labelX - 10;
    const valueColW = specX + specW - 20 - valueX;

    ctx.fillStyle = theme.specLabel;
    const textBaseY = rowStartY + 24;
    const specLabels = [
      t().labels.processor,
      t().specGeneration,
      'RAM',
      t().specHardDrive,
      t().specKeyboard,
      t().specUsb,
      t().specWifi,
    ];
    specLabels.forEach((label, idx) => {
      const size = fitText(label, labelColW, 'bold', 14, 11, 'Segoe UI');
      ctx.font = `bold ${size}px Segoe UI`;
      ctx.fillText(label, labelX, textBaseY + rowH * idx);
    });

    const coreLabel = (state.processorCore || 'i5').toLowerCase();
    const numberLabel = normalizeProcessorNumber(state.processorNumber);
    const procChip = numberLabel ? `${coreLabel}-${numberLabel}` : coreLabel;
    const genLabel = state.processorGeneration || parseGenerationLabel(state.processor);
    const driveLabel = `${state.storageSize} ${state.storageType}`.trim();
    const keyboardLabel = t().keyboardBacklightValues[state.keyboardBacklight] || state.keyboardBacklight || '';
    const usbLabel = localizeBinarySpec(state.usbSpec);
    const wifiLabel = localizeBinarySpec(state.wifiSpec);

    ctx.fillStyle = theme.specValue;
    const procSize = fitText(procChip, valueColW, 'bold', 15, 11, 'Segoe UI');
    ctx.font = `bold ${procSize}px Segoe UI`;
    ctx.fillText(procChip, valueX, textBaseY);
    const genSize = fitText(genLabel, valueColW, 'bold', 15, 11, 'Segoe UI');
    ctx.font = `bold ${genSize}px Segoe UI`;
    ctx.fillText(genLabel, valueX, textBaseY + rowH);
    const ramValue = `${state.ram} ${state.ramType || ''}`.trim();
    const ramSize = fitText(ramValue, valueColW, 'bold', 15, 11, 'Segoe UI');
    ctx.font = `bold ${ramSize}px Segoe UI`;
    ctx.fillText(ramValue, valueX, textBaseY + rowH * 2);
    const driveSize = fitText(driveLabel, valueColW, 'bold', 15, 11, 'Segoe UI');
    ctx.font = `bold ${driveSize}px Segoe UI`;
    ctx.fillText(driveLabel, valueX, textBaseY + rowH * 3);
    const keyboardSize = fitText(keyboardLabel, valueColW, 'bold', 15, 11, 'Segoe UI');
    ctx.font = `bold ${keyboardSize}px Segoe UI`;
    ctx.fillText(keyboardLabel, valueX, textBaseY + rowH * 4);
    const usbSize = fitText(usbLabel, valueColW, 'bold', 15, 11, 'Segoe UI');
    ctx.font = `bold ${usbSize}px Segoe UI`;
    ctx.fillText(usbLabel, valueX, textBaseY + rowH * 5);
    const wifiSize = fitText(wifiLabel, valueColW, 'bold', 15, 11, 'Segoe UI');
    ctx.font = `bold ${wifiSize}px Segoe UI`;
    ctx.fillText(wifiLabel, valueX, textBaseY + rowH * 6);
    registerDraggableRegion('spec', specX, specY, specW, specH);
    registerRemovableElement(specX, specY, specW, specH, () => {
      state.sectionEnabled.processor = false;
    });
  }

  if (state.sectionEnabled.brand !== false) {
    const brandOffset = getLayoutOffset('brand');
    ctx.fillStyle = theme.brand;
    ctx.font = 'bold 36px Segoe UI';
    const safeBrand = (state.brand || 'Brand').toUpperCase();
    const brandX = cardX + 20 + brandOffset.x;
    const brandY = cardY + cardH - 18 + brandOffset.y;
    ctx.fillText(safeBrand, brandX, brandY);
    registerDraggableRegion('brand', brandX - 4, brandY - 36, 240, 48);
    registerRemovableElement(brandX - 4, brandY - 36, 240, 48, () => {
      state.sectionEnabled.brand = false;
    });
  }

  const priceParts = splitPriceDisplay();
  if (state.sectionEnabled.price !== false && priceParts.value) {
    const symbolFontSize = 52;
    const valueFontSize = 46;
    const symbolGap = 20;
    const leftPad = 22;
    const rightPad = 26;
    ctx.font = `bold ${symbolFontSize}px Segoe UI`;
    const symbolWidth = ctx.measureText(priceParts.symbol).width;
    ctx.font = `bold ${valueFontSize}px Segoe UI`;
    const valueWidth = ctx.measureText(priceParts.value).width;

    const contentWidth = leftPad + symbolWidth + symbolGap + valueWidth + rightPad;
    const badgeW = Math.max(240, Math.min(430, Math.ceil(contentWidth + 8)));
    const badgeH = 84;
    const priceOffset = getLayoutOffset('price');
    const badgeX = cardX + cardW - badgeW - 24 + priceOffset.x;
    const badgeY = cardY + cardH - badgeH - 22 + priceOffset.y;

    const glowGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY + badgeH);
    glowGrad.addColorStop(0, '#ffffff');
    glowGrad.addColorStop(1, '#dbe5f3');
    drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 16, glowGrad);

    const innerGrad = ctx.createLinearGradient(badgeX + 8, badgeY + 8, badgeX + badgeW - 8, badgeY + badgeH - 8);
    innerGrad.addColorStop(0, theme.priceBox);
    innerGrad.addColorStop(1, '#0b1f4b');
    drawRoundedRect(badgeX + 8, badgeY + 8, badgeW - 16, badgeH - 16, 12, innerGrad);

    const topHighlight = ctx.createLinearGradient(badgeX + 14, badgeY + 14, badgeX + badgeW - 14, badgeY + 30);
    topHighlight.addColorStop(0, 'rgba(255,255,255,0.32)');
    topHighlight.addColorStop(1, 'rgba(255,255,255,0)');
    drawRoundedRect(badgeX + 14, badgeY + 14, badgeW - 28, 14, 7, topHighlight);

    const priceLabel = state.lang === 'fr' ? 'Prix' : 'Price';
    const labelText = priceLabel.toUpperCase();
    ctx.font = 'bold 16px Segoe UI';
    const labelW = Math.ceil(ctx.measureText(labelText).width) + 24;
    const labelH = 24;
    const labelX = badgeX + 12;
    const labelY = badgeY - 14;
    drawRoundedRect(labelX, labelY, labelW, labelH, 7, '#ffffff');
    drawRoundedRect(labelX + 2, labelY + 2, labelW - 4, labelH - 4, 6, '#0b1f4b');
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Segoe UI';
    ctx.fillText(labelText, labelX + 12, labelY + 18);

    ctx.fillStyle = theme.priceText;
    ctx.font = `bold ${symbolFontSize}px Segoe UI`;
    ctx.fillText(priceParts.symbol, badgeX + leftPad, badgeY + 74);

    const valueX = badgeX + leftPad + symbolWidth + symbolGap;
    const valueFitWidth = badgeW - (valueX - badgeX) - rightPad;
    const valueFitSize = fitText(priceParts.value, valueFitWidth, 'bold', valueFontSize, 24, 'Segoe UI');
    ctx.font = `bold ${valueFontSize}px Segoe UI`;
    ctx.font = `bold ${valueFitSize}px Segoe UI`;
    ctx.fillText(priceParts.value, valueX, badgeY + 72);
    registerDraggableRegion('price', badgeX, badgeY - 16, badgeW, badgeH + 20);
    registerRemovableElement(badgeX, badgeY - 16, badgeW, badgeH + 20, () => {
      state.sectionEnabled.price = false;
    });
  }

  drawCustomTextLayers();

  if (activeTextId) {
    showTextEditorForActiveLayer();
  } else {
    hideTextEditor();
  }

  drawSelectAllOverlay();
}

function setUiLanguage() {
  document.documentElement.lang = state.lang;
  document.body.classList.toggle('dark-theme', state.uiTheme === 'dark');
  document.getElementById('appTitle').textContent = t().appTitle;
  const tabDevice = document.getElementById('tabDevice');
  const tabCharger = document.getElementById('tabCharger');
  if (tabDevice && tabCharger) {
    tabDevice.textContent = t().labels.generatorDevice;
    tabCharger.textContent = t().labels.generatorCharger;
    tabDevice.classList.toggle('active', state.generator === 'device');
    tabCharger.classList.toggle('active', state.generator === 'charger');
  }
  if (!isGenerating) {
    document.getElementById('btnGeneratePng').textContent = t().generatePng;
    document.getElementById('btnGenerateJpg').textContent = t().generateJpg;
  }
  if (!isGenerating) {
    statusText.textContent = t().statusReady;
  }

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === state.lang);
  });
  const lightBtn = document.getElementById('themeLightBtn');
  const darkBtn = document.getElementById('themeDarkBtn');
  if (lightBtn && darkBtn) {
    lightBtn.classList.toggle('active', state.uiTheme === 'light');
    darkBtn.classList.toggle('active', state.uiTheme === 'dark');
  }
}

function exportImage(extension) {
  const offscreen = document.createElement('canvas');
  offscreen.width = 1000;
  offscreen.height = 1000;

  const offCtx = offscreen.getContext('2d');
  offCtx.fillStyle = '#eaf0f8';
  offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
  offCtx.imageSmoothingEnabled = true;
  offCtx.imageSmoothingQuality = 'high';

  const fitScale = Math.min(offscreen.width / canvas.width, offscreen.height / canvas.height);
  const drawW = Math.round(canvas.width * fitScale);
  const drawH = Math.round(canvas.height * fitScale);
  const dx = Math.round((offscreen.width - drawW) / 2);
  const dy = Math.round((offscreen.height - drawH) / 2);

  offCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, dx, dy, drawW, drawH);

  const mime = extension === 'jpg' ? 'image/jpeg' : 'image/png';
  return offscreen.toDataURL(mime, 0.95);
}

async function generateImage(extension) {
  if (isGenerating) {
    return;
  }
  if (!window.desktopApi?.saveImage) {
    statusText.textContent = 'Save API unavailable. Restart the app.';
    return;
  }
  setGeneratingState(true);
  try {
    const startedAt = Date.now();
    const dataUrl = exportImage(extension);
    const result = await window.desktopApi.saveImage({
      base64Data: dataUrl,
      extension,
      defaultFileName: `poster-${Date.now()}.${extension}`,
    });

    const elapsed = Date.now() - startedAt;
    const minLoaderMs = 520;
    if (elapsed < minLoaderMs) {
      await sleep(minLoaderMs - elapsed);
    }

    if (!result?.saved) {
      statusText.textContent = result?.error || t().statusCanceled;
      return;
    }

    if (!result.filePath) {
      statusText.textContent = t().statusCanceled;
      return;
    }

    statusText.textContent = t().statusSaved(result.filePath);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown export error.';
    statusText.textContent = `Export failed: ${message}`;
  } finally {
    setGeneratingState(false);
  }
}

function getCanvasPointer(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function pointInRect(point, rect) {
  if (!rect) {
    return false;
  }
  return point.x >= rect.x
    && point.x <= rect.x + rect.w
    && point.y >= rect.y
    && point.y <= rect.y + rect.h;
}

function findTopDraggableRegion(point) {
  for (let i = draggableRegions.length - 1; i >= 0; i -= 1) {
    const region = draggableRegions[i];
    if (pointInRect(point, region)) {
      return region;
    }
  }
  return null;
}

function findTopDeviceImageHandle(point) {
  for (let i = deviceImageHandles.length - 1; i >= 0; i -= 1) {
    const item = deviceImageHandles[i];
    if (item.handle && pointInRect(point, item.handle)) {
      return item;
    }
  }
  return null;
}

function findTopDeviceImageBody(point) {
  for (let i = deviceImageHandles.length - 1; i >= 0; i -= 1) {
    const item = deviceImageHandles[i];
    if (pointInRect(point, item.body)) {
      return item;
    }
  }
  return null;
}

canvas.addEventListener('mousedown', (event) => {
  const p = getCanvasPointer(event);
  const clickedTextLayer = findTopTextLayerAtPoint(p);
  if (clickedTextLayer && !isTextInsertMode) {
    activeTextId = clickedTextLayer.id;
    isDraggingText = true;
    draggingTextId = clickedTextLayer.id;
    textDragStart = { x: p.x, y: p.y, tx: clickedTextLayer.x, ty: clickedTextLayer.y };
    canvas.style.cursor = 'grabbing';
    drawPoster();
    event.preventDefault();
    return;
  }
  if (selectAllElementsMode) {
    for (let i = removeButtonRects.length - 1; i >= 0; i -= 1) {
      const btn = removeButtonRects[i];
      if (pointInRect(p, btn)) {
        pushUndoSnapshot();
        btn.onRemove();
        drawPoster();
        renderControls();
        event.preventDefault();
        return;
      }
    }
    selectAllElementsMode = false;
    drawPoster();
    event.preventDefault();
    return;
  }
  if (isTextInsertMode) {
    if (clickedTextLayer) {
      selectTextLayer(clickedTextLayer.id);
      event.preventDefault();
      return;
    }
    if (activeTextId) {
      clearTextSelection();
      event.preventDefault();
      return;
    }
    const textId = `txt-${textIdCounter++}`;
    state.customTexts.push({
      id: textId,
      x: p.x,
      y: p.y,
      text: '',
      size: 40,
      color: '#1f2733',
      bold: true,
      italic: false,
      underline: false,
      family: 'Segoe UI',
    });
    selectTextLayer(textId);
    textCaretVisible = true;
    event.preventDefault();
    return;
  }
  if (activeTextId && !clickedTextLayer) {
    clearTextSelection();
  }
  const logoHandleHit = pointInRect(p, logoResizeHandleRect);
  const logoBadgeHandleHit = pointInRect(p, logoBadgeResizeHandleRect);
  const logoBadgeHit = pointInRect(p, logoBadgeBodyRect);
  const logoBodyHit = pointInRect(p, logoImageBodyRect);
  const draggableHit = findTopDraggableRegion(p);
  const handleHit = findTopDeviceImageHandle(p);
  if (handleHit) {
    const layer = getCurrentInteractiveImages().find((img) => img.id === handleHit.id);
    if (layer) {
      setSelectedInteractiveImageId(layer.id);
      isResizingDeviceImage = true;
      resizingDeviceImageId = layer.id;
      deviceResizeStart = {
        x: p.x,
        y: p.y,
        w: layer.w,
        h: layer.h,
        ratio: layer.w / Math.max(1, layer.h),
      };
      canvas.style.cursor = 'nwse-resize';
      event.preventDefault();
      return;
    }
  }

  const imageHit = findTopDeviceImageBody(p);
  if (imageHit) {
    const layer = getCurrentInteractiveImages().find((img) => img.id === imageHit.id);
    if (layer) {
      setSelectedInteractiveImageId(layer.id);
      isDraggingDeviceImage = true;
      draggingDeviceImageId = layer.id;
      const box = state.generator === 'charger' ? getChargerImageBoxRect() : getDeviceImageBoxRect();
      deviceDragStart = { x: p.x, y: p.y, lx: layer.x, ly: layer.y, box };
      canvas.style.cursor = 'grabbing';
      drawPoster();
      event.preventDefault();
      return;
    }
  }

  const hadSelectedDeviceImage = !!getSelectedInteractiveImageId();
  const keepLogoSelected = logoHandleHit || logoBadgeHandleHit || logoBodyHit || logoBadgeHit || draggableHit?.key === 'logo';
  const shouldUnselectLogo = isLogoSelected && !keepLogoSelected;
  const shouldSelectLogo = !isLogoSelected && (logoBodyHit || logoHandleHit || logoBadgeHandleHit || logoBadgeHit);
  if (hadSelectedDeviceImage) {
    setSelectedInteractiveImageId(null);
  }
  if (shouldUnselectLogo) {
    isLogoSelected = false;
  } else if (shouldSelectLogo) {
    isLogoSelected = true;
  }
  if (hadSelectedDeviceImage || shouldUnselectLogo || shouldSelectLogo) {
    drawPoster();
  }

  if (!logoResizeHandleRect || !logoImageObj || !logoImageObj.complete) {
    if (logoBadgeHandleHit && logoBadgeResizeHandleRect) {
      isResizingLogoBadge = true;
      logoBadgeResizeStart = {
        x: p.x,
        y: p.y,
        w: Number(state.logoBadgeSize?.w) || 150,
        h: Number(state.logoBadgeSize?.h) || 150,
        minW: logoBadgeResizeHandleRect.minW || 120,
        minH: logoBadgeResizeHandleRect.minH || 116,
      };
      canvas.style.cursor = 'nwse-resize';
      event.preventDefault();
      return;
    }
    const hit = draggableHit;
    if (!hit) {
      return;
    }
    const current = getLayoutOffset(hit.key);
    activeDrag = {
      key: hit.key,
      startX: p.x,
      startY: p.y,
      baseX: current.x,
      baseY: current.y,
    };
    canvas.style.cursor = 'grabbing';
    event.preventDefault();
    return;
  }
  if (logoHandleHit) {
    isResizingLogo = true;
    logoResizeStart = {
      x: p.x,
      y: p.y,
      size: Number(state.logoSize) || 56,
      maxSize: logoResizeHandleRect.maxSize || 90,
    };
    event.preventDefault();
    return;
  }
  if (logoBadgeHandleHit && logoBadgeResizeHandleRect) {
    isResizingLogoBadge = true;
    logoBadgeResizeStart = {
      x: p.x,
      y: p.y,
      w: Number(state.logoBadgeSize?.w) || 150,
      h: Number(state.logoBadgeSize?.h) || 150,
      minW: logoBadgeResizeHandleRect.minW || 120,
      minH: logoBadgeResizeHandleRect.minH || 116,
    };
    canvas.style.cursor = 'nwse-resize';
    event.preventDefault();
    return;
  }
  const hit = draggableHit;
  if (!hit) {
    return;
  }
  const current = getLayoutOffset(hit.key);
  activeDrag = {
    key: hit.key,
    startX: p.x,
    startY: p.y,
    baseX: current.x,
    baseY: current.y,
  };
  canvas.style.cursor = 'grabbing';
  event.preventDefault();
});

canvas.addEventListener('mousemove', (event) => {
  const p = getCanvasPointer(event);
  if (isDraggingText && textDragStart) {
    const layer = getTextLayerById(draggingTextId);
    if (!layer) {
      return;
    }
    layer.x = textDragStart.tx + (p.x - textDragStart.x);
    layer.y = textDragStart.ty + (p.y - textDragStart.y);
    drawPoster();
    canvas.style.cursor = 'grabbing';
    return;
  }
  if (isTextInsertMode) {
    canvas.style.cursor = 'text';
    return;
  }

  if (isResizingDeviceImage && deviceResizeStart) {
    const layer = getCurrentInteractiveImages().find((img) => img.id === resizingDeviceImageId);
    if (!layer) {
      return;
    }
    const delta = Math.max(p.x - deviceResizeStart.x, p.y - deviceResizeStart.y);
    const nextW = Math.max(28, deviceResizeStart.w + delta);
    const nextH = Math.max(28, nextW / Math.max(0.1, deviceResizeStart.ratio));
    layer.w = nextW;
    layer.h = nextH;
    drawPoster();
    canvas.style.cursor = 'nwse-resize';
    return;
  }

  if (isDraggingDeviceImage && deviceDragStart) {
    const layer = getCurrentInteractiveImages().find((img) => img.id === draggingDeviceImageId);
    if (!layer) {
      return;
    }
    layer.x = deviceDragStart.lx + (p.x - deviceDragStart.x);
    layer.y = deviceDragStart.ly + (p.y - deviceDragStart.y);
    drawPoster();
    canvas.style.cursor = 'grabbing';
    return;
  }

  if (activeDrag) {
    const dx = p.x - activeDrag.startX;
    const dy = p.y - activeDrag.startY;
    setLayoutOffset(activeDrag.key, Math.round(activeDrag.baseX + dx), Math.round(activeDrag.baseY + dy));
    drawPoster();
    canvas.style.cursor = 'grabbing';
    return;
  }

  if (isResizingLogo && logoResizeStart) {
    const delta = Math.max(p.x - logoResizeStart.x, p.y - logoResizeStart.y);
    const nextSize = Math.max(24, Math.min(logoResizeStart.maxSize, logoResizeStart.size + delta));
    state.logoSize = String(Math.round(nextSize));
    drawPoster();
    canvas.style.cursor = 'nwse-resize';
    return;
  }

  if (isResizingLogoBadge && logoBadgeResizeStart) {
    const dx = p.x - logoBadgeResizeStart.x;
    const dy = p.y - logoBadgeResizeStart.y;
    const nextW = Math.max(logoBadgeResizeStart.minW, Math.round(logoBadgeResizeStart.w + dx));
    const nextH = Math.max(logoBadgeResizeStart.minH, Math.round(logoBadgeResizeStart.h + dy));
    state.logoBadgeSize = { w: nextW, h: nextH };
    drawPoster();
    canvas.style.cursor = 'nwse-resize';
    return;
  }

  if (pointInRect(p, logoResizeHandleRect)) {
    canvas.style.cursor = 'nwse-resize';
    return;
  }
  if (pointInRect(p, logoBadgeResizeHandleRect)) {
    canvas.style.cursor = 'nwse-resize';
    return;
  }
  if (findTopDeviceImageHandle(p)) {
    canvas.style.cursor = 'nwse-resize';
    return;
  }
  if (findTopDeviceImageBody(p)) {
    canvas.style.cursor = 'move';
    return;
  }
  const hit = findTopDraggableRegion(p);
  canvas.style.cursor = hit ? 'move' : 'default';
});

canvas.addEventListener('dblclick', (event) => {
  const p = getCanvasPointer(event);
  const clickedTextLayer = findTopTextLayerAtPoint(p);
  if (!clickedTextLayer) {
    return;
  }
  isTextInsertMode = true;
  statusText.textContent = 'Text mode: edit selected text.';
  startTextCaretBlink();
  selectTextLayer(clickedTextLayer.id);
  if (textEditorInput) {
    textEditorInput.focus();
    textEditorInput.select();
  }
  event.preventDefault();
});

window.addEventListener('mouseup', () => {
  isResizingDeviceImage = false;
  resizingDeviceImageId = null;
  deviceResizeStart = null;
  isDraggingDeviceImage = false;
  draggingDeviceImageId = null;
  deviceDragStart = null;
  isResizingLogo = false;
  logoResizeStart = null;
  isResizingLogoBadge = false;
  logoBadgeResizeStart = null;
  activeDrag = null;
  isDraggingText = false;
  draggingTextId = null;
  textDragStart = null;
  canvas.style.cursor = 'default';
});

window.addEventListener('keydown', (event) => {
  const typingInField = isTypingInFormField();

  if (!isTypingInFormField() && event.key.toLowerCase() === 't' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    isTextInsertMode = !isTextInsertMode;
    if (isTextInsertMode) {
      canvas.style.cursor = 'text';
      statusText.textContent = 'Text mode: click on poster and type.';
      startTextCaretBlink();
    } else {
      hideTextEditor();
      stopTextCaretBlink();
      canvas.style.cursor = 'default';
      statusText.textContent = t().statusReady;
    }
    drawPoster();
    return;
  }

  if (event.key === 'Escape' && isTextInsertMode) {
    isTextInsertMode = false;
    hideTextEditor();
    stopTextCaretBlink();
    canvas.style.cursor = 'default';
    statusText.textContent = t().statusReady;
    drawPoster();
    return;
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
    if (typingInField && !isTextInsertMode) {
      return;
    }
    event.preventDefault();
    const snapshot = undoStack.pop();
    if (snapshot) {
      restoreFromUndoSnapshot(snapshot);
      selectAllElementsMode = false;
      renderControls();
      drawPoster();
    }
    return;
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
    if (typingInField && !isTextInsertMode) {
      return;
    }
    event.preventDefault();
    selectAllElementsMode = !selectAllElementsMode;
    drawPoster();
    return;
  }
  if (event.key === 'Escape' && selectAllElementsMode) {
    selectAllElementsMode = false;
    drawPoster();
  }
});

document.addEventListener('mousedown', (event) => {
  const clickedEditor = !!(textEditorRoot && textEditorRoot.contains(event.target));
  if (!clickedEditor && event.target !== canvas && activeTextId) {
    activeTextId = null;
    hideTextEditor();
    drawPoster();
  }
  if (selectAllElementsMode && event.target !== canvas) {
    selectAllElementsMode = false;
    drawPoster();
  }
  if (!isLogoSelected) {
    return;
  }
  if (event.target === canvas) {
    return;
  }
  isLogoSelected = false;
  drawPoster();
});

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.lang = btn.dataset.lang;
    state.currency = state.lang === 'fr' ? 'EUR' : 'USD';
    state.titleTop = translatePosterTitleText(state.titleTop, state.lang);
    state.titleBottom = translatePosterTitleText(state.titleBottom, state.lang);
    state.chargerTitle = translateChargerTitleText(state.chargerTitle, state.lang);
    const usbCanonical = canonicalBinaryValue(state.usbSpec);
    if (usbCanonical) {
      state.usbSpec = state.lang === 'fr'
        ? (usbCanonical === 'yes' ? 'Oui' : 'Non')
        : (usbCanonical === 'yes' ? 'Yes' : 'No');
    }
    const wifiCanonical = canonicalBinaryValue(state.wifiSpec);
    if (wifiCanonical) {
      state.wifiSpec = state.lang === 'fr'
        ? (wifiCanonical === 'yes' ? 'Oui' : 'Non')
        : (wifiCanonical === 'yes' ? 'Yes' : 'No');
    }
    const keyboardCanonical = canonicalBinaryValue(state.keyboardBacklight);
    if (keyboardCanonical) {
      state.keyboardBacklight = keyboardCanonical === 'yes' ? 'Yes' : 'No';
    }
    setUiLanguage();
    renderControls();
    drawPoster();
  });
});

const themeLightBtn = document.getElementById('themeLightBtn');
const themeDarkBtn = document.getElementById('themeDarkBtn');
if (themeLightBtn && themeDarkBtn) {
  themeLightBtn.addEventListener('click', () => {
    if (state.uiTheme === 'light') {
      return;
    }
    state.uiTheme = 'light';
    setUiLanguage();
  });
  themeDarkBtn.addEventListener('click', () => {
    if (state.uiTheme === 'dark') {
      return;
    }
    state.uiTheme = 'dark';
    setUiLanguage();
  });
}

const tabDevice = document.getElementById('tabDevice');
const tabCharger = document.getElementById('tabCharger');
if (tabDevice && tabCharger) {
  tabDevice.addEventListener('click', () => {
    if (state.generator === 'device') {
      return;
    }
    state.generator = 'device';
    resetLayoutToDefault();
    setUiLanguage();
    renderControls();
    drawPoster();
  });
  tabCharger.addEventListener('click', () => {
    if (state.generator === 'charger') {
      return;
    }
    state.generator = 'charger';
    resetLayoutToDefault();
    setUiLanguage();
    renderControls();
    drawPoster();
  });
}

document.getElementById('btnGeneratePng').addEventListener('click', () => generateImage('png'));
document.getElementById('btnGenerateJpg').addEventListener('click', () => generateImage('jpg'));

resetLayoutToDefault();
setUiLanguage();
renderControls();
drawPoster();



