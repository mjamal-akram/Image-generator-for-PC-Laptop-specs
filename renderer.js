const DEFAULT_LAYOUT_OFFSETS = {
  os: { x: 14, y: 224 },
  storage: { x: -264, y: -2 },
  guarantee: { x: -122, y: 444 },
  logo: { x: 0, y: 8 },
  device: { x: 132, y: -44 },
  diffDevice: { x: 0, y: 0 },
  diffPointsText: { x: 0, y: 0 },
  diffReconditioned: { x: 0, y: 0 },
  tags: { x: 10, y: 8 },
  spec: { x: -4, y: 18 },
  brand: { x: 394, y: -884 },
  price: { x: -206, y: -208 },
  contact: { x: -215, y: 36 },
  diffHeader: { x: 0, y: 0 },
  diffPrice: { x: 0, y: 0 },
  diffLeftPromo: { x: 0, y: 0 },
  diffWarranty: { x: 0, y: 0 },
  diffEco: { x: 0, y: 0 },
  diffBottomBadges: { x: 0, y: 0 },
  chargerCompatibility: { x: 0, y: 0 },
};

const LAYOUT_PREFERENCES_STORAGE_KEY = 'jam_iw-layout-preferences-v5';
const DEFAULT_LAYOUT_STORAGE_KEY = 'jam_iw-default-layout-v1';
const DEFAULT_EXPORT_VARIANTS_STORAGE_KEY = 'jam_iw-default-export-layouts-v1';
const BRAND_LIBRARY_STORAGE_KEY = 'jam_iw-brand-library-v1';
const EXPORT_BASE_FOLDER_STORAGE_KEY = 'jam_iw-export-base-folder-v1';
const DEFAULT_LOGO_SIZE = 56;
const DEFAULT_LOGO_BADGE_SIZE = { w: 150, h: 150 };
const DEFAULT_STORAGE_BADGE_SIZE = { w: 340, h: 108 };
const DEFAULT_OS_BADGE_SIZE = { w: 126, h: 150 };
const DEFAULT_GUARANTEE_BADGE_SIZE = { w: 126, h: 150 };
const DEFAULT_STACK_BADGE_SIZE = { w: 126, h: 126 };
const DEFAULT_PC_IMAGE_SRC = 'assets/default-pc.png';
const DEFAULT_PC_IMAGE_CROP = { x: 0, y: 0, w: 600, h: 572 };
const DEFAULT_PC_IMAGE_ID = '__default_pc_image__';
const DEFAULT_PC_IMAGE_SIZE = { w: 500, h: 477 };
const DEFAULT_LAPTOP_IMAGE_SRC = 'assets/default-laptop.png';
const DEFAULT_LAPTOP_IMAGE_CROP = { x: 0, y: 0, w: 512, h: 488 };
const DEFAULT_LAPTOP_IMAGE_ID = '__default_laptop_image__';
const DEFAULT_LAPTOP_IMAGE_SIZE = { w: 510, h: 360 };
const DEFAULT_DIFF_BRAND_BOX_CROP = { left: 0, right: 0, top: 0, bottom: 0 };
const DEFAULT_DIFF_SIDE_GUARANTEE_SIZE = { w: 250, h: 250 };
const DEFAULT_DIFF_POINTS_TEXT_SIZE = { w: 250, h: 250 };
const DEFAULT_DIFF_RECONDITIONED_SIZE = { w: 215, h: 215 };
const GENERATOR_PRICE_TAG_SRC = 'assets/generator-price-tag.png';
const GENERATOR_PRICE_TAG_CROP = { x: 304, y: 1208, w: 3892, h: 2080 };
const GENERATOR_POINTS_TEXT_SRC = 'assets/generator-points-text.png';
const GENERATOR_RECONDITIONED_SRC = 'assets/generator-reconditioned.png';
const GENERATOR_BACKGROUND_SRC = 'assets/generator-bg.jpg';
const GENERATOR_BACKGROUND_PRESETS = {
  bg1: 'assets/generator-bg.jpg',
  bg2: 'assets/generator-bg-2.jpg',
  bg3: 'assets/generator-bg-3.jpg',
  bg4: 'assets/generator-bg-4.png',
};
const GENERATOR_GUARANTEE_PRESETS = {
  '1m': 'assets/generator-guarantee-1m.png',
  '3m': 'assets/generator-guarantee-3m.png',
  '6m': 'assets/generator-guarantee-6m.png',
  '12m': 'assets/generator-guarantee-12m.png',
};
const WALLPAPER_RESOLUTIONS = [
  { value: '1920x1080', label: 'Full HD 1920 x 1080' },
  { value: '2560x1440', label: 'QHD 2560 x 1440' },
  { value: '3840x2160', label: '4K UHD 3840 x 2160' },
];

function cloneDefaultLayoutOffsets() {
  return Object.fromEntries(
    Object.entries(DEFAULT_LAYOUT_OFFSETS).map(([key, value]) => [key, { x: value.x, y: value.y }])
  );
}

function normalizeBoxSize(value, fallback) {
  const width = Number(value?.w);
  const height = Number(value?.h);
  return {
    w: Number.isFinite(width) ? width : fallback.w,
    h: Number.isFinite(height) ? height : fallback.h,
  };
}

function normalizeBrandBoxCrop(value) {
  return {
    left: Math.max(0, Math.round(Number(value?.left) || 0)),
    right: Math.max(0, Math.round(Number(value?.right) || 0)),
    top: Math.max(0, Math.round(Number(value?.top) || 0)),
    bottom: Math.max(0, Math.round(Number(value?.bottom) || 0)),
  };
}

function deepCloneJsonValue(value) {
  if (value === undefined || value === null || typeof value !== 'object') {
    return value;
  }
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return undefined;
  }
}

function serializeSavedLayoutImageLayer(layer) {
  if (!layer?.dataUrl) {
    return null;
  }
  const x = Number(layer.x);
  const y = Number(layer.y);
  const w = Number(layer.w);
  const h = Number(layer.h);
  return {
    id: layer.id ?? null,
    dataUrl: layer.dataUrl,
    x: Number.isFinite(x) ? x : 0,
    y: Number.isFinite(y) ? y : 0,
    w: Number.isFinite(w) ? w : 0,
    h: Number.isFinite(h) ? h : 0,
  };
}

function serializeSavedLayoutImageLayers(layers) {
  return Array.isArray(layers)
    ? layers.map(serializeSavedLayoutImageLayer).filter(Boolean)
    : [];
}

function serializeSavedLayoutImageGroups(groups) {
  const snapshot = {};
  Object.entries(groups || {}).forEach(([key, layers]) => {
    snapshot[key] = serializeSavedLayoutImageLayers(layers);
  });
  return snapshot;
}

function hydrateSavedLayoutImageLayer(layer) {
  if (!layer?.dataUrl) {
    return null;
  }
  const imageObj = new Image();
  imageObj.onload = () => drawPoster();
  imageObj.src = layer.dataUrl;
  return {
    id: layer.id ?? null,
    dataUrl: layer.dataUrl,
    imageObj,
    x: Number.isFinite(Number(layer.x)) ? Number(layer.x) : 0,
    y: Number.isFinite(Number(layer.y)) ? Number(layer.y) : 0,
    w: Number.isFinite(Number(layer.w)) ? Number(layer.w) : 0,
    h: Number.isFinite(Number(layer.h)) ? Number(layer.h) : 0,
  };
}

function hydrateSavedLayoutImageLayers(layers) {
  return Array.isArray(layers)
    ? layers.map(hydrateSavedLayoutImageLayer).filter(Boolean)
    : [];
}

function hydrateSavedLayoutImageGroups(groups) {
  const restored = {
    PC: [],
    Laptop: [],
  };
  Object.entries(groups || {}).forEach(([key, layers]) => {
    restored[key] = hydrateSavedLayoutImageLayers(layers);
  });
  return restored;
}

function cloneDefaultStackBadgeSizes() {
  return {
    processor: { ...DEFAULT_STACK_BADGE_SIZE },
    screen: { ...DEFAULT_STACK_BADGE_SIZE },
    battery: { ...DEFAULT_STACK_BADGE_SIZE },
    storage: { ...DEFAULT_STACK_BADGE_SIZE },
    ram: { ...DEFAULT_STACK_BADGE_SIZE },
  };
}

function getStackBadgeSize(key) {
  const sizes = state.stackBadgeSizes || {};
  return normalizeBoxSize(sizes[key], DEFAULT_STACK_BADGE_SIZE);
}

function readSavedLayoutPreferences() {
  try {
    const raw = window.localStorage?.getItem(LAYOUT_PREFERENCES_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return {
      layoutOffsets: {
        ...cloneDefaultLayoutOffsets(),
        ...(parsed?.layoutOffsets || {}),
      },
      logoSize: Number.isFinite(Number(parsed?.logoSize)) ? Number(parsed.logoSize) : DEFAULT_LOGO_SIZE,
      logoBadgeSize: normalizeBoxSize(parsed?.logoBadgeSize, DEFAULT_LOGO_BADGE_SIZE),
      storageBadgeSize: normalizeBoxSize(parsed?.storageBadgeSize, DEFAULT_STORAGE_BADGE_SIZE),
      osBadgeSize: normalizeBoxSize(parsed?.osBadgeSize, DEFAULT_OS_BADGE_SIZE),
      guaranteeBadgeSize: normalizeBoxSize(parsed?.guaranteeBadgeSize, DEFAULT_GUARANTEE_BADGE_SIZE),
      defaultPcImageSize: normalizeBoxSize(parsed?.defaultPcImageSize, DEFAULT_PC_IMAGE_SIZE),
      defaultLaptopImageSize: normalizeBoxSize(parsed?.defaultLaptopImageSize, DEFAULT_LAPTOP_IMAGE_SIZE),
      diffBrandBoxCrop: normalizeBrandBoxCrop(parsed?.diffBrandBoxCrop),
      diffPointsTextSize: normalizeBoxSize(parsed?.diffPointsTextSize, DEFAULT_DIFF_POINTS_TEXT_SIZE),
      diffReconditionedSize: normalizeBoxSize(parsed?.diffReconditionedSize, DEFAULT_DIFF_RECONDITIONED_SIZE),
      stackBadgeSizes: parsed?.stackBadgeSizes || null,
      osBadgeSizeAdjusted: !!parsed?.osBadgeSizeAdjusted,
      guaranteeBadgeSizeAdjusted: !!parsed?.guaranteeBadgeSizeAdjusted,
    };
  } catch {
    return null;
  }
}

function persistLayoutPreferences() {
  if (exportDesignSession) {
    return;
  }
  try {
    window.localStorage?.setItem(
      LAYOUT_PREFERENCES_STORAGE_KEY,
      JSON.stringify({
        layoutOffsets: state.layoutOffsets,
        logoSize: state.logoSize,
        logoBadgeSize: state.logoBadgeSize,
        storageBadgeSize: state.storageBadgeSize,
        osBadgeSize: state.osBadgeSize,
        guaranteeBadgeSize: state.guaranteeBadgeSize,
        defaultPcImageSize: state.defaultPcImageSize,
        defaultLaptopImageSize: state.defaultLaptopImageSize,
        diffBrandBoxCrop: state.diffBrandBoxCrop,
        diffPointsTextSize: state.diffPointsTextSize,
        diffReconditionedSize: state.diffReconditionedSize,
        stackBadgeSizes: state.stackBadgeSizes,
        osBadgeSizeAdjusted: !!state.osBadgeSizeAdjusted,
        guaranteeBadgeSizeAdjusted: !!state.guaranteeBadgeSizeAdjusted,
      })
    );
  } catch {
    // Ignore storage failures and keep the editor usable.
  }
}

function syncUploadedAssetObjects() {
  if (state.chargerImageDataUrl) {
    chargerImageObj = new Image();
    chargerImageObj.onload = () => drawPoster();
    chargerImageObj.src = state.chargerImageDataUrl;
  } else if (Array.isArray(state.chargerImages) && state.chargerImages.length > 0) {
    chargerImageObj = state.chargerImages[state.chargerImages.length - 1].imageObj || null;
  } else {
    chargerImageObj = null;
  }

  if (state.logoImageDataUrl) {
    logoImageObj = new Image();
    logoImageObj.onload = () => drawPoster();
    logoImageObj.src = state.logoImageDataUrl;
  } else {
    logoImageObj = null;
  }
}

function createSavedDefaultLayoutSnapshot() {
  const snapshot = {};
  Object.entries(state).forEach(([key, value]) => {
    if (key === 'deviceImages' || key === 'chargerImages') {
      return;
    }
    const clonedValue = deepCloneJsonValue(value);
    if (clonedValue !== undefined) {
      snapshot[key] = clonedValue;
    }
  });
  snapshot.deviceImages = serializeSavedLayoutImageGroups(state.deviceImages);
  snapshot.chargerImages = serializeSavedLayoutImageLayers(state.chargerImages);
  return {
    version: 1,
    savedAt: Date.now(),
    state: snapshot,
  };
}

function readSavedDefaultLayout() {
  try {
    const raw = window.localStorage?.getItem(DEFAULT_LAYOUT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return parsed?.state ? parsed : null;
  } catch {
    return null;
  }
}

function persistSavedDefaultLayout() {
  try {
    window.localStorage?.setItem(
      DEFAULT_LAYOUT_STORAGE_KEY,
      JSON.stringify(createSavedDefaultLayoutSnapshot())
    );
    return true;
  } catch {
    return false;
  }
}

function normalizeSavedDesignSnapshot(snapshot) {
  const canvasWidth = Number(snapshot?.canvasWidth);
  const canvasHeight = Number(snapshot?.canvasHeight);
  const posterState = deepCloneJsonValue(snapshot?.posterState);
  if (!Number.isFinite(canvasWidth) || !Number.isFinite(canvasHeight) || !posterState) {
    return null;
  }
  return {
    canvasWidth,
    canvasHeight,
    posterState,
  };
}

function normalizeSavedExportVariants(variants) {
  const normalized = {};
  Object.entries(variants || {}).forEach(([key, value]) => {
    const snapshot = normalizeSavedDesignSnapshot(value);
    if (snapshot) {
      normalized[key] = snapshot;
    }
  });
  return normalized;
}

function readSavedDefaultExportVariants() {
  try {
    const raw = window.localStorage?.getItem(DEFAULT_EXPORT_VARIANTS_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return normalizeSavedExportVariants(parsed?.variants);
  } catch {
    return {};
  }
}

function persistSavedDefaultExportVariants() {
  try {
    window.localStorage?.setItem(
      DEFAULT_EXPORT_VARIANTS_STORAGE_KEY,
      JSON.stringify({ variants: defaultExportDesignVariants })
    );
    return true;
  } catch {
    return false;
  }
}

function readExportBaseFolder() {
  try {
    return String(window.localStorage?.getItem(EXPORT_BASE_FOLDER_STORAGE_KEY) || '').trim();
  } catch {
    return '';
  }
}

function persistExportBaseFolder(folderPath) {
  try {
    const normalizedPath = String(folderPath || '').trim();
    if (!normalizedPath) {
      window.localStorage?.removeItem(EXPORT_BASE_FOLDER_STORAGE_KEY);
      return true;
    }
    window.localStorage?.setItem(EXPORT_BASE_FOLDER_STORAGE_KEY, normalizedPath);
    return true;
  } catch {
    return false;
  }
}

function getAllBrandNames() {
  return brandLibrary
    .map((entry) => String(entry?.name || '').trim())
    .filter(Boolean);
}

async function syncAllBrandFolders(folderPath = exportBaseFolder) {
  const normalizedPath = String(folderPath || '').trim();
  if (!normalizedPath) {
    return { ok: true, skipped: true };
  }
  if (!window.desktopApi?.syncBrandFolders) {
    return { ok: false, error: 'Brand folder sync API unavailable. Restart the app.' };
  }
  return window.desktopApi.syncBrandFolders({
    baseFolderPath: normalizedPath,
    brandNames: getAllBrandNames(),
  });
}

function normalizeBrandEntry(entry) {
  const name = String(entry?.name || '').trim();
  if (!name) {
    return null;
  }
  return {
    name,
    layout: entry?.layout && typeof entry.layout === 'object' ? entry.layout : null,
    exportVariants: normalizeSavedExportVariants(entry?.exportVariants),
  };
}

function readBrandLibrary() {
  try {
    const raw = window.localStorage?.getItem(BRAND_LIBRARY_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    const seen = new Set();
    return Array.isArray(parsed?.brands)
      ? parsed.brands
        .map(normalizeBrandEntry)
        .filter((entry) => {
          if (!entry) {
            return false;
          }
          const key = entry.name.toLowerCase();
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        })
      : [];
  } catch {
    return [];
  }
}

function persistBrandLibrary() {
  try {
    window.localStorage?.setItem(
      BRAND_LIBRARY_STORAGE_KEY,
      JSON.stringify({ brands: brandLibrary })
    );
    return true;
  } catch {
    return false;
  }
}

function findBrandEntry(name) {
  const normalized = String(name || '').trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  return brandLibrary.find((entry) => entry.name.toLowerCase() === normalized) || null;
}

function getCurrentWorkspaceExportVariants() {
  if (activeBrandName) {
    let entry = findBrandEntry(activeBrandName);
    if (!entry) {
      entry = { name: activeBrandName, layout: null, exportVariants: {} };
      brandLibrary.push(entry);
    }
    if (!entry.exportVariants || typeof entry.exportVariants !== 'object') {
      entry.exportVariants = {};
    }
    return entry.exportVariants;
  }
  return defaultExportDesignVariants;
}

function getSavedExportDesignVariant(variantKey) {
  return deepCloneJsonValue(getCurrentWorkspaceExportVariants()[variantKey]) || null;
}

function persistCurrentWorkspaceExportVariants() {
  if (activeBrandName) {
    const saved = persistBrandLibrary();
    if (!saved) {
      brandLibrary = readBrandLibrary();
    }
    return saved;
  }
  const saved = persistSavedDefaultExportVariants();
  if (!saved) {
    defaultExportDesignVariants = readSavedDefaultExportVariants();
  }
  return saved;
}

function getResolutionParts(resolutionValue) {
  const [width, height] = String(resolutionValue || '').split('x').map((value) => Number(value));
  return {
    width: Number.isFinite(width) ? width : 1920,
    height: Number.isFinite(height) ? height : 1080,
  };
}

function getResolutionLabel(resolutionValue) {
  const matched = WALLPAPER_RESOLUTIONS.find((item) => item.value === resolutionValue);
  return matched?.label || String(resolutionValue || '1920x1080');
}

function getSelectedHigherResolutionValue() {
  return String(higherResolutionSelect?.value || resolutionSelect?.value || WALLPAPER_RESOLUTIONS[0]?.value || '1920x1080');
}

function formatExportTimestamp(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-') + '_' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('-');
}

function getGeneratedFileNameBase(resolutionValue = '', mode = 'current') {
  const stamp = formatExportTimestamp(new Date());
  if (mode === 'higher' && resolutionValue) {
    return `${stamp}_${resolutionValue}`;
  }
  if (mode === 'both-current') {
    return `${stamp}_current`;
  }
  if (mode === 'both-higher' && resolutionValue) {
    return `${stamp}_${resolutionValue}`;
  }
  return stamp;
}

function applySavedDefaultLayout(snapshot) {
  const savedState = snapshot?.state;
  if (!savedState || typeof savedState !== 'object') {
    return false;
  }

  const defaultSectionEnabled = deepCloneJsonValue(state.sectionEnabled) || {};
  const defaultSelectedDeviceImageIds = deepCloneJsonValue(state.selectedDeviceImageId) || {
    PC: null,
    Laptop: null,
  };

  Object.entries(savedState).forEach(([key, value]) => {
    if (key === 'deviceImages' || key === 'chargerImages') {
      return;
    }
    const clonedValue = deepCloneJsonValue(value);
    if (clonedValue !== undefined) {
      state[key] = clonedValue;
    }
  });

  state.generator = ['charger', 'diff'].includes(state.generator) ? state.generator : 'diff';
  state.type = state.type === 'Laptop' ? 'Laptop' : 'PC';
  state.layoutOffsets = {
    ...cloneDefaultLayoutOffsets(),
    ...(deepCloneJsonValue(savedState.layoutOffsets) || {}),
  };
  state.sectionEnabled = {
    ...defaultSectionEnabled,
    ...(deepCloneJsonValue(savedState.sectionEnabled) || {}),
  };
  state.selectedDeviceImageId = {
    ...defaultSelectedDeviceImageIds,
    ...(deepCloneJsonValue(savedState.selectedDeviceImageId) || {}),
  };
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffStorageLine1')) {
    state.diffStorageLine1 = [state.storageType || 'SSD', state.storageSize || '480 GB'].filter(Boolean).join(' ').trim();
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffStorageLine2')) {
    state.diffStorageLine2 = state.diffExtraStorageEnabled
      ? [state.diffExtraStorageType || 'HDD', state.diffExtraStorageSize || '1 TB'].filter(Boolean).join(' ').trim()
      : '';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffStorageLine3Enabled')) {
    state.diffStorageLine3Enabled = false;
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffStorageLine3')) {
    state.diffStorageLine3 = '';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffScreenLine1')) {
    state.diffScreenLine1 = String(state.screenSize || '15.6"').trim() || '15.6"';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffScreenLine2')) {
    state.diffScreenLine2 = 'Full HD';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffScreenLine3Enabled')) {
    state.diffScreenLine3Enabled = false;
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffScreenLine3')) {
    state.diffScreenLine3 = '';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffConnectivityLine1')) {
    state.diffConnectivityLine1 = 'Wi-Fi';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffConnectivityLine2')) {
    state.diffConnectivityLine2 = 'Bluetooth';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffConnectivityLine3Enabled')) {
    state.diffConnectivityLine3Enabled = false;
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffConnectivityLine3')) {
    state.diffConnectivityLine3 = '';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffGpuLine1')) {
    state.diffGpuLine1 = 'Nvidia';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffGpuLine2')) {
    state.diffGpuLine2 = 'GTX 1080';
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffGpuLine3Enabled')) {
    state.diffGpuLine3Enabled = false;
  }
  if (!Object.prototype.hasOwnProperty.call(savedState, 'diffGpuLine3')) {
    state.diffGpuLine3 = '';
  }
  state.deviceImages = hydrateSavedLayoutImageGroups(savedState.deviceImages);
  state.chargerImages = hydrateSavedLayoutImageLayers(savedState.chargerImages);
  state.logoSize = Number.isFinite(Number(state.logoSize)) ? Number(state.logoSize) : DEFAULT_LOGO_SIZE;
  state.logoBadgeSize = normalizeBoxSize(state.logoBadgeSize, DEFAULT_LOGO_BADGE_SIZE);
  state.storageBadgeSize = normalizeBoxSize(state.storageBadgeSize, DEFAULT_STORAGE_BADGE_SIZE);
  state.osBadgeSize = normalizeBoxSize(state.osBadgeSize, DEFAULT_OS_BADGE_SIZE);
  state.guaranteeBadgeSize = normalizeBoxSize(state.guaranteeBadgeSize, DEFAULT_GUARANTEE_BADGE_SIZE);
  state.defaultPcImageSize = normalizeBoxSize(state.defaultPcImageSize, DEFAULT_PC_IMAGE_SIZE);
  state.defaultLaptopImageSize = normalizeBoxSize(state.defaultLaptopImageSize, DEFAULT_LAPTOP_IMAGE_SIZE);
  state.diffBrandBoxCrop = normalizeBrandBoxCrop(state.diffBrandBoxCrop);
  state.diffPointsTextSize = normalizeBoxSize(state.diffPointsTextSize, DEFAULT_DIFF_POINTS_TEXT_SIZE);
  state.diffReconditionedSize = normalizeBoxSize(state.diffReconditionedSize, DEFAULT_DIFF_RECONDITIONED_SIZE);
  const savedStackBadgeSizes = deepCloneJsonValue(savedState.stackBadgeSizes) || {};
  state.stackBadgeSizes = {
    processor: normalizeBoxSize(savedStackBadgeSizes.processor, DEFAULT_STACK_BADGE_SIZE),
    screen: normalizeBoxSize(savedStackBadgeSizes.screen, DEFAULT_STACK_BADGE_SIZE),
    battery: normalizeBoxSize(savedStackBadgeSizes.battery, DEFAULT_STACK_BADGE_SIZE),
    storage: normalizeBoxSize(savedStackBadgeSizes.storage, DEFAULT_STACK_BADGE_SIZE),
    ram: normalizeBoxSize(savedStackBadgeSizes.ram, DEFAULT_STACK_BADGE_SIZE),
  };
  state.osBadgeSizeAdjusted = !!state.osBadgeSizeAdjusted;
  state.guaranteeBadgeSizeAdjusted = !!state.guaranteeBadgeSizeAdjusted;

  syncUploadedAssetObjects();
  loadGeneratorBackgroundImage();
  loadGeneratorPriceTagImage();
  loadGeneratorPointsTextImage();
  loadGeneratorReconditionedImage();
  loadSelectedDiffGuaranteeImage();
  persistLayoutPreferences();
  return true;
}

function resetLayoutToDefault() {
  const saved = readSavedLayoutPreferences();
  state.layoutOffsets = saved?.layoutOffsets || cloneDefaultLayoutOffsets();
  state.logoSize = saved?.logoSize || DEFAULT_LOGO_SIZE;
  state.logoBadgeSize = saved?.logoBadgeSize || { ...DEFAULT_LOGO_BADGE_SIZE };
  state.storageBadgeSize = saved?.storageBadgeSize || { ...DEFAULT_STORAGE_BADGE_SIZE };
  state.osBadgeSize = saved?.osBadgeSize || { ...DEFAULT_OS_BADGE_SIZE };
  state.guaranteeBadgeSize = saved?.guaranteeBadgeSize || { ...DEFAULT_GUARANTEE_BADGE_SIZE };
  state.defaultPcImageSize = saved?.defaultPcImageSize || { ...DEFAULT_PC_IMAGE_SIZE };
  state.defaultLaptopImageSize = saved?.defaultLaptopImageSize || { ...DEFAULT_LAPTOP_IMAGE_SIZE };
  state.diffBrandBoxCrop = saved?.diffBrandBoxCrop || { ...DEFAULT_DIFF_BRAND_BOX_CROP };
  state.diffPointsTextSize = saved?.diffPointsTextSize || { ...DEFAULT_DIFF_POINTS_TEXT_SIZE };
  state.diffReconditionedSize = saved?.diffReconditionedSize || { ...DEFAULT_DIFF_RECONDITIONED_SIZE };
  state.stackBadgeSizes = saved?.stackBadgeSizes || cloneDefaultStackBadgeSizes();
  state.osBadgeSizeAdjusted = !!saved?.osBadgeSizeAdjusted;
  state.guaranteeBadgeSizeAdjusted = !!saved?.guaranteeBadgeSizeAdjusted;
  state.sectionEnabled.titleBadge = true;
  state.sectionEnabled.os = true;
  state.sectionEnabled.storage = true;
  state.sectionEnabled.connectivity = true;
  state.sectionEnabled.gpu = false;
  state.sectionEnabled.processor = true;
  state.sectionEnabled.screen = true;
  state.sectionEnabled.specifications = true;
  state.sectionEnabled.battery = true;
  state.sectionEnabled.guarantee = true;
  state.sectionEnabled.pointsText = true;
  state.sectionEnabled.reconditioned = true;
  state.sectionEnabled.price = true;
  state.sectionEnabled.contact = true;
  state.sectionEnabled.badges = true;
  state.sectionEnabled.diffFormat = true;
  state.sectionEnabled.diffLeftPromo = true;
  state.showIntelBadge = true;
  state.showScreenBadge = true;
  state.showBatteryBadge = true;
  state.showStorageBadge = true;
  state.showRamBadge = true;
  state.showGuaranteeBadge = true;
}

const state = {
  generator: 'diff',
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
  diffStorageLine1: 'SSD 480 GB',
  diffStorageLine2: '',
  diffStorageLine3Enabled: false,
  diffStorageLine3: '',
  diffScreenLine1: '15.6"',
  diffScreenLine2: 'Full HD',
  diffScreenLine3Enabled: false,
  diffScreenLine3: '',
  diffConnectivityLine1: 'Wi-Fi',
  diffConnectivityLine2: 'Bluetooth',
  diffConnectivityLine3Enabled: false,
  diffConnectivityLine3: '',
  diffGpuLine1: 'Nvidia',
  diffGpuLine2: 'GTX 1080',
  diffGpuLine3Enabled: false,
  diffGpuLine3: '',
  diffExtraStorageEnabled: false,
  diffExtraStorageType: 'HDD',
  diffExtraStorageSize: '1 TB',
  diffProcessorBadgeColor: '#1b9fea',
  diffRamBadgeColor: '#65c3c5',
  diffStorageBadgeColor: '#f2c246',
  diffScreenBadgeColor: '#57b7cf',
  diffConnectivityBadgeColor: '#5b86d8',
  diffGpuBadgeColor: '#63b746',
  diffExtraStorageBadgeColor: '#8a98ab',
  diffOsBadgeColor: '#1d9be4',
  titleTop: 'ENTER TEXT HERE',
  titleBottom: '',
  brand: 'Dell',
  processor: 'Core i5 2300 U 8th Generation',
  processorCore: 'Core i5',
  processorGeneration: '8th Generation',
  processorNumber: '2300 U',
  processorSpeed: '2.2 GHz',
  brandFontSize: 36,
  screenSize: '16"',
  usbSpec: 'Yes',
  wifiSpec: 'Yes',
  batteryPercentage: '85',
  guaranteeText: 'YOUR TEXT HERE',
  guaranteePeriod: '12 Months',
  specCards: [
    {
      title: 'Specifications',
      rows: [],
    },
    {
      title: 'Connectivity',
      rows: [],
    },
    {
      title: 'Power',
      rows: [],
    },
  ],
  contactItems: [],
  diffBrandText: 'DELL',
  diffBrandFontSize: 54,
  diffBrandBold: true,
  diffBrandItalic: false,
  diffBrandUnderline: false,
  diffBrandColor: '#ffffff',
  diffBrandBgColor: '#1471bf',
  diffBrandBoxCropEnabled: false,
  diffBrandBoxCrop: { ...DEFAULT_DIFF_BRAND_BOX_CROP },
  diffBackgroundSelection: 'bg1',
  diffBackgroundUploadDataUrl: '',
  diffPointsTextUploadDataUrl: '',
  diffPointsTextRotation: 0,
  diffPointsTextSize: { ...DEFAULT_DIFF_POINTS_TEXT_SIZE },
  diffReconditionedUploadDataUrl: '',
  diffReconditionedRotation: 0,
  diffReconditionedSize: { ...DEFAULT_DIFF_RECONDITIONED_SIZE },
  diffGuaranteeSelection: '1m',
  diffGuaranteeUploadDataUrl: '',
  chargerTitle: 'FAST CHARGER',
  chargerType: 'USB-C Charger',
  chargerPower: '65W',
  chargerVoltage: '20V',
  chargerAmpere: '3.25A',
  chargerCondition: 'New',
  chargerCompatibility: 'Dell Latitude 5490',
  price: '',
  oldPrice: '',
  priceRotation: 0,
  diffOldPrice: '',
  diffModelTitle: 'LATITUDE 5400',
  diffModelFontSize: 62,
  diffModelBold: false,
  diffModelItalic: false,
  diffModelUnderline: false,
  diffModelColor: '#1471bf',
  diffPromoLead: 'TESTE SUR',
  diffPromoValue: '20 POINTS',
  diffPromoTail: 'DE CONTROLE',
  diffPromoBadge: 'REFURBISHED IN FRANCE',
  diffPromoTextColor: '#171717',
  diffPromoValueColor: '#4dbb35',
  diffPromoFontSize: 28,
  diffPromoBold: false,
  diffPromoItalic: false,
  diffPromoUnderline: false,
  diffWarrantyNumber: '1',
  diffWarrantyUnit: 'YEAR',
  diffWarrantyTitle: 'GUARANTEE',
  diffWarrantySubtitle: 'Parts and Labor',
  diffEcoLead: 'COMMITTED TO',
  diffEcoHighlight: 'THE ENVIRONMENT',
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
  logoSize: DEFAULT_LOGO_SIZE,
  logoBadgeSize: { ...DEFAULT_LOGO_BADGE_SIZE },
  storageBadgeSize: { ...DEFAULT_STORAGE_BADGE_SIZE },
  osBadgeSize: { ...DEFAULT_OS_BADGE_SIZE },
  guaranteeBadgeSize: { ...DEFAULT_GUARANTEE_BADGE_SIZE },
  defaultPcImageSize: { ...DEFAULT_PC_IMAGE_SIZE },
  defaultLaptopImageSize: { ...DEFAULT_LAPTOP_IMAGE_SIZE },
  stackBadgeSizes: cloneDefaultStackBadgeSizes(),
  osBadgeSizeAdjusted: false,
  guaranteeBadgeSizeAdjusted: false,
  showLogoBadge: true,
  customThemeColors: {},
  customTexts: [],
  layoutOffsets: cloneDefaultLayoutOffsets(),
  sectionEnabled: {
    type: true,
    image: true,
    logo: true,
    pointsText: true,
    reconditioned: true,
    charger: true,
    titleBadge: true,
    os: true,
    ram: true,
    keyboard: true,
    storage: true,
    connectivity: true,
    gpu: false,
    brand: true,
    processor: true,
    screen: true,
    specifications: true,
    battery: true,
    guarantee: true,
    price: true,
    contact: true,
    badges: true,
    diffFormat: true,
    diffLeftPromo: true,
  },
};

const i18n = {
  en: {
    appTitle: 'Jam_iw Softwares',
    generatePng: 'Generate PNG',
    generateJpg: 'Generate JPG',
    saveLayout: 'Save Layout',
    higherResolution: 'Higher Resolution',
    chooseRatio: 'Choose Aspect Ratio',
    ratioHelp: 'Select a ratio before generating the image.',
    cancel: 'Cancel',
    continue: 'Continue',
    sections: {
      generator: 'Generator',
      theme: 'Theme',
      colors: 'Colors',
      titleBadge: 'Title Badge Text',
      type: 'Device Type',
      image: 'Device Image',
      chargerImage: 'Charger Image',
      logo: 'Logo',
      pointsText: 'Points Text',
      reconditioned: 'PC Reconditionne',
      screen: 'Screen',
      connectivity: 'Connectivity',
      gpu: 'Graphic Card',
      os: 'Operating System',
      ram: 'RAM',
      keyboard: 'Keyboard Backlight',
      storage: 'Storage',
      brand: 'Brand Name',
      processor: 'Processor Details',
      battery: 'Battery',
      specifications: 'Specifications',
      guarantee: 'Guarantee',
      background: 'Background',
      price: 'Price',
      contact: 'Contact',
      badges: 'Badge Visibility',
      diffFormat: 'Title Text',
    },
    labels: {
      generatorDevice: 'PC/Laptop',
      generatorCharger: 'Charger',
      generatorDiff: 'Generator',
      generatorBrands: 'Brands',
      brandsAdd: 'Add',
      brandsNamePlaceholder: 'Brand name',
      brandsEmpty: 'No brands added yet.',
      brandsClose: 'Close',
      brandsEdit: 'Edit',
      brandsDelete: 'Delete',
      brandsConfirmDelete: 'Confirm',
      brandsSave: 'Save',
      brandsCancel: 'Cancel',
      storageType: 'Drive Type',
      storageLine1: 'Storage Line 1',
      storageLine1Hint: 'Example: SSD 480 GB',
      storageLine2: 'Storage Line 2',
      storageLine2Hint: 'Example: HDD 1 TB or NVMe 512 GB',
      storageLine3Toggle: 'Add Third Storage Line',
      storageLine3: 'Storage Line 3',
      storageLine3Hint: 'Example: Health: 100%',
      screenLine1: 'Screen Line 1',
      screenLine1Hint: 'Example: 15.6"',
      screenLine2: 'Screen Line 2',
      screenLine2Hint: 'Example: Full HD',
      screenLine3Toggle: 'Add Third Screen Line',
      screenLine3: 'Screen Line 3',
      screenLine3Hint: 'Example: IPS',
      connectivityLine1: 'Connectivity Line 1',
      connectivityLine1Hint: 'Example: Wi-Fi',
      connectivityLine2: 'Connectivity Line 2',
      connectivityLine2Hint: 'Example: Bluetooth',
      connectivityLine3Toggle: 'Add Third Connectivity Line',
      connectivityLine3: 'Connectivity Line 3',
      connectivityLine3Hint: 'Example: 4G',
      gpuLine1: 'GPU Line 1',
      gpuLine1Hint: 'Example: Nvidia',
      gpuLine2: 'GPU Line 2',
      gpuLine2Hint: 'Example: GTX 1080',
      gpuLine3Toggle: 'Add Third GPU Line',
      gpuLine3: 'GPU Line 3',
      gpuLine3Hint: 'Example: 8 GB',
      titleTop: 'Top Title Text',
      titleTopHint: 'Example: SSD',
      titleBottom: 'Bottom Title Text',
      titleBottomHint: 'Example: HARD DRIVE',
      storageTypeCustom: 'Custom Drive Type',
      storageTypeHint: 'Type custom value (example: NVMe)',
      storageSize: 'Capacity',
      storageCustom: 'Custom Capacity',
      storageHint: 'Type custom value (example: 750 GB)',
      extraStorageToggle: 'Add Additional Storage Badge',
      extraStorageType: 'Additional Badge Type',
      extraStorageTypeHint: 'Example: HDD or NVMe',
      extraStorageSize: 'Additional Badge Capacity',
      extraStorageSizeHint: 'Example: 1 TB',
      badgeColor: 'Badge Color',
      extraBadgeColor: 'Additional Badge Color',
      brand: 'Brand',
      processor: 'Processor',
      processorBadgeText: 'Processor Badge Text',
      processorBadgeHint: 'Example: Core i5 2300 U 2.2 GHz',
      processorBadgePrimary: 'Processor Badge Line 1',
      processorBadgePrimaryHint: 'Example: Core i5',
      processorBadgeSecondary: 'Processor Badge Line 2',
      processorBadgeSecondaryHint: 'Example: 2300 U',
      processorBadgeTertiary: 'Processor Badge Line 3',
      processorBadgeTertiaryHint: 'Example: 8th Generation',
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
      batteryPercentage: 'Battery Text',
      batteryPercentageHint: 'Example: 85% or Good',
      cardTitle: 'Title',
      cardTitleHint: 'Example: Specifications',
      specLeft: 'Left Text',
      specLeftHint: 'Example: USB',
      specRight: 'Right Text',
      specRightHint: 'Example: Yes',
      specLine: 'Text Line',
      specLineHint: 'Example: USB WiFi LAN WAN',
      addSpecCard: 'Add Section',
      removeSpecCard: 'Remove Section',
      addSpecRow: 'Add Line',
      removeSpecRow: 'Remove Row',
      guaranteeText: 'Guarantee Box Text',
      guaranteeTextHint: 'Example: Original Product',
      guaranteePeriod: 'Guarantee Period',
      guaranteePeriodHint: 'Example: 12 Months of Guarantee',
      price: 'Price',
      oldPrice: 'Down Price',
      oldPriceHint: 'Example: 250',
      currency: 'Currency',
      priceHint: 'Typeable value (example: $99.99)',
      priceTagColor: 'Price Tag Color',
      generatorBg1: 'Background 1',
      generatorBg2: 'Background 2',
      generatorBg3: 'Background 3',
      generatorBg4: 'Background 4',
      generatorBgUpload: 'Uploaded',
      uploadBackground: 'Upload Background',
      clearUploadedBackground: 'Clear Uploaded Background',
      backgroundHint: 'Choose a preset background or upload your own for the Generator tab.',
      generatorGuarantee1m: '1 Month',
      generatorGuarantee3m: '3 Months',
      generatorGuarantee6m: '6 Months',
      generatorGuarantee12m: '12 Months',
      generatorGuaranteeUpload: 'Uploaded',
      uploadGuarantee: 'Upload Guarantee Image',
      clearUploadedGuarantee: 'Clear Uploaded Guarantee',
      guaranteeImageHint: 'Choose a guarantee preset or upload your own image. The selected badge stays draggable and resizable on the preview.',
      contactType: 'Contact Type',
      contactValue: 'Contact Text',
      contactValueHint: 'Example: +1 234 567 890',
      addContactRow: 'Add Contact Field',
      removeContactRow: 'Remove Field',
      contactPhone: 'Phone',
      contactEmail: 'Email',
      contactWebsite: 'Website',
      contactAddress: 'Address',
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
      uploadPointsText: 'Upload Points Text Design',
      clearUploadedPointsText: 'Use Default Points Text',
      pointsTextRotation: 'Rotation',
      pointsTextHint: 'Upload your own points-text design. Drag on the preview to move it, drag the corner to resize it, and use the slider to rotate it.',
      uploadReconditioned: 'Upload PC Reconditionne Design',
      clearUploadedReconditioned: 'Use Default PC Reconditionne',
      reconditionedRotation: 'Rotation',
      reconditionedHint: 'Upload your own PC reconditionne design. Drag on the preview to move it, drag the corner to resize it, and use the slider to rotate it.',
      priceTagRotation: 'Rotation',
      showIntelBadge: 'Processor Badge',
      showScreenBadge: 'Screen Badge',
      showBatteryBadge: 'Battery Badge',
      showStorageBadge: 'Storage Badge',
      showRamBadge: 'RAM Badge',
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
      diffBrandText: 'Company Text',
      diffBrandTextHint: 'Example: Dell',
      diffModelTitle: 'Other Text',
      diffModelTitleHint: 'Example: Latitude 5400',
      textBold: 'Bold',
      textItalic: 'Italic',
      textUnderline: 'Underline',
      textSize: 'Text Size',
      textColor: 'Text Color',
      backgroundColor: 'Background Color',
      backgroundCropMode: 'Enable Background Box Crop',
      backgroundCropModeHint: 'Click the company box on the preview, then drag any side handle to crop the background box.',
      diffPromoLead: 'Left Promo Line 1',
      diffPromoLeadHint: 'Example: TESTED ON',
      diffPromoValue: 'Left Promo Highlight',
      diffPromoValueHint: 'Example: 50',
      diffPromoTail: 'Left Promo Line 2',
      diffPromoTailHint: 'Example: POINTS OF CONTROL',
      diffPromoSection: 'Control Text',
      diffPromoTextColor: 'Text Color',
      diffPromoValueColor: 'Highlight Color',
      diffPromoBadge: 'Left Promo Badge',
      diffPromoBadgeHint: 'Example: REFURBISHED IN FRANCE',
      diffWarrantyNumber: 'Warranty Number',
      diffWarrantyNumberHint: 'Example: 1',
      diffWarrantyUnit: 'Warranty Unit',
      diffWarrantyUnitHint: 'Example: YEAR',
      diffWarrantyTitle: 'Warranty Title',
      diffWarrantyTitleHint: 'Example: GUARANTEE',
      diffWarrantySubtitle: 'Warranty Subtitle',
      diffWarrantySubtitleHint: 'Example: Parts and Labor',
      diffEcoLead: 'Eco Line 1',
      diffEcoLeadHint: 'Example: COMMITTED TO',
      diffEcoHighlight: 'Eco Line 2',
      diffEcoHighlightHint: 'Example: THE ENVIRONMENT',
      diffOldPrice: 'Old Price',
      diffOldPriceHint: 'Example: 899',
    },
    statusReady: 'Ready to generate.',
    statusGenerating: 'Generating image...',
    statusCanceled: 'Export canceled.',
    statusLayoutSaved: 'Default layout saved.',
    statusLayoutSaveFailed: 'Could not save the default layout.',
    statusBrandAdded: (name) => `Brand added: ${name}`,
    statusBrandExists: (name) => `Brand already exists: ${name}`,
    statusBrandNameRequired: 'Enter a brand name.',
    statusBrandOpened: (name) => `Brand opened: ${name}`,
    statusBrandLayoutSaved: (name) => `Layout saved for ${name}.`,
    statusBrandLayoutSaveFailed: (name) => `Could not save the layout for ${name}.`,
    statusHigherResolutionLayoutSaved: (size) => `Higher-resolution layout saved for ${size}.`,
    statusHigherResolutionLayoutSaveFailed: (size) => `Could not save the higher-resolution layout for ${size}.`,
    statusHigherResolutionNeeded: (size) => `Save the higher-resolution layout for ${size} first, then generate it.`,
    statusChooseExportFolder: 'Choose an export folder first.',
    statusExportFolderSaved: (path) => `Brand export folder set: ${path}`,
    statusSavedMultiple: (folder) => `Images saved in: ${folder}`,
    statusBrandRenamed: (name) => `Brand updated: ${name}`,
    statusBrandDeleted: (name) => `Brand deleted: ${name}`,
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
    saveLayout: 'Enregistrer La Mise En Page',
    higherResolution: 'Haute Resolution',
    chooseRatio: 'Choisir Le Format',
    ratioHelp: 'Selectionnez un ratio avant de generer limage.',
    cancel: 'Annuler',
    continue: 'Continuer',
    sections: {
      generator: 'Generateur',
      theme: 'Theme',
      colors: 'Couleurs',
      titleBadge: 'Texte Du Badge Titre',
      type: 'Type D Appareil',
      image: 'Image Appareil',
      chargerImage: 'Image Chargeur',
      logo: 'Logo',
      pointsText: 'Texte Points',
      reconditioned: 'PC Reconditionne',
      screen: 'Ecran',
      connectivity: 'Connectivite',
      gpu: 'Carte Graphique',
      os: 'Systeme D Exploitation',
      ram: 'RAM',
      keyboard: 'Retroeclairage Clavier',
      storage: 'Stockage',
      brand: 'Marque',
      processor: 'Details Processeur',
      battery: 'Batterie',
      specifications: 'Caracteristiques',
      guarantee: 'Garantie',
      background: 'Arriere-plan',
      price: 'Prix',
      contact: 'Contact',
      badges: 'Visibilite Des Badges',
      diffFormat: 'Texte Titre',
    },
    labels: {
      generatorDevice: 'PC/Portable',
      generatorCharger: 'Chargeur',
      generatorDiff: 'Generateur',
      generatorBrands: 'Marques',
      brandsAdd: 'Ajouter',
      brandsNamePlaceholder: 'Nom de la marque',
      brandsEmpty: 'Aucune marque ajoutee pour le moment.',
      brandsClose: 'Fermer',
      brandsEdit: 'Modifier',
      brandsDelete: 'Supprimer',
      brandsConfirmDelete: 'Confirmer',
      brandsSave: 'Enregistrer',
      brandsCancel: 'Annuler',
      storageType: 'Type De Disque',
      storageLine1: 'Ligne Stockage 1',
      storageLine1Hint: 'Exemple: SSD 480 GO',
      storageLine2: 'Ligne Stockage 2',
      storageLine2Hint: 'Exemple: HDD 1 TO ou NVMe 512 GO',
      storageLine3Toggle: 'Ajouter Une 3e Ligne Stockage',
      storageLine3: 'Ligne Stockage 3',
      storageLine3Hint: 'Exemple: Etat: 100%',
      screenLine1: 'Ligne Ecran 1',
      screenLine1Hint: 'Exemple: 15.6"',
      screenLine2: 'Ligne Ecran 2',
      screenLine2Hint: 'Exemple: Full HD',
      screenLine3Toggle: 'Ajouter Une 3e Ligne Ecran',
      screenLine3: 'Ligne Ecran 3',
      screenLine3Hint: 'Exemple: IPS',
      connectivityLine1: 'Ligne Connectivite 1',
      connectivityLine1Hint: 'Exemple: Wi-Fi',
      connectivityLine2: 'Ligne Connectivite 2',
      connectivityLine2Hint: 'Exemple: Bluetooth',
      connectivityLine3Toggle: 'Ajouter Une 3e Ligne Connectivite',
      connectivityLine3: 'Ligne Connectivite 3',
      connectivityLine3Hint: 'Exemple: 4G',
      gpuLine1: 'Ligne GPU 1',
      gpuLine1Hint: 'Exemple: Nvidia',
      gpuLine2: 'Ligne GPU 2',
      gpuLine2Hint: 'Exemple: GTX 1080',
      gpuLine3Toggle: 'Ajouter Une 3e Ligne GPU',
      gpuLine3: 'Ligne GPU 3',
      gpuLine3Hint: 'Exemple: 8 GO',
      titleTop: 'Texte Titre Haut',
      titleTopHint: 'Exemple: SSD',
      titleBottom: 'Texte Titre Bas',
      titleBottomHint: 'Exemple: DISQUE DUR',
      storageTypeCustom: 'Type De Disque Personnalise',
      storageTypeHint: 'Saisir une valeur (exemple: NVMe)',
      storageSize: 'Capacite',
      storageCustom: 'Capacite Personnalisee',
      storageHint: 'Saisir une valeur (exemple: 750 GB)',
      extraStorageToggle: 'Ajouter Un Badge Stockage Supplementaire',
      extraStorageType: 'Type Badge Supplementaire',
      extraStorageTypeHint: 'Exemple: HDD ou NVMe',
      extraStorageSize: 'Capacite Badge Supplementaire',
      extraStorageSizeHint: 'Exemple: 1 TB',
      badgeColor: 'Couleur Badge',
      extraBadgeColor: 'Couleur Badge Supplementaire',
      brand: 'Marque',
      processor: 'Processeur',
      processorBadgeText: 'Texte Badge Processeur',
      processorBadgeHint: 'Exemple: Core i5 2300 U 2.2 GHz',
      processorBadgePrimary: 'Badge Processeur Ligne 1',
      processorBadgePrimaryHint: 'Exemple: Core i5',
      processorBadgeSecondary: 'Badge Processeur Ligne 2',
      processorBadgeSecondaryHint: 'Exemple: 2300 U',
      processorBadgeTertiary: 'Badge Processeur Ligne 3',
      processorBadgeTertiaryHint: 'Exemple: 8th Generation',
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
      batteryPercentage: 'Texte Batterie',
      batteryPercentageHint: 'Exemple: 85% ou Bon',
      cardTitle: 'Titre',
      cardTitleHint: 'Exemple: Caracteristiques',
      specLeft: 'Texte Gauche',
      specLeftHint: 'Exemple: USB',
      specRight: 'Texte Droite',
      specRightHint: 'Exemple: Oui',
      specLine: 'Ligne De Texte',
      specLineHint: 'Exemple: USB WiFi LAN WAN',
      addSpecCard: 'Ajouter Une Section',
      removeSpecCard: 'Supprimer Section',
      addSpecRow: 'Ajouter Une Ligne',
      removeSpecRow: 'Supprimer Ligne',
      guaranteeText: 'Texte Dans Le Badge Garantie',
      guaranteeTextHint: 'Exemple: Produit Original',
      guaranteePeriod: 'Periode Garantie',
      guaranteePeriodHint: 'Exemple: 12 Mois De Garantie',
      price: 'Prix',
      oldPrice: 'Prix Barre',
      oldPriceHint: 'Exemple: 250',
      currency: 'Devise',
      priceHint: 'Valeur a saisir (exemple: 99.99€)',
      priceTagColor: 'Couleur Etiquette Prix',
      generatorBg1: 'Fond 1',
      generatorBg2: 'Fond 2',
      generatorBg3: 'Fond 3',
      generatorBg4: 'Fond 4',
      generatorBgUpload: 'Importe',
      uploadBackground: 'Telecharger Arriere-plan',
      clearUploadedBackground: 'Supprimer Arriere-plan Importe',
      backgroundHint: 'Choisissez un fond predefini ou importez votre propre fond pour le Generateur.',
      generatorGuarantee1m: '1 Mois',
      generatorGuarantee3m: '3 Mois',
      generatorGuarantee6m: '6 Mois',
      generatorGuarantee12m: '12 Mois',
      generatorGuaranteeUpload: 'Importe',
      uploadGuarantee: 'Telecharger Image Garantie',
      clearUploadedGuarantee: 'Supprimer Garantie Importee',
      guaranteeImageHint: 'Choisissez un preset de garantie ou importez votre propre image. Le badge selectionne reste deplacable et redimensionnable dans lapercu.',
      contactType: 'Type De Contact',
      contactValue: 'Texte Contact',
      contactValueHint: 'Exemple: +33 1 23 45 67 89',
      addContactRow: 'Ajouter Champ Contact',
      removeContactRow: 'Supprimer Champ',
      contactPhone: 'Telephone',
      contactEmail: 'Email',
      contactWebsite: 'Site Web',
      contactAddress: 'Adresse',
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
      uploadPointsText: 'Telecharger Design Texte Points',
      clearUploadedPointsText: 'Utiliser Texte Points Par Defaut',
      pointsTextRotation: 'Rotation',
      pointsTextHint: 'Importez votre propre design texte-points. Glissez dans lapercu pour le deplacer, glissez le coin pour le redimensionner et utilisez le curseur pour le faire pivoter.',
      uploadReconditioned: 'Telecharger Design PC Reconditionne',
      clearUploadedReconditioned: 'Utiliser PC Reconditionne Par Defaut',
      reconditionedRotation: 'Rotation',
      reconditionedHint: 'Importez votre propre design PC reconditionne. Glissez dans lapercu pour le deplacer, glissez le coin pour le redimensionner et utilisez le curseur pour le faire pivoter.',
      priceTagRotation: 'Rotation',
      showIntelBadge: 'Badge Processeur',
      showScreenBadge: 'Badge Ecran',
      showBatteryBadge: 'Badge Batterie',
      showStorageBadge: 'Badge Stockage',
      showRamBadge: 'Badge RAM',
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
      diffBrandText: 'Texte Entreprise',
      diffBrandTextHint: 'Exemple: Dell',
      diffModelTitle: 'Autre Texte',
      diffModelTitleHint: 'Exemple: Latitude 5400',
      textBold: 'Gras',
      textItalic: 'Italique',
      textUnderline: 'Souligne',
      textSize: 'Taille Texte',
      textColor: 'Couleur Texte',
      backgroundColor: 'Couleur Fond',
      backgroundCropMode: 'Activer Le Recadrage Du Fond',
      backgroundCropModeHint: 'Cliquez sur la boite entreprise dans lapercu, puis glissez une poignee laterale pour recadrer le fond.',
      diffPromoLead: 'Promo Gauche Ligne 1',
      diffPromoLeadHint: 'Exemple: TESTE SUR',
      diffPromoValue: 'Valeur Promo Gauche',
      diffPromoValueHint: 'Exemple: 50',
      diffPromoTail: 'Promo Gauche Ligne 2',
      diffPromoTailHint: 'Exemple: POINTS DE CONTROLE',
      diffPromoSection: 'Texte Controle',
      diffPromoTextColor: 'Couleur Texte',
      diffPromoValueColor: 'Couleur Mise En Avant',
      diffPromoBadge: 'Badge Promo Gauche',
      diffPromoBadgeHint: 'Exemple: RECONDITIONNE EN FRANCE',
      diffWarrantyNumber: 'Nombre Garantie',
      diffWarrantyNumberHint: 'Exemple: 1',
      diffWarrantyUnit: 'Unite Garantie',
      diffWarrantyUnitHint: 'Exemple: AN',
      diffWarrantyTitle: 'Titre Garantie',
      diffWarrantyTitleHint: 'Exemple: GARANTIE',
      diffWarrantySubtitle: 'Sous-titre Garantie',
      diffWarrantySubtitleHint: 'Exemple: Pieces et main d oeuvre',
      diffEcoLead: 'Eco Ligne 1',
      diffEcoLeadHint: 'Exemple: ENGAGE POUR',
      diffEcoHighlight: 'Eco Ligne 2',
      diffEcoHighlightHint: 'Exemple: L ENVIRONNEMENT',
      diffOldPrice: 'Ancien Prix',
      diffOldPriceHint: 'Exemple: 899',
    },
    statusReady: 'Pret pour la generation.',
    statusGenerating: 'Generation de limage...',
    statusCanceled: 'Export annule.',
    statusLayoutSaved: 'Mise en page par defaut enregistree.',
    statusLayoutSaveFailed: 'Impossible denregistrer la mise en page par defaut.',
    statusBrandAdded: (name) => `Marque ajoutee : ${name}`,
    statusBrandExists: (name) => `La marque existe deja : ${name}`,
    statusBrandNameRequired: 'Saisissez un nom de marque.',
    statusBrandOpened: (name) => `Marque ouverte : ${name}`,
    statusBrandLayoutSaved: (name) => `Mise en page enregistree pour ${name}.`,
    statusBrandLayoutSaveFailed: (name) => `Impossible denregistrer la mise en page pour ${name}.`,
    statusHigherResolutionLayoutSaved: (size) => `Mise en page haute resolution enregistree pour ${size}.`,
    statusHigherResolutionLayoutSaveFailed: (size) => `Impossible denregistrer la mise en page haute resolution pour ${size}.`,
    statusHigherResolutionNeeded: (size) => `Enregistrez dabord la mise en page haute resolution pour ${size}, puis lancez la generation.`,
    statusChooseExportFolder: 'Choisissez dabord un dossier dexport.',
    statusExportFolderSaved: (path) => `Dossier export marque defini : ${path}`,
    statusSavedMultiple: (folder) => `Images enregistrees dans : ${folder}`,
    statusBrandRenamed: (name) => `Marque modifiee : ${name}`,
    statusBrandDeleted: (name) => `Marque supprimee : ${name}`,
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
    priceBox: '#ff2128',
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
    priceBox: '#ff2128',
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
    priceBox: '#ff2128',
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
const exportDialog = document.getElementById('exportDialog');
const brandsDialog = document.getElementById('brandsDialog');
const brandsList = document.getElementById('brandsList');
const brandsEmptyText = document.getElementById('brandsEmptyText');
const brandsDialogTitle = document.getElementById('brandsDialogTitle');
const brandsAddRow = document.getElementById('brandsAddRow');
const brandsNameInput = document.getElementById('brandsNameInput');
const btnBrandsAddToggle = document.getElementById('btnBrandsAddToggle');
const btnBrandsConfirmAdd = document.getElementById('btnBrandsConfirmAdd');
const btnBrandsClose = document.getElementById('btnBrandsClose');
const btnHigherResolution = document.getElementById('btnHigherResolution');
const higherResolutionSelect = document.getElementById('higherResolutionSelect');
const resolutionGroup = document.getElementById('resolutionGroup');
const resolutionSelect = document.getElementById('resolutionSelect');
const exportFolderGroup = document.getElementById('exportFolderGroup');
const exportFolderPathInput = document.getElementById('exportFolderPath');
const btnChooseExportFolder = document.getElementById('btnChooseExportFolder');
const designModeBar = document.getElementById('designModeBar');
const designModeText = document.getElementById('designModeText');
const btnDesignExport = document.getElementById('btnDesignExport');
const btnDesignCancel = document.getElementById('btnDesignCancel');
let brandLibrary = readBrandLibrary();
let defaultExportDesignVariants = readSavedDefaultExportVariants();
let activeBrandName = '';
let editingBrandName = '';
let pendingDeleteBrandName = '';
let appDefaultLayoutSnapshot = null;
let exportBaseFolder = readExportBaseFolder();
let logoImageObj = null;
let chargerImageObj = null;
let defaultPcImageObj = null;
let defaultLaptopImageObj = null;
let generatorSideGuaranteeImageObj = null;
let generatorPriceTagImageObj = null;
let generatorPointsTextImageObj = null;
let generatorReconditionedImageObj = null;
let generatorBackgroundImageObj = null;
let isGenerating = false;
let statusAnimTimer = null;
let pendingExportExtension = null;
let exportDesignSession = null;
let logoResizeHandleRect = null;
let logoBadgeResizeHandleRect = null;
let logoBadgeBodyRect = null;
let logoImageBodyRect = null;
let isLogoSelected = false;
let priceBadgeBodyRect = null;
let isPriceBadgeSelected = false;
let storageBadgeResizeHandleRect = null;
let storageBadgeBodyRect = null;
let isStorageBadgeSelected = false;
let osBadgeResizeHandleRect = null;
let osBadgeBodyRect = null;
let isOsBadgeSelected = false;
let guaranteeBadgeResizeHandleRect = null;
let guaranteeBadgeBodyRect = null;
let isGuaranteeBadgeSelected = false;
let diffBrandBoxCropHandleRects = [];
let diffBrandBoxBodyRect = null;
let isDiffBrandBoxSelected = false;
let pointsTextResizeHandleRect = null;
let pointsTextBodyRect = null;
let isPointsTextSelected = false;
let reconditionedResizeHandleRect = null;
let reconditionedBodyRect = null;
let isReconditionedSelected = false;
let stackBadgeRects = [];
let stackBadgeResizeHandleRects = [];
let selectedStackBadgeKey = null;
let isResizingLogo = false;
let logoResizeStart = null;
let isResizingLogoBadge = false;
let logoBadgeResizeStart = null;
let isResizingStorageBadge = false;
let storageBadgeResizeStart = null;
let isResizingOsBadge = false;
let osBadgeResizeStart = null;
let isResizingGuaranteeBadge = false;
let guaranteeBadgeResizeStart = null;
let activeDiffBrandBoxCrop = null;
let isResizingPointsText = false;
let pointsTextResizeStart = null;
let isResizingReconditioned = false;
let reconditionedResizeStart = null;
let isResizingStackBadge = false;
let stackBadgeResizeStart = null;
let draggableRegions = [];
let removableElements = [];
let removeButtonRects = [];
let selectAllElementsMode = false;
const MAX_UNDO_STEPS = 40;
let undoStack = [];
let activeDrag = null;
let deviceImageHandles = [];
let isDefaultDeviceImageSelected = false;
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

function clearExclusiveCanvasSelections() {
  isLogoSelected = false;
  isPriceBadgeSelected = false;
  isStorageBadgeSelected = false;
  isOsBadgeSelected = false;
  isGuaranteeBadgeSelected = false;
  isDiffBrandBoxSelected = false;
  isPointsTextSelected = false;
  isReconditionedSelected = false;
  selectedStackBadgeKey = null;
}

function getCanvasSelectionSnapshot() {
  return [
    isLogoSelected ? '1' : '0',
    isPriceBadgeSelected ? '1' : '0',
    isStorageBadgeSelected ? '1' : '0',
    isOsBadgeSelected ? '1' : '0',
    isGuaranteeBadgeSelected ? '1' : '0',
    isDiffBrandBoxSelected ? '1' : '0',
    isPointsTextSelected ? '1' : '0',
    isReconditionedSelected ? '1' : '0',
    selectedStackBadgeKey || '',
    isDefaultDeviceImageSelected ? '1' : '0',
    getSelectedInteractiveImageId() || '',
  ].join('|');
}

function resolvePreferredCanvasElementTarget(hits) {
  const stackTarget = hits.stackBadgeHandleHit || hits.stackBadgeHit || null;
  const isLogoTargetHit = !!(hits.logoHandleHit || hits.logoBadgeHandleHit || hits.logoBodyHit || hits.logoBadgeHit);
  const isPriceTargetHit = !!hits.priceBadgeHit;
  const isStorageTargetHit = !!(hits.storageBadgeHandleHit || hits.storageBadgeHit);
  const isOsTargetHit = !!(hits.osBadgeHandleHit || hits.osBadgeHit);
  const isGuaranteeTargetHit = !!(hits.guaranteeBadgeHandleHit || hits.guaranteeBadgeHit);
  const isDiffBrandBoxTargetHit = !!(hits.diffBrandBoxHandleHit || hits.diffBrandBoxHit);
  const isPointsTextTargetHit = !!(hits.pointsTextHandleHit || hits.pointsTextHit);
  const isReconditionedTargetHit = !!(hits.reconditionedHandleHit || hits.reconditionedHit);
  const selectedStackHit = selectedStackBadgeKey && stackTarget && stackTarget.key === selectedStackBadgeKey;

  if (isLogoSelected && isLogoTargetHit) {
    return { type: 'logo', dragKey: 'logo' };
  }
  if (isPriceBadgeSelected && isPriceTargetHit) {
    return { type: 'price', dragKey: state.generator === 'diff' ? 'diffPrice' : 'price' };
  }
  if (isStorageBadgeSelected && isStorageTargetHit) {
    return { type: 'storage', dragKey: 'storage' };
  }
  if (isOsBadgeSelected && isOsTargetHit) {
    return { type: 'os', dragKey: 'os' };
  }
  if (isGuaranteeBadgeSelected && isGuaranteeTargetHit) {
    return { type: 'guarantee', dragKey: state.generator === 'diff' ? 'diffWarranty' : 'guarantee' };
  }
  if (isDiffBrandBoxSelected && isDiffBrandBoxTargetHit) {
    return { type: 'diffBrandBox' };
  }
  if (isPointsTextSelected && isPointsTextTargetHit) {
    return { type: 'pointsText', dragKey: 'diffPointsText' };
  }
  if (isReconditionedSelected && isReconditionedTargetHit) {
    return { type: 'reconditioned', dragKey: 'diffReconditioned' };
  }
  if (selectedStackHit) {
    return {
      type: 'stack',
      stackKey: selectedStackBadgeKey,
      dragKey: state.generator === 'diff' ? 'diffBottomBadges' : 'tags',
    };
  }

  if (isPriceTargetHit) {
    return { type: 'price', dragKey: state.generator === 'diff' ? 'diffPrice' : 'price' };
  }
  if (stackTarget) {
    return {
      type: 'stack',
      stackKey: stackTarget.key,
      dragKey: state.generator === 'diff' ? 'diffBottomBadges' : 'tags',
    };
  }
  if (isReconditionedTargetHit) {
    return { type: 'reconditioned', dragKey: 'diffReconditioned' };
  }
  if (isPointsTextTargetHit) {
    return { type: 'pointsText', dragKey: 'diffPointsText' };
  }
  if (isGuaranteeTargetHit) {
    return { type: 'guarantee', dragKey: state.generator === 'diff' ? 'diffWarranty' : 'guarantee' };
  }
  if (isDiffBrandBoxTargetHit) {
    return { type: 'diffBrandBox' };
  }
  if (isOsTargetHit) {
    return { type: 'os', dragKey: 'os' };
  }
  if (isStorageTargetHit) {
    return { type: 'storage', dragKey: 'storage' };
  }
  if (isLogoTargetHit) {
    return { type: 'logo', dragKey: 'logo' };
  }
  return null;
}

function applyExclusiveCanvasSelection(target) {
  clearExclusiveCanvasSelections();
  if (!target) {
    return;
  }
  if (target.type === 'logo') {
    isLogoSelected = true;
    return;
  }
  if (target.type === 'price') {
    isPriceBadgeSelected = true;
    return;
  }
  if (target.type === 'storage') {
    isStorageBadgeSelected = true;
    return;
  }
  if (target.type === 'os') {
    isOsBadgeSelected = true;
    return;
  }
  if (target.type === 'guarantee') {
    isGuaranteeBadgeSelected = true;
    return;
  }
  if (target.type === 'diffBrandBox') {
    isDiffBrandBoxSelected = true;
    return;
  }
  if (target.type === 'pointsText') {
    isPointsTextSelected = true;
    return;
  }
  if (target.type === 'reconditioned') {
    isReconditionedSelected = true;
    return;
  }
  if (target.type === 'stack') {
    selectedStackBadgeKey = target.stackKey || null;
  }
}
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
    specCards: JSON.parse(JSON.stringify(state.specCards || [])),
    contactItems: JSON.parse(JSON.stringify(state.contactItems || [])),
    chargerTitle: state.chargerTitle,
    guaranteeText: state.guaranteeText,
    guaranteePeriod: state.guaranteePeriod,
    chargerImageDataUrl: state.chargerImageDataUrl,
    logoImageDataUrl: state.logoImageDataUrl,
    priceRotation: Number(state.priceRotation) || 0,
    diffPointsTextUploadDataUrl: state.diffPointsTextUploadDataUrl,
    diffPointsTextRotation: state.diffPointsTextRotation,
    diffPointsTextSize: JSON.parse(JSON.stringify(state.diffPointsTextSize || DEFAULT_DIFF_POINTS_TEXT_SIZE)),
    diffReconditionedUploadDataUrl: state.diffReconditionedUploadDataUrl,
    diffReconditionedRotation: state.diffReconditionedRotation,
    diffReconditionedSize: JSON.parse(JSON.stringify(state.diffReconditionedSize || DEFAULT_DIFF_RECONDITIONED_SIZE)),
    storageBadgeSize: JSON.parse(JSON.stringify(state.storageBadgeSize || { w: 340, h: 108 })),
    osBadgeSize: JSON.parse(JSON.stringify(state.osBadgeSize || DEFAULT_OS_BADGE_SIZE)),
    guaranteeBadgeSize: JSON.parse(JSON.stringify(state.guaranteeBadgeSize || DEFAULT_GUARANTEE_BADGE_SIZE)),
    defaultPcImageSize: JSON.parse(JSON.stringify(state.defaultPcImageSize || DEFAULT_PC_IMAGE_SIZE)),
    defaultLaptopImageSize: JSON.parse(JSON.stringify(state.defaultLaptopImageSize || DEFAULT_LAPTOP_IMAGE_SIZE)),
    stackBadgeSizes: JSON.parse(JSON.stringify(state.stackBadgeSizes || cloneDefaultStackBadgeSizes())),
    osBadgeSizeAdjusted: !!state.osBadgeSizeAdjusted,
    guaranteeBadgeSizeAdjusted: !!state.guaranteeBadgeSizeAdjusted,
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
  state.specCards = JSON.parse(JSON.stringify(snapshot.specCards || state.specCards || []));
  state.contactItems = JSON.parse(JSON.stringify(snapshot.contactItems || state.contactItems || []));
  state.chargerTitle = snapshot.chargerTitle ?? state.chargerTitle;
  state.guaranteeText = snapshot.guaranteeText ?? state.guaranteeText;
  state.guaranteePeriod = snapshot.guaranteePeriod ?? state.guaranteePeriod;
  state.priceRotation = snapshot.priceRotation ?? state.priceRotation;
  state.diffPointsTextUploadDataUrl = snapshot.diffPointsTextUploadDataUrl ?? state.diffPointsTextUploadDataUrl;
  state.diffPointsTextRotation = snapshot.diffPointsTextRotation ?? state.diffPointsTextRotation;
  state.diffPointsTextSize = JSON.parse(JSON.stringify(snapshot.diffPointsTextSize || state.diffPointsTextSize || DEFAULT_DIFF_POINTS_TEXT_SIZE));
  state.diffReconditionedUploadDataUrl = snapshot.diffReconditionedUploadDataUrl ?? state.diffReconditionedUploadDataUrl;
  state.diffReconditionedRotation = snapshot.diffReconditionedRotation ?? state.diffReconditionedRotation;
  state.diffReconditionedSize = JSON.parse(JSON.stringify(snapshot.diffReconditionedSize || state.diffReconditionedSize || DEFAULT_DIFF_RECONDITIONED_SIZE));
  state.storageBadgeSize = JSON.parse(JSON.stringify(snapshot.storageBadgeSize || state.storageBadgeSize || { w: 340, h: 108 }));
  state.osBadgeSize = JSON.parse(JSON.stringify(snapshot.osBadgeSize || state.osBadgeSize || DEFAULT_OS_BADGE_SIZE));
  state.guaranteeBadgeSize = JSON.parse(JSON.stringify(snapshot.guaranteeBadgeSize || state.guaranteeBadgeSize || DEFAULT_GUARANTEE_BADGE_SIZE));
  state.defaultPcImageSize = JSON.parse(JSON.stringify(snapshot.defaultPcImageSize || state.defaultPcImageSize || DEFAULT_PC_IMAGE_SIZE));
  state.defaultLaptopImageSize = JSON.parse(JSON.stringify(snapshot.defaultLaptopImageSize || state.defaultLaptopImageSize || DEFAULT_LAPTOP_IMAGE_SIZE));
  state.stackBadgeSizes = JSON.parse(JSON.stringify(snapshot.stackBadgeSizes || state.stackBadgeSizes || cloneDefaultStackBadgeSizes()));
  state.osBadgeSizeAdjusted = !!snapshot.osBadgeSizeAdjusted;
  state.guaranteeBadgeSizeAdjusted = !!snapshot.guaranteeBadgeSizeAdjusted;

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
  state.logoImageDataUrl = snapshot.logoImageDataUrl ?? '';
  syncUploadedAssetObjects();
  loadGeneratorPointsTextImage();
  loadGeneratorReconditionedImage();
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

function loadImageObject(src) {
  return new Promise((resolve) => {
    const imageObj = new Image();
    let settled = false;
    const finish = () => {
      if (settled) {
        return;
      }
      settled = true;
      resolve(imageObj);
    };
    imageObj.onload = finish;
    imageObj.onerror = finish;
    imageObj.src = src;
    if (imageObj.complete) {
      finish();
    }
  });
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
    ['priceBox', state.lang === 'fr' ? 'Etiquette Prix' : 'Price Tag'],
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
  const saveLayoutBtn = document.getElementById('btnSaveLayout');
  const higherResolutionBtn = document.getElementById('btnHigherResolution');

  pngBtn.disabled = active;
  jpgBtn.disabled = active;
  if (saveLayoutBtn) {
    saveLayoutBtn.disabled = active;
  }
  if (higherResolutionBtn) {
    higherResolutionBtn.disabled = active;
  }
  if (higherResolutionSelect) {
    higherResolutionSelect.disabled = active;
  }
  if (btnDesignExport) {
    btnDesignExport.disabled = active;
    btnDesignExport.classList.toggle('loading', active);
  }
  if (btnDesignCancel) {
    btnDesignCancel.disabled = active;
  }
  pngBtn.classList.toggle('loading', active);
  jpgBtn.classList.toggle('loading', active);

  if (active) {
    pngBtn.textContent = 'Generating...';
    jpgBtn.textContent = 'Generating...';
    if (btnDesignExport) {
      btnDesignExport.textContent = 'Generating...';
    }
    startStatusLoadingAnimation();
  } else {
    stopStatusLoadingAnimation();
    pngBtn.textContent = t().generatePng;
    jpgBtn.textContent = t().generateJpg;
    if (higherResolutionBtn) {
      higherResolutionBtn.textContent = t().higherResolution;
    }
    if (btnDesignExport) {
      btnDesignExport.textContent = exportDesignSession
        ? `${pendingExportExtension?.toUpperCase() || 'EXPORT'} ${exportDesignSession.width} x ${exportDesignSession.height}`
        : 'Export';
    }
  }
}

function updateCanvasViewport() {
  canvas.style.aspectRatio = `${canvas.width} / ${canvas.height}`;
}

function setCanvasResolution(width, height) {
  canvas.width = width;
  canvas.height = height;
  updateCanvasViewport();
  drawPoster();
}

function getExportDialogText() {
  if (state.lang === 'fr') {
    return {
      title: 'Exporter Image',
      hint: 'Choisissez limage actuelle, limage haute resolution deja enregistree, ou les deux.',
      current: 'Generer limage actuelle',
      higher: 'Generer limage haute resolution',
      both: 'Generer les deux',
      resolution: 'Haute Resolution',
      folder: 'Dossier Export Marque',
      chooseFolder: 'Choisir Dossier',
      folderHint: 'Les images generees seront enregistrees automatiquement dans le dossier de la marque selectionnee.',
      cancel: 'Annuler',
      continue: 'Generer',
      design: 'Mode haute resolution {size}: repositionnez les elements, puis enregistrez la mise en page ou exportez.',
      export: 'Exporter',
    };
  }
  return {
    title: 'Export Image',
    hint: 'Choose the current image, the saved higher-resolution image, or both.',
    current: 'Generate current image',
    higher: 'Generate higher-resolution image',
    both: 'Generate both',
    resolution: 'Higher Resolution',
    folder: 'Brand Export Folder',
    chooseFolder: 'Choose Folder',
    folderHint: 'Generated images will be saved automatically inside the selected brand folder.',
    cancel: 'Cancel',
    continue: 'Generate',
    design: 'Higher-resolution mode {size}: drag elements to their new positions, then save the layout or export.',
    export: 'Export',
  };
}

function refreshExportDialogUi() {
  const text = getExportDialogText();
  const titleEl = document.getElementById('exportDialogTitle');
  const hintEl = document.getElementById('exportDialogHint');
  const currentEl = document.getElementById('exportCurrentLabel');
  const higherEl = document.getElementById('exportHigherLabel');
  const bothEl = document.getElementById('exportBothLabel');
  const resolutionEl = document.getElementById('resolutionLabel');
  const folderEl = document.getElementById('exportFolderLabel');
  const folderHintEl = document.getElementById('exportFolderHint');
  const cancelEl = document.getElementById('btnExportDialogCancel');
  const continueEl = document.getElementById('btnExportDialogConfirm');
  if (titleEl) titleEl.textContent = text.title;
  if (hintEl) hintEl.textContent = text.hint;
  if (currentEl) currentEl.textContent = text.current;
  if (higherEl) higherEl.textContent = text.higher;
  if (bothEl) bothEl.textContent = text.both;
  if (resolutionEl) resolutionEl.textContent = text.resolution;
  if (folderEl) folderEl.textContent = text.folder;
  if (folderHintEl) folderHintEl.textContent = text.folderHint;
  if (btnChooseExportFolder) btnChooseExportFolder.textContent = text.chooseFolder;
  if (cancelEl) cancelEl.textContent = text.cancel;
  if (continueEl) continueEl.textContent = text.continue;
  if (btnDesignCancel) btnDesignCancel.textContent = text.cancel;
  if (btnDesignExport && !exportDesignSession) btnDesignExport.textContent = text.export;
}

function getActiveWorkspaceTab() {
  if (activeBrandName || brandsDialog?.open) {
    return 'brands';
  }
  return state.generator === 'charger' ? 'charger' : 'diff';
}

function getBrandBaseLayoutSnapshot() {
  const savedDefault = readSavedDefaultLayout();
  if (savedDefault?.state) {
    return deepCloneJsonValue(savedDefault);
  }
  return deepCloneJsonValue(appDefaultLayoutSnapshot);
}

function renderBrandsDialog() {
  if (!brandsList || !brandsEmptyText) {
    return;
  }

  brandsList.innerHTML = '';
  brandsEmptyText.classList.toggle('hidden', brandLibrary.length > 0);

  brandLibrary.forEach((entry) => {
    const row = document.createElement('div');
    row.className = 'brand-item-row';

    if (editingBrandName === entry.name) {
      row.classList.add('editing');
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = entry.name;
      editInput.className = 'brand-edit-input';
      editInput.placeholder = t().labels.brandsNamePlaceholder;

      const saveBtn = document.createElement('button');
      saveBtn.type = 'button';
      saveBtn.className = 'brand-action-btn primary';
      saveBtn.textContent = t().labels.brandsSave;
      saveBtn.addEventListener('click', () => {
        saveBrandNameEdit(entry.name, editInput.value);
      });

      const cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'brand-action-btn';
      cancelBtn.textContent = t().labels.brandsCancel;
      cancelBtn.addEventListener('click', () => {
        editingBrandName = '';
        renderBrandsDialog();
      });

      editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          saveBrandNameEdit(entry.name, editInput.value);
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          editingBrandName = '';
          renderBrandsDialog();
        }
      });

      row.appendChild(editInput);
      row.appendChild(saveBtn);
      row.appendChild(cancelBtn);
      brandsList.appendChild(row);
      queueMicrotask(() => {
        editInput.focus();
        editInput.select();
      });
      return;
    }

    if (pendingDeleteBrandName === entry.name) {
      row.classList.add('confirming');

      const label = document.createElement('div');
      label.className = `brand-item-btn brand-item-label ${activeBrandName === entry.name ? 'active' : ''}`;
      label.textContent = entry.name;

      const confirmBtn = document.createElement('button');
      confirmBtn.type = 'button';
      confirmBtn.className = 'brand-action-btn brand-action-danger';
      confirmBtn.textContent = t().labels.brandsConfirmDelete;
      confirmBtn.addEventListener('click', () => {
        deleteBrandEntry(entry.name);
      });

      const cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'brand-action-btn';
      cancelBtn.textContent = t().labels.brandsCancel;
      cancelBtn.addEventListener('click', () => {
        pendingDeleteBrandName = '';
        renderBrandsDialog();
      });

      row.appendChild(label);
      row.appendChild(confirmBtn);
      row.appendChild(cancelBtn);
      brandsList.appendChild(row);
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `brand-item-btn ${activeBrandName === entry.name ? 'active' : ''}`;
    button.textContent = entry.name;
    button.addEventListener('click', () => {
      openBrandWorkspace(entry.name);
    });

    const actions = document.createElement('div');
    actions.className = 'brand-item-actions';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'brand-action-btn';
    editBtn.textContent = t().labels.brandsEdit;
    editBtn.addEventListener('click', () => {
      setBrandsAddRowVisible(false);
      pendingDeleteBrandName = '';
      editingBrandName = entry.name;
      renderBrandsDialog();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'brand-action-btn brand-action-danger';
    deleteBtn.textContent = t().labels.brandsDelete;
    deleteBtn.addEventListener('click', () => {
      editingBrandName = '';
      pendingDeleteBrandName = entry.name;
      renderBrandsDialog();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    row.appendChild(button);
    row.appendChild(actions);
    brandsList.appendChild(row);
  });
}

function setBrandsAddRowVisible(visible) {
  if (!brandsAddRow) {
    return;
  }
  brandsAddRow.classList.toggle('hidden', !visible);
  if (visible) {
    editingBrandName = '';
    pendingDeleteBrandName = '';
  }
  if (!visible && brandsNameInput) {
    brandsNameInput.value = '';
  }
  if (visible && brandsNameInput) {
    brandsNameInput.focus();
    brandsNameInput.select();
  }
}

function openBrandsDialog() {
  renderBrandsDialog();
  if (!brandsDialog) {
    return;
  }
  if (!brandsDialog.open) {
    brandsDialog.showModal();
  }
}

function closeBrandsDialog() {
  if (brandsDialog?.open) {
    brandsDialog.close();
  }
  editingBrandName = '';
  pendingDeleteBrandName = '';
  setBrandsAddRowVisible(false);
}

async function addBrandFromInput() {
  const name = String(brandsNameInput?.value || '').trim();
  if (!name) {
    statusText.textContent = t().statusBrandNameRequired;
    brandsNameInput?.focus();
    return;
  }
  if (findBrandEntry(name)) {
    statusText.textContent = t().statusBrandExists(name);
    brandsNameInput?.focus();
    brandsNameInput?.select();
    return;
  }
  brandLibrary.push({ name, layout: null });
  const saved = persistBrandLibrary();
  if (!saved) {
    brandLibrary = readBrandLibrary();
    statusText.textContent = t().statusLayoutSaveFailed;
    return;
  }
  const syncResult = await syncAllBrandFolders();
  if (!syncResult?.ok) {
    renderBrandsDialog();
    statusText.textContent = syncResult?.error || t().statusLayoutSaveFailed;
    return;
  }
  renderBrandsDialog();
  setBrandsAddRowVisible(false);
  statusText.textContent = t().statusBrandAdded(name);
}

async function saveBrandNameEdit(currentName, nextNameRaw) {
  const nextName = String(nextNameRaw || '').trim();
  if (!nextName) {
    statusText.textContent = t().statusBrandNameRequired;
    renderBrandsDialog();
    return;
  }

  const duplicate = brandLibrary.find((entry) => (
    entry.name.toLowerCase() === nextName.toLowerCase()
    && entry.name.toLowerCase() !== String(currentName || '').toLowerCase()
  ));
  if (duplicate) {
    statusText.textContent = t().statusBrandExists(nextName);
    renderBrandsDialog();
    return;
  }

  const entry = findBrandEntry(currentName);
  if (!entry) {
    editingBrandName = '';
    renderBrandsDialog();
    return;
  }

  entry.name = nextName;
  if (activeBrandName.toLowerCase() === String(currentName || '').toLowerCase()) {
    activeBrandName = nextName;
  }

  const saved = persistBrandLibrary();
  if (!saved) {
    brandLibrary = readBrandLibrary();
    statusText.textContent = t().statusLayoutSaveFailed;
    return;
  }
  const syncResult = await syncAllBrandFolders();
  if (!syncResult?.ok) {
    renderBrandsDialog();
    statusText.textContent = syncResult?.error || t().statusLayoutSaveFailed;
    return;
  }

  pendingDeleteBrandName = '';
  editingBrandName = '';
  renderBrandsDialog();
  statusText.textContent = t().statusBrandRenamed(nextName);
}

function deleteBrandEntry(name) {
  const normalizedName = String(name || '').trim().toLowerCase();
  if (!normalizedName) {
    return;
  }

  brandLibrary = brandLibrary.filter((entry) => entry.name.toLowerCase() !== normalizedName);
  if (activeBrandName.toLowerCase() === normalizedName) {
    activeBrandName = '';
  }
  if (editingBrandName.toLowerCase() === normalizedName) {
    editingBrandName = '';
  }
  if (pendingDeleteBrandName.toLowerCase() === normalizedName) {
    pendingDeleteBrandName = '';
  }

  const saved = persistBrandLibrary();
  if (!saved) {
    brandLibrary = readBrandLibrary();
    statusText.textContent = t().statusLayoutSaveFailed;
    return;
  }

  renderBrandsDialog();
  setUiLanguage();
  statusText.textContent = t().statusBrandDeleted(name);
}

function saveLayoutForActiveBrand() {
  if (!activeBrandName) {
    return false;
  }
  const existing = findBrandEntry(activeBrandName);
  const entry = existing || { name: activeBrandName, layout: null, exportVariants: {} };

  if (exportDesignSession?.variantKey) {
    const variants = entry.exportVariants && typeof entry.exportVariants === 'object'
      ? entry.exportVariants
      : {};
    variants[exportDesignSession.variantKey] = createCurrentDesignSnapshot();
    entry.exportVariants = variants;
  } else {
    entry.layout = createSavedDefaultLayoutSnapshot();
  }

  if (!existing) {
    brandLibrary.push(entry);
  }

  const saved = persistBrandLibrary();
  if (!saved) {
    brandLibrary = readBrandLibrary();
    return false;
  }
  renderBrandsDialog();
  return true;
}

function openBrandWorkspace(name) {
  const entry = findBrandEntry(name);
  if (!entry) {
    return;
  }

  const snapshot = entry.layout ? deepCloneJsonValue(entry.layout) : getBrandBaseLayoutSnapshot();
  if (snapshot?.state) {
    applySavedDefaultLayout(snapshot);
  } else {
    resetLayoutToDefault();
  }

  state.generator = 'diff';
  if (!entry.layout) {
    state.brand = entry.name;
    state.diffBrandText = entry.name.toUpperCase();
  }
  activeBrandName = entry.name;
  editingBrandName = '';
  pendingDeleteBrandName = '';

  closeBrandsDialog();
  setUiLanguage();
  renderControls();
  drawPoster();
  statusText.textContent = t().statusBrandOpened(entry.name);
}

function populateResolutionOptions() {
  [resolutionSelect, higherResolutionSelect].forEach((selectEl) => {
    if (!selectEl) {
      return;
    }
    const currentValue = String(selectEl.value || '');
    selectEl.innerHTML = '';
    WALLPAPER_RESOLUTIONS.forEach((item, index) => {
      const option = document.createElement('option');
      option.value = item.value;
      option.textContent = item.label;
      option.selected = currentValue ? currentValue === item.value : index === 0;
      selectEl.appendChild(option);
    });
  });
}

function updateResolutionGroupVisibility() {
  if (!exportDialog) {
    return;
  }
  const selectedMode = exportDialog.querySelector('input[name="exportMode"]:checked')?.value || 'current';
  const needsHigherResolution = selectedMode === 'higher' || selectedMode === 'both';
  resolutionGroup?.classList.toggle('hidden', !needsHigherResolution);
  exportFolderGroup?.classList.toggle('hidden', !activeBrandName);
  if (exportFolderPathInput) {
    exportFolderPathInput.value = exportBaseFolder || '';
  }
}

function closeExportDialog() {
  if (exportDialog?.open) {
    exportDialog.close();
  }
}

function getExportDesignVariantKey(width, height) {
  const scope = state.generator === 'device' ? `${state.generator}-${state.type}` : state.generator;
  return `${scope}-${width}x${height}`;
}

function createCurrentDesignSnapshot() {
  return {
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    posterState: snapshotForUndo(),
  };
}

function applyDesignSnapshot(snapshot) {
  if (!snapshot) {
    return;
  }
  restoreFromUndoSnapshot(snapshot.posterState);
  canvas.width = snapshot.canvasWidth;
  canvas.height = snapshot.canvasHeight;
  updateCanvasViewport();
  renderControls();
  drawPoster();
}

function saveCurrentExportDesignVariant(options = {}) {
  if (!exportDesignSession?.variantKey) {
    return false;
  }
  const variants = getCurrentWorkspaceExportVariants();
  variants[exportDesignSession.variantKey] = createCurrentDesignSnapshot();
  if (options.persist) {
    return persistCurrentWorkspaceExportVariants();
  }
  return true;
}

function enterExportDesignMode(extension, width, height) {
  const variantKey = getExportDesignVariantKey(width, height);
  const originalSnapshot = createCurrentDesignSnapshot();
  pendingExportExtension = extension;
  exportDesignSession = {
    width,
    height,
    variantKey,
    originalSnapshot,
  };
  const existingVariant = getSavedExportDesignVariant(variantKey);
  if (existingVariant) {
    applyDesignSnapshot(existingVariant);
  } else {
    setCanvasResolution(width, height);
    renderControls();
  }
  if (designModeBar) {
    designModeBar.classList.remove('hidden');
  }
  if (designModeText) {
    designModeText.textContent = getExportDialogText().design.replace('{size}', `${width} x ${height}`);
  }
  if (btnDesignExport) {
    btnDesignExport.textContent = `${extension.toUpperCase()} ${width} x ${height}`;
  }
  statusText.textContent = getExportDialogText().design.replace('{size}', `${width} x ${height}`);
}

function exitExportDesignMode() {
  if (!exportDesignSession) {
    return;
  }
  const { originalSnapshot } = exportDesignSession;
  exportDesignSession = null;
  pendingExportExtension = null;
  if (designModeBar) {
    designModeBar.classList.add('hidden');
  }
  applyDesignSnapshot(originalSnapshot);
  statusText.textContent = t().statusReady;
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
      const changed = state[key] !== value;
      state[key] = value;
      if (changed && key === 'type') {
        isDefaultDeviceImageSelected = false;
      }
      renderControls();
      drawPoster();
    });
    wrap.appendChild(btn);
  });

  section.appendChild(wrap);
  return section;
}

function buildTitleBadgeSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.titleBadge;
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
  return section;
}

function buildStorageSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.storage;
  section.appendChild(h3);

  const labels = t().labels;
  const storagePresets = ['128 GB', '256 GB', '512 GB', '1 TB'];

  const localizeStorageValue = (value) => {
    const raw = String(value || '').trim();
    if (!raw) {
      return '';
    }
    return state.lang === 'fr'
      ? raw.replace(/\bGB\b/gi, 'GO')
      : raw.replace(/\bGO\b/gi, 'GB');
  };

  const applyStoragePresetToText = (text, preset) => {
    const raw = String(text || '').trim();
    const localizedPreset = localizeStorageValue(preset);
    const capacityPattern = /\b\d+(?:[.,]\d+)?\s*(?:GB|GO|TB|TO)\b/i;
    if (!raw) {
      return localizedPreset;
    }
    if (capacityPattern.test(raw)) {
      return raw.replace(capacityPattern, localizedPreset);
    }
    return `${raw} ${localizedPreset}`.trim();
  };

  const appendStoragePresetButtons = (parent, onSelect) => {
    const buttonsRow = document.createElement('div');
    buttonsRow.className = 'options';
    buttonsRow.style.marginTop = '8px';
    buttonsRow.style.marginBottom = '10px';

    storagePresets.forEach((preset) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tile';
      button.textContent = localizeStorageValue(preset);
      button.style.padding = '8px 12px';
      button.addEventListener('click', () => {
        onSelect(localizeStorageValue(preset));
      });
      buttonsRow.appendChild(button);
    });

    parent.appendChild(buttonsRow);
  };

  if (state.generator === 'diff') {
    const diffGroup = document.createElement('div');
    diffGroup.className = 'input-group';

    const storageLineFields = [
      {
        key: 'diffStorageLine1',
        label: labels.storageLine1,
        hint: labels.storageLine1Hint,
      },
      {
        key: 'diffStorageLine2',
        label: labels.storageLine2,
        hint: labels.storageLine2Hint,
      },
    ];

    const appendStorageLineField = ({ key, label, hint }) => {
      const fieldLabel = document.createElement('label');
      fieldLabel.textContent = label;
      diffGroup.appendChild(fieldLabel);

      const input = document.createElement('input');
      input.type = 'text';
      input.value = state[key] || '';
      input.placeholder = hint;
      input.addEventListener('input', (e) => {
        state[key] = e.target.value;
        drawPoster();
      });
      diffGroup.appendChild(input);

      appendStoragePresetButtons(diffGroup, (value) => {
        state[key] = applyStoragePresetToText(state[key], value);
        renderControls();
        drawPoster();
      });
    };

    storageLineFields.forEach(appendStorageLineField);

    const extraToggleRow = document.createElement('label');
    extraToggleRow.style.display = 'flex';
    extraToggleRow.style.alignItems = 'center';
    extraToggleRow.style.gap = '10px';
    extraToggleRow.style.marginTop = '10px';
    extraToggleRow.style.fontWeight = '600';

    const extraToggle = document.createElement('input');
    extraToggle.type = 'checkbox';
    extraToggle.checked = !!state.diffStorageLine3Enabled;
    extraToggle.addEventListener('change', (e) => {
      state.diffStorageLine3Enabled = !!e.target.checked;
      renderControls();
      drawPoster();
    });

    const extraToggleText = document.createElement('span');
    extraToggleText.textContent = labels.storageLine3Toggle;

    extraToggleRow.appendChild(extraToggle);
    extraToggleRow.appendChild(extraToggleText);
    diffGroup.appendChild(extraToggleRow);

    if (state.diffStorageLine3Enabled) {
      appendStorageLineField({
        key: 'diffStorageLine3',
        label: labels.storageLine3,
        hint: labels.storageLine3Hint,
      });
    }

    appendBadgeColorPicker(diffGroup, labels.badgeColor, 'diffStorageBadgeColor', '#f2c246');
    section.appendChild(diffGroup);
    return section;
  }

  const typeCustomGroup = document.createElement('div');
  typeCustomGroup.className = 'input-group';

  const typeCustomLabel = document.createElement('label');
  typeCustomLabel.textContent = labels.storageType;
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

  const customLabel = document.createElement('label');
  customLabel.textContent = labels.storageSize;
  typeCustomGroup.appendChild(customLabel);

  const customInput = document.createElement('input');
  customInput.type = 'text';
  customInput.value = state.storageSize;
  customInput.placeholder = labels.storageHint;
  customInput.addEventListener('input', (e) => {
    state.storageSize = e.target.value;
    drawPoster();
  });
  typeCustomGroup.appendChild(customInput);
  appendStoragePresetButtons(typeCustomGroup, (value) => {
    state.storageSize = value;
    renderControls();
    drawPoster();
  });

  section.appendChild(typeCustomGroup);

  return section;
}

function buildRamSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.ram;
  section.appendChild(h3);

  const typeGroup = document.createElement('div');
  typeGroup.className = 'input-group';

  const sizeLabel = document.createElement('label');
  sizeLabel.textContent = t().sections.ram;
  typeGroup.appendChild(sizeLabel);

  const sizeInput = document.createElement('input');
  sizeInput.type = 'text';
  sizeInput.value = state.ram;
  sizeInput.placeholder = '8 GB';
  sizeInput.addEventListener('input', (e) => {
    state.ram = e.target.value;
    drawPoster();
  });
  typeGroup.appendChild(sizeInput);

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

  if (state.generator === 'diff') {
    appendBadgeColorPicker(typeGroup, t().labels.badgeColor, 'diffRamBadgeColor', '#65c3c5');
  }
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

function appendBadgeColorPicker(parent, label, stateKey, fallbackColor) {
  const colorLabel = document.createElement('label');
  colorLabel.textContent = label;
  parent.appendChild(colorLabel);

  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = state[stateKey] || fallbackColor;
  colorInput.style.marginBottom = '10px';
  colorInput.addEventListener('input', (e) => {
    state[stateKey] = e.target.value;
    drawPoster();
  });
  parent.appendChild(colorInput);
}

function buildOsSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.os;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const textLabel = document.createElement('label');
  textLabel.textContent = t().labels.osCustom;
  wrap.appendChild(textLabel);

  const input = document.createElement('input');
  input.type = 'text';
  input.value = state.os;
  input.placeholder = t().labels.osHint;
  input.addEventListener('input', (e) => {
    state.os = e.target.value;
    drawPoster();
  });
  wrap.appendChild(input);

  if (state.generator === 'diff') {
    appendBadgeColorPicker(wrap, t().labels.badgeColor, 'diffOsBadgeColor', '#1d9be4');
  }

  section.appendChild(wrap);
  return section;
}

function buildDiffPromoSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().labels.diffPromoSection;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const leadLabel = document.createElement('label');
  leadLabel.textContent = t().labels.diffPromoLead;
  wrap.appendChild(leadLabel);

  const leadInput = document.createElement('input');
  leadInput.type = 'text';
  leadInput.value = state.diffPromoLead || '';
  leadInput.placeholder = t().labels.diffPromoLeadHint;
  leadInput.addEventListener('input', (e) => {
    state.diffPromoLead = e.target.value;
    drawPoster();
  });
  wrap.appendChild(leadInput);

  const valueLabel = document.createElement('label');
  valueLabel.textContent = t().labels.diffPromoValue;
  wrap.appendChild(valueLabel);

  const valueInput = document.createElement('input');
  valueInput.type = 'text';
  valueInput.value = state.diffPromoValue || '';
  valueInput.placeholder = t().labels.diffPromoValueHint;
  valueInput.addEventListener('input', (e) => {
    state.diffPromoValue = e.target.value;
    drawPoster();
  });
  wrap.appendChild(valueInput);

  const tailLabel = document.createElement('label');
  tailLabel.textContent = t().labels.diffPromoTail;
  wrap.appendChild(tailLabel);

  const tailInput = document.createElement('input');
  tailInput.type = 'text';
  tailInput.value = state.diffPromoTail || '';
  tailInput.placeholder = t().labels.diffPromoTailHint;
  tailInput.addEventListener('input', (e) => {
    state.diffPromoTail = e.target.value;
    drawPoster();
  });
  wrap.appendChild(tailInput);

  const createFormatButton = (label, active, onClick) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tile ${active ? 'active' : ''}`;
    btn.textContent = label;
    btn.style.padding = '8px 12px';
    btn.style.minWidth = '84px';
    btn.addEventListener('click', onClick);
    return btn;
  };

  const controlsRow = document.createElement('div');
  controlsRow.className = 'options';
  controlsRow.style.marginBottom = '8px';
  controlsRow.appendChild(
    createFormatButton(t().labels.textBold, !!state.diffPromoBold, () => {
      state.diffPromoBold = !state.diffPromoBold;
      renderControls();
      drawPoster();
    })
  );
  controlsRow.appendChild(
    createFormatButton(t().labels.textItalic, !!state.diffPromoItalic, () => {
      state.diffPromoItalic = !state.diffPromoItalic;
      renderControls();
      drawPoster();
    })
  );
  controlsRow.appendChild(
    createFormatButton(t().labels.textUnderline, !!state.diffPromoUnderline, () => {
      state.diffPromoUnderline = !state.diffPromoUnderline;
      renderControls();
      drawPoster();
    })
  );
  wrap.appendChild(controlsRow);

  const sizeLabel = document.createElement('label');
  sizeLabel.textContent = t().labels.textSize;
  wrap.appendChild(sizeLabel);

  const sizeRow = document.createElement('div');
  sizeRow.style.display = 'grid';
  sizeRow.style.gridTemplateColumns = '44px 1fr 44px auto';
  sizeRow.style.gap = '8px';
  sizeRow.style.alignItems = 'center';
  sizeRow.style.marginBottom = '12px';

  const minSize = 16;
  const maxSize = 56;
  const currentSize = Math.max(minSize, Number(state.diffPromoFontSize) || 28);

  const sizeInput = document.createElement('input');
  sizeInput.type = 'range';
  sizeInput.min = String(minSize);
  sizeInput.max = String(maxSize);
  sizeInput.step = '1';
  sizeInput.value = String(currentSize);

  const sizeValue = document.createElement('div');
  sizeValue.textContent = `${currentSize}px`;

  const updateSize = (nextValue) => {
    const next = Math.max(minSize, Math.min(maxSize, Number(nextValue) || 28));
    state.diffPromoFontSize = next;
    sizeInput.value = String(next);
    sizeValue.textContent = `${next}px`;
    drawPoster();
  };

  const minusBtn = document.createElement('button');
  minusBtn.type = 'button';
  minusBtn.className = 'tile';
  minusBtn.textContent = '-';
  minusBtn.style.padding = '8px 0';
  minusBtn.addEventListener('click', () => updateSize((Number(state.diffPromoFontSize) || currentSize) - 1));

  const plusBtn = document.createElement('button');
  plusBtn.type = 'button';
  plusBtn.className = 'tile';
  plusBtn.textContent = '+';
  plusBtn.style.padding = '8px 0';
  plusBtn.addEventListener('click', () => updateSize((Number(state.diffPromoFontSize) || currentSize) + 1));

  sizeInput.addEventListener('input', (e) => {
    updateSize(e.target.value);
  });

  sizeRow.appendChild(minusBtn);
  sizeRow.appendChild(sizeInput);
  sizeRow.appendChild(plusBtn);
  sizeRow.appendChild(sizeValue);
  wrap.appendChild(sizeRow);

  const textColorLabel = document.createElement('label');
  textColorLabel.textContent = t().labels.diffPromoTextColor;
  wrap.appendChild(textColorLabel);

  const textColorInput = document.createElement('input');
  textColorInput.type = 'color';
  textColorInput.value = state.diffPromoTextColor || '#171717';
  textColorInput.style.marginBottom = '10px';
  textColorInput.addEventListener('input', (e) => {
    state.diffPromoTextColor = e.target.value;
    drawPoster();
  });
  wrap.appendChild(textColorInput);

  const valueColorLabel = document.createElement('label');
  valueColorLabel.textContent = t().labels.diffPromoValueColor;
  wrap.appendChild(valueColorLabel);

  const valueColorInput = document.createElement('input');
  valueColorInput.type = 'color';
  valueColorInput.value = state.diffPromoValueColor || '#4dbb35';
  valueColorInput.style.marginBottom = '10px';
  valueColorInput.addEventListener('input', (e) => {
    state.diffPromoValueColor = e.target.value;
    drawPoster();
  });
  wrap.appendChild(valueColorInput);

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
    ['diff', t().labels.generatorDiff],
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

  const currencyInput = document.createElement('input');
  currencyInput.type = 'text';
  currencyInput.value = state.currency;
  currencyInput.placeholder = 'USD';
  currencyInput.addEventListener('input', (e) => {
    state.currency = e.target.value;
    drawPoster();
  });
  wrap.appendChild(currencyInput);

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

  const oldPriceLabel = document.createElement('label');
  oldPriceLabel.textContent = t().labels.oldPrice;
  wrap.appendChild(oldPriceLabel);

  const oldPriceInput = document.createElement('input');
  oldPriceInput.type = 'text';
  oldPriceInput.value = state.oldPrice;
  oldPriceInput.placeholder = t().labels.oldPriceHint;
  oldPriceInput.addEventListener('input', (e) => {
    state.oldPrice = e.target.value;
    if (state.generator === 'diff') {
      state.diffOldPrice = e.target.value;
    }
    drawPoster();
  });
  wrap.appendChild(oldPriceInput);

  const colorLabel = document.createElement('label');
  colorLabel.textContent = t().labels.priceTagColor;
  wrap.appendChild(colorLabel);

  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = state.customThemeColors.priceBox || getActiveThemePalette().priceBox || '#ff2128';
  colorInput.addEventListener('input', (e) => {
    state.customThemeColors.priceBox = e.target.value;
    drawPoster();
  });
  wrap.appendChild(colorInput);

  const rotationLabel = document.createElement('label');
  rotationLabel.textContent = t().labels.priceTagRotation || 'Rotation';
  wrap.appendChild(rotationLabel);

  const rotationWrap = document.createElement('div');
  rotationWrap.style.display = 'flex';
  rotationWrap.style.alignItems = 'center';
  rotationWrap.style.gap = '10px';

  const rotationInput = document.createElement('input');
  rotationInput.type = 'range';
  rotationInput.min = '-180';
  rotationInput.max = '180';
  rotationInput.step = '1';
  rotationInput.value = String(Number(state.priceRotation) || 0);
  rotationInput.style.flex = '1';

  const rotationValue = document.createElement('div');
  rotationValue.textContent = `${Number(state.priceRotation) || 0}deg`;
  rotationValue.style.minWidth = '58px';

  rotationInput.addEventListener('input', (e) => {
    state.priceRotation = Number(e.target.value) || 0;
    rotationValue.textContent = `${state.priceRotation}deg`;
    drawPoster();
  });

  rotationWrap.appendChild(rotationInput);
  rotationWrap.appendChild(rotationValue);
  wrap.appendChild(rotationWrap);

  section.appendChild(wrap);
  return section;
}

function buildDiffFormatSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.diffFormat;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const fields = [
    {
      key: 'diffBrandText',
      label: t().labels.diffBrandText,
      placeholder: t().labels.diffBrandTextHint,
      boldKey: 'diffBrandBold',
      italicKey: 'diffBrandItalic',
      underlineKey: 'diffBrandUnderline',
      sizeKey: 'diffBrandFontSize',
      colorKey: 'diffBrandColor',
      bgColorKey: 'diffBrandBgColor',
      defaultSize: 54,
    },
    {
      key: 'diffModelTitle',
      label: t().labels.diffModelTitle,
      placeholder: t().labels.diffModelTitleHint,
      boldKey: 'diffModelBold',
      italicKey: 'diffModelItalic',
      underlineKey: 'diffModelUnderline',
      sizeKey: 'diffModelFontSize',
      colorKey: 'diffModelColor',
      defaultSize: 62,
    },
  ];

  const createFormatButton = (label, active, onClick) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tile ${active ? 'active' : ''}`;
    btn.textContent = label;
    btn.style.padding = '8px 12px';
    btn.style.minWidth = '84px';
    btn.addEventListener('click', onClick);
    return btn;
  };

  fields.forEach(({ key, label, placeholder, boldKey, italicKey, underlineKey, sizeKey, colorKey, bgColorKey, defaultSize }) => {
    const fieldLabel = document.createElement('label');
    fieldLabel.textContent = label;
    wrap.appendChild(fieldLabel);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = state[key];
    input.placeholder = placeholder;
    input.addEventListener('input', (e) => {
      state[key] = e.target.value;
      drawPoster();
    });
    wrap.appendChild(input);

    const controlsRow = document.createElement('div');
    controlsRow.className = 'options';
    controlsRow.style.marginBottom = '8px';
    controlsRow.appendChild(
      createFormatButton(t().labels.textBold, !!state[boldKey], () => {
        state[boldKey] = !state[boldKey];
        renderControls();
        drawPoster();
      })
    );
    controlsRow.appendChild(
      createFormatButton(t().labels.textItalic, !!state[italicKey], () => {
        state[italicKey] = !state[italicKey];
        renderControls();
        drawPoster();
      })
    );
    controlsRow.appendChild(
      createFormatButton(t().labels.textUnderline, !!state[underlineKey], () => {
        state[underlineKey] = !state[underlineKey];
        renderControls();
        drawPoster();
      })
    );
    wrap.appendChild(controlsRow);

    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = t().labels.textSize;
    wrap.appendChild(sizeLabel);

    const sizeRow = document.createElement('div');
    sizeRow.style.display = 'grid';
    sizeRow.style.gridTemplateColumns = '44px 1fr 44px auto';
    sizeRow.style.gap = '8px';
    sizeRow.style.alignItems = 'center';
    sizeRow.style.marginBottom = '12px';

    const minSize = 18;
    const maxSize = 84;
    const currentSize = Math.max(minSize, Number(state[sizeKey]) || defaultSize);

    const sizeInput = document.createElement('input');
    sizeInput.type = 'range';
    sizeInput.min = String(minSize);
    sizeInput.max = String(maxSize);
    sizeInput.step = '1';
    sizeInput.value = String(currentSize);

    const sizeValue = document.createElement('div');
    sizeValue.textContent = `${currentSize}px`;

    const updateSize = (nextValue) => {
      const next = Math.max(minSize, Math.min(maxSize, Number(nextValue) || defaultSize));
      state[sizeKey] = next;
      sizeInput.value = String(next);
      sizeValue.textContent = `${next}px`;
      drawPoster();
    };

    const minusBtn = document.createElement('button');
    minusBtn.type = 'button';
    minusBtn.className = 'tile';
    minusBtn.textContent = '-';
    minusBtn.style.padding = '8px 0';
    minusBtn.addEventListener('click', () => updateSize((Number(state[sizeKey]) || currentSize) - 1));

    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.className = 'tile';
    plusBtn.textContent = '+';
    plusBtn.style.padding = '8px 0';
    plusBtn.addEventListener('click', () => updateSize((Number(state[sizeKey]) || currentSize) + 1));

    sizeInput.addEventListener('input', (e) => {
      updateSize(e.target.value);
    });

    sizeRow.appendChild(minusBtn);
    sizeRow.appendChild(sizeInput);
    sizeRow.appendChild(plusBtn);
    sizeRow.appendChild(sizeValue);
    wrap.appendChild(sizeRow);

    const colorLabel = document.createElement('label');
    colorLabel.textContent = t().labels.textColor;
    wrap.appendChild(colorLabel);

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = state[colorKey] || (key === 'diffBrandText' ? '#ffffff' : '#1471bf');
    colorInput.style.marginBottom = '12px';
    colorInput.addEventListener('input', (e) => {
      state[colorKey] = e.target.value;
      drawPoster();
    });
    wrap.appendChild(colorInput);

    if (bgColorKey) {
      const bgColorLabel = document.createElement('label');
      bgColorLabel.textContent = t().labels.backgroundColor;
      wrap.appendChild(bgColorLabel);

      const bgColorInput = document.createElement('input');
      bgColorInput.type = 'color';
      bgColorInput.value = state[bgColorKey] || '#1471bf';
      bgColorInput.style.marginBottom = '12px';
      bgColorInput.addEventListener('input', (e) => {
        state[bgColorKey] = e.target.value;
        drawPoster();
      });
      wrap.appendChild(bgColorInput);

      if (key === 'diffBrandText') {
        const cropToggleRow = document.createElement('label');
        cropToggleRow.style.display = 'flex';
        cropToggleRow.style.alignItems = 'center';
        cropToggleRow.style.gap = '10px';
        cropToggleRow.style.marginBottom = '8px';

        const cropToggle = document.createElement('input');
        cropToggle.type = 'checkbox';
        cropToggle.checked = !!state.diffBrandBoxCropEnabled;
        cropToggle.addEventListener('change', (e) => {
          state.diffBrandBoxCropEnabled = e.target.checked;
          if (!state.diffBrandBoxCropEnabled) {
            isDiffBrandBoxSelected = false;
          }
          renderControls();
          drawPoster();
        });

        const cropToggleText = document.createElement('span');
        cropToggleText.textContent = t().labels.backgroundCropMode;

        cropToggleRow.appendChild(cropToggle);
        cropToggleRow.appendChild(cropToggleText);
        wrap.appendChild(cropToggleRow);

        const cropHint = document.createElement('div');
        cropHint.textContent = t().labels.backgroundCropModeHint;
        cropHint.style.fontSize = '12px';
        cropHint.style.lineHeight = '1.4';
        cropHint.style.color = 'var(--muted)';
        cropHint.style.marginBottom = '12px';
        wrap.appendChild(cropHint);
      }
    }
  });

  section.appendChild(wrap);
  return section;
}

function buildDiffBackgroundSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.background;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const presetWrap = document.createElement('div');
  presetWrap.className = 'options';

  const presetItems = [
    ['bg1', t().labels.generatorBg1],
    ['bg2', t().labels.generatorBg2],
    ['bg3', t().labels.generatorBg3],
    ['bg4', t().labels.generatorBg4],
  ];

  presetItems.forEach(([value, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tile ${state.diffBackgroundSelection === value ? 'active' : ''}`;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      if (state.diffBackgroundSelection === value) {
        return;
      }
      state.diffBackgroundSelection = value;
      loadGeneratorBackgroundImage();
      renderControls();
    });
    presetWrap.appendChild(btn);
  });

  const uploadedBtn = document.createElement('button');
  uploadedBtn.type = 'button';
  uploadedBtn.className = `tile ${state.diffBackgroundSelection === 'upload' ? 'active' : ''}`;
  uploadedBtn.textContent = t().labels.generatorBgUpload;
  uploadedBtn.disabled = !state.diffBackgroundUploadDataUrl;
  uploadedBtn.addEventListener('click', () => {
    if (!state.diffBackgroundUploadDataUrl || state.diffBackgroundSelection === 'upload') {
      return;
    }
    state.diffBackgroundSelection = 'upload';
    loadGeneratorBackgroundImage();
    renderControls();
  });
  presetWrap.appendChild(uploadedBtn);

  wrap.appendChild(presetWrap);

  const uploadBtn = document.createElement('button');
  uploadBtn.type = 'button';
  uploadBtn.textContent = t().labels.uploadBackground;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = t().labels.clearUploadedBackground;
  clearBtn.disabled = !state.diffBackgroundUploadDataUrl;

  const hint = document.createElement('div');
  hint.textContent = t().labels.backgroundHint;
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
      state.diffBackgroundUploadDataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!state.diffBackgroundUploadDataUrl) {
        return;
      }
      state.diffBackgroundSelection = 'upload';
      hiddenInput.value = '';
      loadGeneratorBackgroundImage();
      renderControls();
    };
    reader.readAsDataURL(file);
  });

  clearBtn.addEventListener('click', () => {
    if (!state.diffBackgroundUploadDataUrl) {
      return;
    }
    state.diffBackgroundUploadDataUrl = '';
    if (state.diffBackgroundSelection === 'upload') {
      state.diffBackgroundSelection = 'bg1';
    }
    loadGeneratorBackgroundImage();
    renderControls();
  });

  wrap.appendChild(uploadBtn);
  wrap.appendChild(clearBtn);
  wrap.appendChild(hint);
  wrap.appendChild(hiddenInput);
  section.appendChild(wrap);
  return section;
}

function resetDiffGuaranteeToFullSize() {
  state.guaranteeBadgeSizeAdjusted = false;
}

function loadSelectedDiffGuaranteeImage() {
  const source = state.diffGuaranteeSelection === 'upload' && state.diffGuaranteeUploadDataUrl
    ? state.diffGuaranteeUploadDataUrl
    : (GENERATOR_GUARANTEE_PRESETS[state.diffGuaranteeSelection] || GENERATOR_GUARANTEE_PRESETS['1m']);
  loadGeneratorSideGuaranteeImage(source);
}

function buildDiffGuaranteeSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.guarantee;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const presetWrap = document.createElement('div');
  presetWrap.className = 'options';

  const presetItems = [
    ['1m', t().labels.generatorGuarantee1m],
    ['3m', t().labels.generatorGuarantee3m],
    ['6m', t().labels.generatorGuarantee6m],
    ['12m', t().labels.generatorGuarantee12m],
  ];

  presetItems.forEach(([value, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tile ${state.diffGuaranteeSelection === value ? 'active' : ''}`;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      if (state.diffGuaranteeSelection === value) {
        return;
      }
      state.diffGuaranteeSelection = value;
      state.sectionEnabled.guarantee = true;
      resetDiffGuaranteeToFullSize();
      loadSelectedDiffGuaranteeImage();
      renderControls();
    });
    presetWrap.appendChild(btn);
  });

  const uploadedBtn = document.createElement('button');
  uploadedBtn.type = 'button';
  uploadedBtn.className = `tile ${state.diffGuaranteeSelection === 'upload' ? 'active' : ''}`;
  uploadedBtn.textContent = t().labels.generatorGuaranteeUpload;
  uploadedBtn.disabled = !state.diffGuaranteeUploadDataUrl;
  uploadedBtn.addEventListener('click', () => {
    if (!state.diffGuaranteeUploadDataUrl || state.diffGuaranteeSelection === 'upload') {
      return;
    }
    state.diffGuaranteeSelection = 'upload';
    state.sectionEnabled.guarantee = true;
    resetDiffGuaranteeToFullSize();
    loadSelectedDiffGuaranteeImage();
    renderControls();
  });
  presetWrap.appendChild(uploadedBtn);

  wrap.appendChild(presetWrap);

  const uploadBtn = document.createElement('button');
  uploadBtn.type = 'button';
  uploadBtn.textContent = t().labels.uploadGuarantee;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = t().labels.clearUploadedGuarantee;
  clearBtn.disabled = !state.diffGuaranteeUploadDataUrl;

  const hint = document.createElement('div');
  hint.textContent = t().labels.guaranteeImageHint;
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
      state.diffGuaranteeUploadDataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!state.diffGuaranteeUploadDataUrl) {
        return;
      }
      state.diffGuaranteeSelection = 'upload';
      state.sectionEnabled.guarantee = true;
      resetDiffGuaranteeToFullSize();
      hiddenInput.value = '';
      loadSelectedDiffGuaranteeImage();
      renderControls();
    };
    reader.readAsDataURL(file);
  });

  clearBtn.addEventListener('click', () => {
    if (!state.diffGuaranteeUploadDataUrl) {
      return;
    }
    state.diffGuaranteeUploadDataUrl = '';
    if (state.diffGuaranteeSelection === 'upload') {
      state.diffGuaranteeSelection = '1m';
    }
    state.sectionEnabled.guarantee = true;
    resetDiffGuaranteeToFullSize();
    loadSelectedDiffGuaranteeImage();
    renderControls();
  });

  wrap.appendChild(uploadBtn);
  wrap.appendChild(clearBtn);
  wrap.appendChild(hint);
  wrap.appendChild(hiddenInput);
  section.appendChild(wrap);
  return section;
}

function buildContactSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.contact;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const items = Array.isArray(state.contactItems) ? state.contactItems : [];
  items.forEach((item, idx) => {
    const row = document.createElement('div');
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '130px 1fr auto';
    row.style.gap = '8px';
    row.style.alignItems = 'center';

    const typeInput = document.createElement('input');
    typeInput.type = 'text';
    typeInput.value = item.type || '';
    typeInput.placeholder = t().labels.contactType;
    typeInput.addEventListener('input', (e) => {
      state.contactItems[idx].type = e.target.value;
      drawPoster();
    });

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.value = item.value || '';
    valueInput.placeholder = t().labels.contactValueHint;
    valueInput.addEventListener('input', (e) => {
      state.contactItems[idx].value = e.target.value;
      drawPoster();
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = t().labels.removeContactRow;
    removeBtn.addEventListener('click', () => {
      state.contactItems.splice(idx, 1);
      renderControls();
      drawPoster();
    });

    row.appendChild(typeInput);
    row.appendChild(valueInput);
    row.appendChild(removeBtn);
    wrap.appendChild(row);
  });

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = t().labels.addContactRow;
  addBtn.addEventListener('click', () => {
    if (!Array.isArray(state.contactItems)) {
      state.contactItems = [];
    }
    state.contactItems.push({ type: t().labels.contactPhone, value: '' });
    renderControls();
    drawPoster();
  });
  wrap.appendChild(addBtn);

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

  if (key === 'brand') {
    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = 'Brand Text Size';
    inputGroup.appendChild(sizeLabel);

    const sizeInput = document.createElement('input');
    sizeInput.type = 'range';
    sizeInput.min = '18';
    sizeInput.max = '72';
    sizeInput.step = '1';
    sizeInput.value = String(state.brandFontSize || 36);

    const sizeValue = document.createElement('div');
    sizeValue.textContent = `${state.brandFontSize || 36}px`;

    sizeInput.addEventListener('input', (e) => {
      state.brandFontSize = Number(e.target.value) || 36;
      sizeValue.textContent = `${state.brandFontSize}px`;
      drawPoster();
    });

    inputGroup.appendChild(sizeInput);
    inputGroup.appendChild(sizeValue);
  }

  section.appendChild(inputGroup);
  return section;
}

function composeProcessorFromFields() {
  const core = (state.processorCore || '').trim();
  const number = (state.processorNumber || '').trim();
  const gen = (state.processorGeneration || '').trim();
  return [core, number, gen].filter(Boolean).join(' ');
}

function buildProcessorSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.processor;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const badgeTextLabel = document.createElement('label');
  badgeTextLabel.textContent = t().labels.processorBadgePrimary;
  wrap.appendChild(badgeTextLabel);

  const badgeTextInput = document.createElement('input');
  badgeTextInput.type = 'text';
  badgeTextInput.value = state.processorCore;
  badgeTextInput.placeholder = t().labels.processorBadgePrimaryHint;
  badgeTextInput.addEventListener('input', (e) => {
    state.processorCore = e.target.value;
    state.processor = composeProcessorFromFields();
    drawPoster();
  });
  wrap.appendChild(badgeTextInput);

  const numLabel = document.createElement('label');
  numLabel.textContent = t().labels.processorBadgeSecondary;
  wrap.appendChild(numLabel);

  const numInput = document.createElement('input');
  numInput.type = 'text';
  numInput.value = state.processorNumber;
  numInput.placeholder = t().labels.processorBadgeSecondaryHint;
  numInput.addEventListener('input', (e) => {
    state.processorNumber = e.target.value;
    state.processor = composeProcessorFromFields();
    drawPoster();
  });
  wrap.appendChild(numInput);

  const genLabel = document.createElement('label');
  genLabel.textContent = t().labels.processorBadgeTertiary;
  wrap.appendChild(genLabel);

  const genInput = document.createElement('input');
  genInput.type = 'text';
  genInput.value = state.processorGeneration;
  genInput.placeholder = t().labels.processorBadgeTertiaryHint;
  genInput.addEventListener('input', (e) => {
    state.processorGeneration = e.target.value;
    state.processor = composeProcessorFromFields();
    drawPoster();
  });
  wrap.appendChild(genInput);

  if (state.generator === 'diff') {
    appendBadgeColorPicker(wrap, t().labels.badgeColor, 'diffProcessorBadgeColor', '#1b9fea');
  }

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
      const imageObj = await loadImageObject(chosenUrl);
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
    state.sectionEnabled.image = true;
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
    pushUndoSnapshot();
    state.deviceImages[state.type] = getCurrentDeviceImages().filter((img) => img.id !== selectedId);
    const next = state.deviceImages[state.type][state.deviceImages[state.type].length - 1] || null;
    setSelectedDeviceImageId(next ? next.id : null);
    drawPoster();
    renderControls();
  });

  clearAllBtn.addEventListener('click', () => {
    if (getCurrentDeviceImages().length === 0) {
      return;
    }
    pushUndoSnapshot();
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
      // eslint-disable-next-line no-await-in-loop
      const imageObj = await loadImageObject(dataUrl);
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
    state.sectionEnabled.image = true;
    hiddenInput.value = '';
    drawPoster();
    renderControls();
  });

  removeSelectedBtn.addEventListener('click', () => {
    const selectedId = state.selectedChargerImageId;
    if (!selectedId) {
      return;
    }
    pushUndoSnapshot();
    state.chargerImages = (state.chargerImages || []).filter((img) => img.id !== selectedId);
    const next = state.chargerImages[state.chargerImages.length - 1] || null;
    state.selectedChargerImageId = next ? next.id : null;
    drawPoster();
    renderControls();
  });

  clearBtn.addEventListener('click', () => {
    if (!state.chargerImageDataUrl && !(state.chargerImages || []).length) {
      return;
    }
    pushUndoSnapshot();
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

function resetDiffPointsTextSize() {
  state.diffPointsTextSize = { ...DEFAULT_DIFF_POINTS_TEXT_SIZE };
}

function resetDiffReconditionedSize() {
  state.diffReconditionedSize = { ...DEFAULT_DIFF_RECONDITIONED_SIZE };
}

function buildPointsTextSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.pointsText;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const uploadBtn = document.createElement('button');
  uploadBtn.type = 'button';
  uploadBtn.textContent = t().labels.uploadPointsText;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = t().labels.clearUploadedPointsText;
  clearBtn.disabled = !state.diffPointsTextUploadDataUrl;

  const rotationLabel = document.createElement('label');
  rotationLabel.textContent = t().labels.pointsTextRotation;

  const rotationWrap = document.createElement('div');
  rotationWrap.style.display = 'flex';
  rotationWrap.style.alignItems = 'center';
  rotationWrap.style.gap = '10px';

  const rotationInput = document.createElement('input');
  rotationInput.type = 'range';
  rotationInput.min = '-180';
  rotationInput.max = '180';
  rotationInput.step = '1';
  rotationInput.value = String(Number(state.diffPointsTextRotation) || 0);
  rotationInput.style.flex = '1';

  const rotationValue = document.createElement('div');
  rotationValue.textContent = `${Number(state.diffPointsTextRotation) || 0}deg`;
  rotationValue.style.minWidth = '58px';

  rotationInput.addEventListener('input', (e) => {
    state.diffPointsTextRotation = Number(e.target.value) || 0;
    rotationValue.textContent = `${state.diffPointsTextRotation}deg`;
    drawPoster();
  });

  const hint = document.createElement('div');
  hint.textContent = t().labels.pointsTextHint;
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
      state.diffPointsTextUploadDataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!state.diffPointsTextUploadDataUrl) {
        return;
      }
      state.sectionEnabled.pointsText = true;
      resetDiffPointsTextSize();
      hiddenInput.value = '';
      loadGeneratorPointsTextImage();
      renderControls();
    };
    reader.readAsDataURL(file);
  });

  clearBtn.addEventListener('click', () => {
    if (!state.diffPointsTextUploadDataUrl) {
      return;
    }
    state.diffPointsTextUploadDataUrl = '';
    state.sectionEnabled.pointsText = true;
    resetDiffPointsTextSize();
    loadGeneratorPointsTextImage();
    renderControls();
  });

  rotationWrap.appendChild(rotationInput);
  rotationWrap.appendChild(rotationValue);
  wrap.appendChild(uploadBtn);
  wrap.appendChild(clearBtn);
  wrap.appendChild(rotationLabel);
  wrap.appendChild(rotationWrap);
  wrap.appendChild(hint);
  wrap.appendChild(hiddenInput);
  section.appendChild(wrap);
  return section;
}

function buildReconditionedSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.reconditioned;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const uploadBtn = document.createElement('button');
  uploadBtn.type = 'button';
  uploadBtn.textContent = t().labels.uploadReconditioned;

  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = t().labels.clearUploadedReconditioned;
  clearBtn.disabled = !state.diffReconditionedUploadDataUrl;

  const rotationLabel = document.createElement('label');
  rotationLabel.textContent = t().labels.reconditionedRotation;

  const rotationWrap = document.createElement('div');
  rotationWrap.style.display = 'flex';
  rotationWrap.style.alignItems = 'center';
  rotationWrap.style.gap = '10px';

  const rotationInput = document.createElement('input');
  rotationInput.type = 'range';
  rotationInput.min = '-180';
  rotationInput.max = '180';
  rotationInput.step = '1';
  rotationInput.value = String(Number(state.diffReconditionedRotation) || 0);
  rotationInput.style.flex = '1';

  const rotationValue = document.createElement('div');
  rotationValue.textContent = `${Number(state.diffReconditionedRotation) || 0}deg`;
  rotationValue.style.minWidth = '58px';

  rotationInput.addEventListener('input', (e) => {
    state.diffReconditionedRotation = Number(e.target.value) || 0;
    rotationValue.textContent = `${state.diffReconditionedRotation}deg`;
    drawPoster();
  });

  const hint = document.createElement('div');
  hint.textContent = t().labels.reconditionedHint;
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
      state.diffReconditionedUploadDataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!state.diffReconditionedUploadDataUrl) {
        return;
      }
      state.sectionEnabled.reconditioned = true;
      resetDiffReconditionedSize();
      hiddenInput.value = '';
      loadGeneratorReconditionedImage();
      renderControls();
    };
    reader.readAsDataURL(file);
  });

  clearBtn.addEventListener('click', () => {
    if (!state.diffReconditionedUploadDataUrl) {
      return;
    }
    state.diffReconditionedUploadDataUrl = '';
    state.sectionEnabled.reconditioned = true;
    resetDiffReconditionedSize();
    loadGeneratorReconditionedImage();
    renderControls();
  });

  rotationWrap.appendChild(rotationInput);
  rotationWrap.appendChild(rotationValue);
  wrap.appendChild(uploadBtn);
  wrap.appendChild(clearBtn);
  wrap.appendChild(rotationLabel);
  wrap.appendChild(rotationWrap);
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
    ['showScreenBadge', t().labels.showScreenBadge],
    ['showBatteryBadge', t().labels.showBatteryBadge],
    ['showStorageBadge', t().labels.showStorageBadge],
    ['showRamBadge', t().labels.showRamBadge],
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

  section.appendChild(wrap);
  return section;
}

function buildDiffLineBadgeSection(config) {
  const {
    sectionTitle,
    line1Key,
    line1Label,
    line1Hint,
    line2Key,
    line2Label,
    line2Hint,
    line3EnabledKey,
    line3ToggleLabel,
    line3Key,
    line3Label,
    line3Hint,
    colorKey,
    defaultColor,
  } = config;

  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = sectionTitle;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const lineFields = [
    { key: line1Key, label: line1Label, hint: line1Hint },
    { key: line2Key, label: line2Label, hint: line2Hint },
  ];

  lineFields.forEach(({ key, label, hint }) => {
    const fieldLabel = document.createElement('label');
    fieldLabel.textContent = label;
    wrap.appendChild(fieldLabel);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = state[key] || '';
    input.placeholder = hint;
    input.addEventListener('input', (e) => {
      state[key] = e.target.value;
      drawPoster();
    });
    wrap.appendChild(input);
  });

  const line3ToggleRow = document.createElement('label');
  line3ToggleRow.style.display = 'flex';
  line3ToggleRow.style.alignItems = 'center';
  line3ToggleRow.style.gap = '10px';
  line3ToggleRow.style.marginTop = '10px';
  line3ToggleRow.style.fontWeight = '600';

  const line3Toggle = document.createElement('input');
  line3Toggle.type = 'checkbox';
  line3Toggle.checked = !!state[line3EnabledKey];
  line3Toggle.addEventListener('change', (e) => {
    state[line3EnabledKey] = !!e.target.checked;
    renderControls();
    drawPoster();
  });

  const line3ToggleText = document.createElement('span');
  line3ToggleText.textContent = line3ToggleLabel;

  line3ToggleRow.appendChild(line3Toggle);
  line3ToggleRow.appendChild(line3ToggleText);
  wrap.appendChild(line3ToggleRow);

  if (state[line3EnabledKey]) {
    const line3FieldLabel = document.createElement('label');
    line3FieldLabel.textContent = line3Label;
    wrap.appendChild(line3FieldLabel);

    const line3Input = document.createElement('input');
    line3Input.type = 'text';
    line3Input.value = state[line3Key] || '';
    line3Input.placeholder = line3Hint;
    line3Input.addEventListener('input', (e) => {
      state[line3Key] = e.target.value;
      drawPoster();
    });
    wrap.appendChild(line3Input);
  }

  appendBadgeColorPicker(wrap, t().labels.badgeColor, colorKey, defaultColor);
  section.appendChild(wrap);
  return section;
}

function buildScreenSection() {
  if (state.generator === 'diff') {
    return buildDiffLineBadgeSection({
      sectionTitle: t().sections.screen || 'Screen',
      line1Key: 'diffScreenLine1',
      line1Label: t().labels.screenLine1,
      line1Hint: t().labels.screenLine1Hint,
      line2Key: 'diffScreenLine2',
      line2Label: t().labels.screenLine2,
      line2Hint: t().labels.screenLine2Hint,
      line3EnabledKey: 'diffScreenLine3Enabled',
      line3ToggleLabel: t().labels.screenLine3Toggle,
      line3Key: 'diffScreenLine3',
      line3Label: t().labels.screenLine3,
      line3Hint: t().labels.screenLine3Hint,
      colorKey: 'diffScreenBadgeColor',
      defaultColor: '#57b7cf',
    });
  }

  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().labels.screenSize;
  section.appendChild(h3);

  const wrap = document.createElement('div');
  wrap.className = 'input-group';

  const visibleRow = document.createElement('label');
  visibleRow.style.display = 'flex';
  visibleRow.style.alignItems = 'center';
  visibleRow.style.gap = '8px';

  const visibleInput = document.createElement('input');
  visibleInput.type = 'checkbox';
  visibleInput.checked = !!state.showScreenBadge;
  visibleInput.addEventListener('change', (e) => {
    state.showScreenBadge = e.target.checked;
    drawPoster();
  });

  const visibleText = document.createElement('span');
  visibleText.textContent = state.lang === 'fr' ? 'Afficher Badge Ecran' : 'Show Screen Badge';
  visibleRow.appendChild(visibleInput);
  visibleRow.appendChild(visibleText);
  wrap.appendChild(visibleRow);

  const screenLabel = document.createElement('label');
  screenLabel.textContent = t().labels.screenSize;
  wrap.appendChild(screenLabel);

  const screenInput = document.createElement('input');
  screenInput.type = 'text';
  screenInput.value = state.screenSize;
  screenInput.placeholder = t().labels.screenSize;
  screenInput.addEventListener('input', (e) => {
    state.screenSize = e.target.value;
    drawPoster();
  });
  wrap.appendChild(screenInput);

  section.appendChild(wrap);
  return section;
}

function buildConnectivitySection() {
  return buildDiffLineBadgeSection({
    sectionTitle: t().sections.connectivity || 'Connectivity',
    line1Key: 'diffConnectivityLine1',
    line1Label: t().labels.connectivityLine1,
    line1Hint: t().labels.connectivityLine1Hint,
    line2Key: 'diffConnectivityLine2',
    line2Label: t().labels.connectivityLine2,
    line2Hint: t().labels.connectivityLine2Hint,
    line3EnabledKey: 'diffConnectivityLine3Enabled',
    line3ToggleLabel: t().labels.connectivityLine3Toggle,
    line3Key: 'diffConnectivityLine3',
    line3Label: t().labels.connectivityLine3,
    line3Hint: t().labels.connectivityLine3Hint,
    colorKey: 'diffConnectivityBadgeColor',
    defaultColor: '#5b86d8',
  });
}

function buildGpuSection() {
  return buildDiffLineBadgeSection({
    sectionTitle: t().sections.gpu || 'Graphic Card',
    line1Key: 'diffGpuLine1',
    line1Label: t().labels.gpuLine1,
    line1Hint: t().labels.gpuLine1Hint,
    line2Key: 'diffGpuLine2',
    line2Label: t().labels.gpuLine2,
    line2Hint: t().labels.gpuLine2Hint,
    line3EnabledKey: 'diffGpuLine3Enabled',
    line3ToggleLabel: t().labels.gpuLine3Toggle,
    line3Key: 'diffGpuLine3',
    line3Label: t().labels.gpuLine3,
    line3Hint: t().labels.gpuLine3Hint,
    colorKey: 'diffGpuBadgeColor',
    defaultColor: '#63b746',
  });
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
  pctInput.type = 'text';
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

function buildSpecificationsSection() {
  const section = document.createElement('section');
  section.className = 'section';

  const h3 = document.createElement('h3');
  h3.textContent = t().sections.specifications;
  section.appendChild(h3);

  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group';
  const cards = Array.isArray(state.specCards) ? state.specCards : [];
  cards.forEach((card, cardIndex) => {
    const cardWrap = document.createElement('div');
    cardWrap.className = 'section';
    cardWrap.style.padding = '10px';
    cardWrap.style.background = '#ffffff';

    const titleLabel = document.createElement('label');
    titleLabel.textContent = t().labels.cardTitle;
    cardWrap.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = card.title || card.titleEn || card.titleFr || '';
    titleInput.placeholder = t().labels.cardTitleHint;
    titleInput.addEventListener('input', (e) => {
      state.specCards[cardIndex].title = e.target.value;
      drawPoster();
    });
    cardWrap.appendChild(titleInput);

    const rows = Array.isArray(card.rows) ? card.rows : [];
    rows.forEach((row, rowIndex) => {
      const rowWrap = document.createElement('div');
      rowWrap.className = 'section';
      rowWrap.style.padding = '10px';
      rowWrap.style.background = '#f8fbff';

      const lineLabel = document.createElement('label');
      lineLabel.textContent = t().labels.specLine;
      rowWrap.appendChild(lineLabel);

      const lineInput = document.createElement('input');
      lineInput.type = 'text';
      lineInput.value = row.text || [row.left, row.right].filter(Boolean).join(' ').trim();
      lineInput.placeholder = t().labels.specLineHint;
      lineInput.addEventListener('input', (e) => {
        state.specCards[cardIndex].rows[rowIndex] = { text: e.target.value };
        drawPoster();
      });
      rowWrap.appendChild(lineInput);

      const removeRowBtn = document.createElement('button');
      removeRowBtn.type = 'button';
      removeRowBtn.textContent = t().labels.removeSpecRow;
      removeRowBtn.addEventListener('click', () => {
        state.specCards[cardIndex].rows.splice(rowIndex, 1);
        renderControls();
        drawPoster();
      });
      rowWrap.appendChild(removeRowBtn);

      cardWrap.appendChild(rowWrap);
    });

    const addRowBtn = document.createElement('button');
    addRowBtn.type = 'button';
    addRowBtn.textContent = t().labels.addSpecRow;
    addRowBtn.addEventListener('click', () => {
      state.specCards[cardIndex].rows.push({ text: '' });
      renderControls();
      drawPoster();
    });
    cardWrap.appendChild(addRowBtn);

    const removeCardBtn = document.createElement('button');
    removeCardBtn.type = 'button';
    removeCardBtn.textContent = t().labels.removeSpecCard;
    removeCardBtn.addEventListener('click', () => {
      state.specCards.splice(cardIndex, 1);
      renderControls();
      drawPoster();
    });
    cardWrap.appendChild(removeCardBtn);

    inputGroup.appendChild(cardWrap);
  });

  const addCardBtn = document.createElement('button');
  addCardBtn.type = 'button';
  addCardBtn.textContent = t().labels.addSpecCard;
    addCardBtn.addEventListener('click', () => {
      state.specCards.push({
      title: 'Specifications',
      rows: [],
    });
    renderControls();
    drawPoster();
  });
  inputGroup.appendChild(addCardBtn);

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

  const textLabel = document.createElement('label');
  textLabel.textContent = t().labels.guaranteeText;
  inputGroup.appendChild(textLabel);

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.value = state.guaranteeText;
  textInput.placeholder = t().labels.guaranteeTextHint;
  textInput.addEventListener('input', (e) => {
    state.guaranteeText = e.target.value;
    drawPoster();
  });
  inputGroup.appendChild(textInput);

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

  if (state.generator === 'diff') {
    controlsPanel.appendChild(applySectionToggle(buildTileSection(labels.sections.type, 'type', options.type), 'type'));
    controlsPanel.appendChild(buildDiffBackgroundSection());
    controlsPanel.appendChild(applySectionToggle(buildDiffFormatSection(), 'diffFormat'));
    controlsPanel.appendChild(applySectionToggle(buildDeviceImageSection(), 'image'));
    controlsPanel.appendChild(applySectionToggle(buildDiffGuaranteeSection(), 'guarantee'));
    controlsPanel.appendChild(applySectionToggle(buildLogoSection(), 'logo'));
    controlsPanel.appendChild(applySectionToggle(buildPointsTextSection(), 'pointsText'));
    controlsPanel.appendChild(applySectionToggle(buildReconditionedSection(), 'reconditioned'));
    controlsPanel.appendChild(applySectionToggle(buildPriceSection(), 'price'));
    controlsPanel.appendChild(
      applySectionToggle(buildProcessorSection(), 'processor')
    );
    controlsPanel.appendChild(applySectionToggle(buildStorageSection(), 'storage'));
    controlsPanel.appendChild(applySectionToggle(buildScreenSection(), 'screen'));
    controlsPanel.appendChild(applySectionToggle(buildConnectivitySection(), 'connectivity'));
    controlsPanel.appendChild(applySectionToggle(buildRamSection(), 'ram'));
    controlsPanel.appendChild(applySectionToggle(buildGpuSection(), 'gpu'));
    controlsPanel.appendChild(
      applySectionToggle(buildOsSection(), 'os')
    );
    return;
  }

  controlsPanel.appendChild(
    buildTileSection(labels.sections.theme, 'theme', options.theme, (value) => labels.themeNames[value] || value)
  );
  controlsPanel.appendChild(applySectionToggle(buildTitleBadgeSection(), 'titleBadge'));
  controlsPanel.appendChild(applySectionToggle(buildTileSection(labels.sections.type, 'type', options.type), 'type'));
  controlsPanel.appendChild(
    applySectionToggle(buildOsSection(), 'os')
  );
  controlsPanel.appendChild(
    applySectionToggle(buildGuaranteeSection(), 'guarantee')
  );
  controlsPanel.appendChild(
    applySectionToggle(
      buildProcessorSection(),
      'processor'
    )
  );
  controlsPanel.appendChild(applySectionToggle(buildScreenSection(), 'screen'));
  controlsPanel.appendChild(
    applySectionToggle(buildBatterySection(), 'battery')
  );
  controlsPanel.appendChild(applySectionToggle(buildStorageSection(), 'storage'));
  controlsPanel.appendChild(applySectionToggle(buildRamSection(), 'ram'));
  controlsPanel.appendChild(
    applySectionToggle(buildSpecificationsSection(), 'specifications')
  );
  controlsPanel.appendChild(applySectionToggle(buildDeviceImageSection(), 'image'));
  controlsPanel.appendChild(applySectionToggle(buildLogoSection(), 'logo'));
  controlsPanel.appendChild(
    applySectionToggle(buildPriceSection(), 'price')
  );
  controlsPanel.appendChild(
    applySectionToggle(buildContactSection(), 'contact')
  );
  controlsPanel.appendChild(buildColorsSection());
  controlsPanel.appendChild(applySectionToggle(buildBadgesSection(), 'badges'));
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

function drawTag(x, y, w, h, color, textA, textB = '', textColor = '#111111', icon = '', headerText = '', metrics = null) {
  const header = String(headerText || '').trim().toUpperCase();
  const contentText = [String(textA || '').trim(), String(textB || '').trim()].filter(Boolean).join(' ');
  const outerColor = color || '#3a82df';
  const innerFill = '#f7fbff';
  const titleH = Math.max(24, Math.round(h * 0.22));
  const outerPad = 6;
  const innerX = x + outerPad;
  const innerY = y + titleH + 2;
  const innerW = w - (outerPad * 2);
  const innerH = Math.max(34, h - titleH - outerPad - 2);

  drawRoundedRect(x, y, w, h, 10, outerColor);
  drawRoundedRect(innerX, innerY, innerW, innerH, 6, innerFill);

  if (header) {
    drawCenteredBadgeLines(
      header,
      x + 8,
      y + 5,
      w - 16,
      Math.max(16, titleH - 8),
      '#ffffff',
      metrics?.headerFontSize || 11,
      metrics?.headerMinSize || 9,
      '800',
      1
    );
  }

  if (icon) {
    drawTagIcon(innerX + 8, innerY + 8, icon, '#2f4f76');
  }

  drawCenteredBadgeLines(
    contentText,
    innerX + 8,
    innerY + 8,
    innerW - 16,
    innerH - 16,
    '#2f4f76',
    metrics?.contentFontSize || 20,
    metrics?.contentMinSize || 12,
    '800',
    3
  );
}

function getResponsiveTagHeight(w, textA, textB = '', headerText = '', icon = '') {
  const contentText = [String(textA || '').trim(), String(textB || '').trim()].filter(Boolean).join(' ');
  const titleH = Math.max(24, Math.round(w * 0.22));
  const contentBlockH = Math.max(54, Math.round(w * 0.58));
  return Math.max(92, titleH + contentBlockH + 8);
}

function getResponsiveProcessorBadgeMetrics(w, primaryText = '', secondaryText = '', tertiaryText = '', headerText = 'PROCESSOR') {
  const leftPad = 14;
  const rightPad = 14;
  const maxTextWidth = Math.max(40, w - leftPad - rightPad);
  const headerSize = fitText(String(headerText), maxTextWidth, '800', 11, 9, 'Segoe UI');
  const primarySize = primaryText ? fitText(String(primaryText), maxTextWidth, '700', 28, 16, 'Segoe UI') : 0;
  const secondarySize = secondaryText ? fitText(String(secondaryText), maxTextWidth, '600', 20, 11, 'Segoe UI') : 0;
  const tertiarySize = tertiaryText ? fitText(String(tertiaryText), maxTextWidth, '600', 16, 10, 'Segoe UI') : 0;
  const lineGap = 1;
  const activeTextLines = [primarySize, secondarySize, tertiarySize].filter((size) => size > 0).length;
  const totalTextHeight = primarySize + secondarySize + tertiarySize + (Math.max(0, activeTextLines - 1) * lineGap);
  const headerTop = 8;
  const headerGap = 3;
  const contentTopPad = 0;
  const contentBottomPad = 8;
  const height = Math.max(74, headerTop + headerSize + headerGap + contentTopPad + totalTextHeight + contentBottomPad);
  return {
    headerSize,
    primarySize,
    secondarySize,
    tertiarySize,
    lineGap,
    headerTop,
    headerGap,
    contentTopPad,
    contentBottomPad,
    height,
  };
}

function getUnifiedStackBadgeMetrics() {
  const badgeKeys = ['processor', 'screen', 'battery', 'storage', 'ram'];
  const baseSizes = badgeKeys.map((key) => getStackBadgeSize(key));
  const maxConfiguredW = Math.max(...baseSizes.map((size) => size.w));
  const maxConfiguredH = Math.max(...baseSizes.map((size) => size.h));

  const contentSamples = [
    [state.processorCore, state.processorNumber, state.processorGeneration].filter(Boolean).join(' '),
    String(state.screenSize || '').trim(),
    String(getBatteryPercentLabel() || '').trim(),
    [state.storageSize, state.storageType].filter(Boolean).join(' '),
    [state.ram, state.ramType].filter(Boolean).join(' '),
  ].filter(Boolean);

  ctx.save();
  ctx.font = '700 18px Segoe UI';
  const widestContent = contentSamples.reduce((max, text) => Math.max(max, ctx.measureText(text).width), 0);
  ctx.restore();

  const sharedW = Math.max(maxConfiguredW, Math.min(150, Math.ceil(widestContent + 20)));
  const sharedH = Math.max(
    maxConfiguredH,
    getResponsiveProcessorBadgeMetrics(
      sharedW,
      state.processorCore,
      state.processorNumber,
      state.processorGeneration,
      state.lang === 'fr' ? 'PROCESSEUR' : 'PROCESSOR'
    ).height,
    getResponsiveTagHeight(sharedW, String(state.screenSize || '').trim(), '', state.lang === 'fr' ? 'ECRAN' : 'SCREEN'),
    getResponsiveTagHeight(sharedW, String(getBatteryPercentLabel() || '').trim(), '', state.lang === 'fr' ? 'BATTERIE' : 'BATTERY'),
    getResponsiveTagHeight(sharedW, String(state.storageSize || '').replace(' ', ''), String(state.storageType || '').trim(), state.lang === 'fr' ? 'DISQUE DUR' : 'HARD DRIVE'),
    getResponsiveTagHeight(sharedW, String(state.ram || '').replace(' ', ''), String(state.ramType || '').trim(), 'RAM')
  );
  const contentFontSize = sharedW >= 138 ? 22 : 20;
  const headerFontSize = sharedW >= 138 ? 10 : 9;
  return {
    w: sharedW,
    h: sharedH,
    contentFontSize,
    contentMinSize: Math.max(12, contentFontSize - 6),
    headerFontSize,
    headerMinSize: headerFontSize,
    primaryFontSize: sharedW >= 138 ? 28 : 26,
    primaryMinSize: 12,
    secondaryFontSize: sharedW >= 138 ? 18 : 16,
    secondaryMinSize: 12,
  };
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

function getRotatedBounds(cx, cy, w, h, rotationDeg = 0) {
  const radians = (Number(rotationDeg) || 0) * (Math.PI / 180);
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));
  const boundsW = (w * cos) + (h * sin);
  const boundsH = (w * sin) + (h * cos);
  return {
    x: cx - (boundsW / 2),
    y: cy - (boundsH / 2),
    w: boundsW,
    h: boundsH,
  };
}

function drawRotatedImageContain(img, x, y, w, h, rotationDeg = 0) {
  const srcRatio = img.width / Math.max(1, img.height);
  const boxRatio = w / Math.max(1, h);
  let drawW = w;
  let drawH = h;

  if (srcRatio > boxRatio) {
    drawH = w / srcRatio;
  } else {
    drawW = h * srcRatio;
  }

  const cx = x + (w / 2);
  const cy = y + (h / 2);
  const radians = (Number(rotationDeg) || 0) * (Math.PI / 180);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(radians);
  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();

  return getRotatedBounds(cx, cy, drawW, drawH, rotationDeg);
}

function drawBurstShape(cx, cy, outerRadius, innerRadius, points, fillStyle) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const angle = (-Math.PI / 2) + (i * Math.PI) / points;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.restore();
}

function drawCleanPriceBadgeShape(x, y, w, h, color) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const radius = Math.min(w, h) / 2;

  ctx.save();
  ctx.shadowColor = 'rgba(20, 25, 30, 0.38)';
  ctx.shadowBlur = Math.round(radius * 0.08);
  ctx.shadowOffsetX = Math.round(radius * 0.05);
  ctx.shadowOffsetY = Math.round(radius * 0.05);
  drawBurstShape(cx, cy, radius * 0.98, radius * 0.93, 48, 'rgba(35, 42, 45, 0.38)');
  ctx.restore();

  const badgeGrad = ctx.createRadialGradient(cx - radius * 0.22, cy - radius * 0.28, radius * 0.05, cx, cy, radius * 0.98);
  badgeGrad.addColorStop(0, shadeHexColor(color, 0.16));
  badgeGrad.addColorStop(0.72, color);
  badgeGrad.addColorStop(1, shadeHexColor(color, -0.08));
  drawBurstShape(cx, cy, radius * 0.94, radius * 0.88, 48, badgeGrad);

  ctx.save();
  ctx.globalAlpha = 0.18;
  drawBurstShape(cx - radius * 0.04, cy - radius * 0.07, radius * 0.78, radius * 0.74, 48, shadeHexColor(color, 0.22));
  ctx.restore();
}

function drawImageCropContain(img, crop, x, y, w, h) {
  const srcRatio = crop.w / crop.h;
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

  ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, dx, dy, drawW, drawH);
}

function drawImageCover(img, x, y, w, h) {
  const imageWidth = img.naturalWidth || img.width;
  const imageHeight = img.naturalHeight || img.height;
  if (!imageWidth || !imageHeight) {
    return;
  }

  const imageRatio = imageWidth / imageHeight;
  const boxRatio = w / h;
  let cropW = imageWidth;
  let cropH = imageHeight;
  let cropX = 0;
  let cropY = 0;

  if (imageRatio > boxRatio) {
    cropW = imageHeight * boxRatio;
    cropX = (imageWidth - cropW) / 2;
  } else {
    cropH = imageWidth / boxRatio;
    cropY = (imageHeight - cropH) / 2;
  }

  ctx.drawImage(img, cropX, cropY, cropW, cropH, x, y, w, h);
}

function loadDefaultLaptopImage() {
  defaultLaptopImageObj = new Image();
  defaultLaptopImageObj.onload = () => drawPoster();
  defaultLaptopImageObj.onerror = () => {
    defaultLaptopImageObj = null;
  };
  defaultLaptopImageObj.src = DEFAULT_LAPTOP_IMAGE_SRC;
}

function loadDefaultPcImage() {
  defaultPcImageObj = new Image();
  defaultPcImageObj.onload = () => drawPoster();
  defaultPcImageObj.onerror = () => {
    defaultPcImageObj = null;
  };
  defaultPcImageObj.src = DEFAULT_PC_IMAGE_SRC;
}

function loadGeneratorBackgroundImage() {
  const source = state.diffBackgroundSelection === 'upload' && state.diffBackgroundUploadDataUrl
    ? state.diffBackgroundUploadDataUrl
    : (GENERATOR_BACKGROUND_PRESETS[state.diffBackgroundSelection] || GENERATOR_BACKGROUND_SRC);
  generatorBackgroundImageObj = new Image();
  generatorBackgroundImageObj.onload = () => drawPoster();
  generatorBackgroundImageObj.onerror = () => {
    generatorBackgroundImageObj = null;
  };
  generatorBackgroundImageObj.src = source;
}

function loadGeneratorPointsTextImage() {
  const source = state.diffPointsTextUploadDataUrl || GENERATOR_POINTS_TEXT_SRC;
  generatorPointsTextImageObj = new Image();
  generatorPointsTextImageObj.onload = () => drawPoster();
  generatorPointsTextImageObj.onerror = () => {
    generatorPointsTextImageObj = null;
    drawPoster();
  };
  generatorPointsTextImageObj.src = source;
}

function loadGeneratorPriceTagImage() {
  generatorPriceTagImageObj = new Image();
  generatorPriceTagImageObj.onload = () => drawPoster();
  generatorPriceTagImageObj.onerror = () => {
    generatorPriceTagImageObj = null;
    drawPoster();
  };
  generatorPriceTagImageObj.src = GENERATOR_PRICE_TAG_SRC;
}

function loadGeneratorReconditionedImage() {
  const source = state.diffReconditionedUploadDataUrl || GENERATOR_RECONDITIONED_SRC;
  generatorReconditionedImageObj = new Image();
  generatorReconditionedImageObj.onload = () => drawPoster();
  generatorReconditionedImageObj.onerror = () => {
    generatorReconditionedImageObj = null;
    drawPoster();
  };
  generatorReconditionedImageObj.src = source;
}

function loadGeneratorSideGuaranteeImage(source) {
  generatorSideGuaranteeImageObj = new Image();
  generatorSideGuaranteeImageObj.onload = () => drawPoster();
  generatorSideGuaranteeImageObj.onerror = () => {
    generatorSideGuaranteeImageObj = null;
  };
  generatorSideGuaranteeImageObj.src = source;
}

function getDeviceImageBoxRect() {
  const cardX = 28;
  const cardY = 30;
  const cardW = canvas.width - 56;
  const deviceOffset = getLayoutOffset(state.generator === 'diff' ? 'diffDevice' : 'device');
  if (state.generator === 'diff') {
    return state.type === 'Laptop'
      ? { x: cardX + 92 + deviceOffset.x, y: cardY + 185 + deviceOffset.y, w: 520, h: 380 }
      : { x: cardX + 86 + deviceOffset.x, y: cardY + 195 + deviceOffset.y, w: 540, h: 398 };
  }
  return state.type === 'Laptop'
    ? { x: cardX + 148 + deviceOffset.x, y: cardY + 220 + deviceOffset.y, w: 510, h: 360 }
    : { x: cardX + 140 + deviceOffset.x, y: cardY + 220 + deviceOffset.y, w: 560, h: 430 };
}

function getDefaultLaptopImageRect() {
  const box = getDeviceImageBoxRect();
  const size = normalizeBoxSize(state.defaultLaptopImageSize, DEFAULT_LAPTOP_IMAGE_SIZE);
  return {
    x: box.x,
    y: box.y,
    w: size.w,
    h: size.h,
  };
}

function getDefaultPcImageRect() {
  const box = getDeviceImageBoxRect();
  const size = normalizeBoxSize(state.defaultPcImageSize, DEFAULT_PC_IMAGE_SIZE);
  return {
    x: box.x,
    y: box.y,
    w: size.w,
    h: size.h,
  };
}

function isDefaultDeviceImageId(id) {
  return id === DEFAULT_PC_IMAGE_ID || id === DEFAULT_LAPTOP_IMAGE_ID;
}

function getDefaultDeviceImageSize(id) {
  return id === DEFAULT_PC_IMAGE_ID
    ? normalizeBoxSize(state.defaultPcImageSize, DEFAULT_PC_IMAGE_SIZE)
    : normalizeBoxSize(state.defaultLaptopImageSize, DEFAULT_LAPTOP_IMAGE_SIZE);
}

function setDefaultDeviceImageSize(id, size) {
  if (id === DEFAULT_PC_IMAGE_ID) {
    state.defaultPcImageSize = size;
  } else {
    state.defaultLaptopImageSize = size;
  }
}

function drawDefaultDeviceImage(imageObj, crop, imageBox, id, isSelected) {
  drawImageCropContain(imageObj, crop, imageBox.x, imageBox.y, imageBox.w, imageBox.h);
  const handleSize = 12;
  let handle = null;
  if (isSelected) {
    ctx.save();
    ctx.strokeStyle = '#0a84ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(imageBox.x, imageBox.y, imageBox.w, imageBox.h);
    ctx.restore();
    handle = {
      x: imageBox.x + imageBox.w - handleSize / 2,
      y: imageBox.y + imageBox.h - handleSize / 2,
      w: handleSize,
      h: handleSize,
    };
    drawRoundedRect(handle.x, handle.y, handle.w, handle.h, 3, '#0a84ff');
  }
  deviceImageHandles.push({
    id,
    body: { x: imageBox.x, y: imageBox.y, w: imageBox.w, h: imageBox.h },
    handle,
    z: 0,
  });
  registerDraggableRegion(state.generator === 'diff' ? 'diffDevice' : 'device', imageBox.x, imageBox.y, imageBox.w, imageBox.h);
  registerRemovableElement(imageBox.x, imageBox.y, imageBox.w, imageBox.h, () => {
    state.sectionEnabled.type = false;
  });
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
  drawRoundedRect(x, y, w, h, 14, '#ffffff');
  ctx.save();
  ctx.lineWidth = 2;
  drawRoundedRect(x, y, w, h, 14, null, '#111111');
  ctx.restore();

  ctx.fillStyle = '#111111';
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

function resolveCurrencyParts(currencyValue = state.currency) {
  const currency = String(currencyValue || '').trim();
  const upperCurrency = currency.toUpperCase();
  if (upperCurrency === 'EUR' || currency === '€') {
    return { prefix: '€', suffix: '' };
  }
  if (upperCurrency === 'USD' || currency === '$') {
    return { prefix: '$', suffix: '' };
  }
  if (upperCurrency === 'GBP' || currency === '£') {
    return { prefix: '£', suffix: '' };
  }
  if (!currency) {
    return { prefix: '', suffix: '' };
  }
  return { prefix: `${currency} `, suffix: '' };
}

function splitPriceDisplay(rawInput = state.price) {
  const value = String(rawInput || '').trim();
  if (!value) {
    return { prefix: '', value: '', suffix: '' };
  }
  const explicitPrefixMatch = value.match(/^([$€£])\s*(.*)$/);
  if (explicitPrefixMatch) {
    return { prefix: explicitPrefixMatch[1], value: explicitPrefixMatch[2] || '', suffix: '' };
  }
  const explicitSuffixMatch = value.match(/^(.*?)([$€£])$/);
  if (explicitSuffixMatch) {
    return { prefix: explicitSuffixMatch[2], value: explicitSuffixMatch[1] || '', suffix: '' };
  }
  const { prefix, suffix } = resolveCurrencyParts();
  return { prefix, value, suffix };
}

function getInlinePriceText(rawInput) {
  const display = splitPriceDisplay(rawInput);
  if (!display.value) {
    return '';
  }
  const amount = splitPriceNumberParts(display.value);
  const body = amount.whole || display.value;
  const decimal = amount.hasDecimal ? `.${amount.fractional}` : '';
  return `${display.prefix}${body}${decimal}${display.suffix}`.trim();
}

function measurePriceTagAmount(parts, mainSize, fractionalSize) {
  ctx.font = `900 ${mainSize}px Segoe UI`;
  const prefixWidth = parts.prefix ? ctx.measureText(parts.prefix).width : 0;
  const wholeWidth = parts.whole ? ctx.measureText(parts.whole).width : 0;
  const suffixWidth = parts.suffix ? ctx.measureText(parts.suffix).width : 0;
  ctx.font = `900 ${fractionalSize}px Segoe UI`;
  const fractionalWidth = parts.hasDecimal ? ctx.measureText(`.${parts.fractional}`).width : 0;
  return prefixWidth + wholeWidth + fractionalWidth + suffixWidth;
}

function fitPriceTagAmountSize(parts, maxWidth, startSize = 62, minSize = 24) {
  let mainSize = startSize;
  while (mainSize > minSize) {
    const fractionalSize = Math.max(14, Math.round(mainSize * 0.54));
    if (measurePriceTagAmount(parts, mainSize, fractionalSize) <= maxWidth) {
      return { mainSize, fractionalSize };
    }
    mainSize -= 1;
  }
  return { mainSize: minSize, fractionalSize: Math.max(14, Math.round(minSize * 0.54)) };
}

function splitPriceNumberParts(rawValue) {
  const normalized = String(rawValue || '').trim().replace(',', '.');
  if (!normalized) {
    return { whole: '', fractional: '', hasDecimal: false };
  }
  const match = normalized.match(/^(\d+)(?:\.(\d+))?$/);
  if (match) {
    return {
      whole: match[1] || '',
      fractional: match[2] || '',
      hasDecimal: !!match[2],
    };
  }
  const lastDotIndex = normalized.lastIndexOf('.');
  if (lastDotIndex > 0 && lastDotIndex < normalized.length - 1) {
    return {
      whole: normalized.slice(0, lastDotIndex),
      fractional: normalized.slice(lastDotIndex + 1),
      hasDecimal: true,
    };
  }
  return { whole: normalized, fractional: '', hasDecimal: false };
}

function getPriceTagRect(cardX, cardY, cardW) {
  const priceParts = splitPriceDisplay(state.price);
  if (state.sectionEnabled.price === false || !priceParts.value) {
    return null;
  }
  const hasCustomTagImage = !!(generatorPriceTagImageObj && generatorPriceTagImageObj.complete);
  let baseX = state.generator === 'diff' ? cardX + 24 : cardX + cardW - 262;
  let baseY = state.generator === 'diff' ? cardY + 58 : cardY + 34;

  if (state.generator !== 'diff' && state.sectionEnabled.badges !== false && state.sectionEnabled.logo !== false && state.showLogoBadge) {
    const logoOffset = getLayoutOffset('logo');
    const logoBadgeX = cardX + cardW - (state.generator === 'charger' ? 178 : 184) + logoOffset.x;
    baseX = Math.max(cardX + 24, logoBadgeX - 270);
  }

  const priceOffsetKey = state.generator === 'diff' ? 'diffPrice' : 'price';
  const priceOffset = getLayoutOffset(priceOffsetKey);
  const oldPriceText = getInlinePriceText(state.oldPrice || state.diffOldPrice);
  return {
    x: baseX + priceOffset.x,
    y: baseY + priceOffset.y,
    w: hasCustomTagImage ? 262 : 238,
    h: hasCustomTagImage ? 118 : 88,
    oldPriceText,
    oldPriceHeight: oldPriceText ? 32 : 0,
  };
}

function drawPriceBadge(cardX, cardY, cardW, cardH, theme) {
  const priceRect = getPriceTagRect(cardX, cardY, cardW);
  if (!priceRect) {
    priceBadgeBodyRect = null;
    return;
  }
  const {
    x: badgeX,
    y: badgeY,
    w: badgeW,
    h: badgeH,
    oldPriceText,
    oldPriceHeight,
  } = priceRect;
  const display = splitPriceDisplay(state.price);
  const amount = splitPriceNumberParts(display.value);
  const badgeColor = isHexColor(theme.priceBox) ? theme.priceBox : '#ff2128';
  const textColor = isHexColor(theme.priceText) ? theme.priceText : '#ffffff';
  const hasCustomTagImage = !!(generatorPriceTagImageObj && generatorPriceTagImageObj.complete);
  const rotationDeg = Number(state.priceRotation) || 0;
  const amountParts = {
    prefix: display.prefix,
    whole: amount.whole || display.value,
    fractional: amount.fractional,
    hasDecimal: amount.hasDecimal,
    suffix: display.suffix,
  };
  const titleText = String(t().sections.price || 'Price').toUpperCase();
  const badgeGroupW = badgeW;
  const badgeGroupH = badgeH + oldPriceHeight;
  const badgeCenterX = badgeX + (badgeGroupW / 2);
  const badgeCenterY = badgeY + (badgeGroupH / 2);
  const badgeLeft = -badgeGroupW / 2;
  const badgeTop = -badgeGroupH / 2;
  const textAreaX = hasCustomTagImage ? badgeLeft + Math.round(badgeW * 0.18) : badgeLeft;
  const textAreaW = hasCustomTagImage ? Math.round(badgeW * 0.74) : badgeW;
  const titleSize = fitText(titleText, textAreaW - 28, '800', 18, 10, 'Segoe UI');
  const { mainSize, fractionalSize } = fitPriceTagAmountSize(amountParts, textAreaW - 20, 62, 25);
  const rotatedBounds = getRotatedBounds(badgeCenterX, badgeCenterY, badgeGroupW, badgeGroupH, rotationDeg);
  priceBadgeBodyRect = rotatedBounds;

  ctx.save();
  ctx.translate(badgeCenterX, badgeCenterY);
  ctx.rotate((rotationDeg * Math.PI) / 180);
  if (hasCustomTagImage) {
    ctx.drawImage(
      generatorPriceTagImageObj,
      GENERATOR_PRICE_TAG_CROP.x,
      GENERATOR_PRICE_TAG_CROP.y,
      GENERATOR_PRICE_TAG_CROP.w,
      GENERATOR_PRICE_TAG_CROP.h,
      badgeLeft,
      badgeTop,
      badgeW,
      badgeH
    );
  } else {
    const badgeGradient = ctx.createLinearGradient(badgeLeft, badgeTop, badgeLeft + badgeW, badgeTop + badgeH);
    badgeGradient.addColorStop(0, shadeHexColor(badgeColor, 0.18));
    badgeGradient.addColorStop(1, shadeHexColor(badgeColor, -0.1));
    drawRoundedRect(badgeLeft, badgeTop, badgeW, badgeH, 18, badgeGradient);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.moveTo(badgeLeft + badgeW * 0.58, badgeTop);
    ctx.lineTo(badgeLeft + badgeW, badgeTop);
    ctx.lineTo(badgeLeft + badgeW, badgeTop + badgeH * 0.42);
    ctx.closePath();
    ctx.fill();
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = 'rgba(255,255,255,0.94)';
  ctx.font = `800 ${titleSize}px Segoe UI`;
  ctx.fillText(titleText, textAreaX + (textAreaW / 2), badgeTop + (hasCustomTagImage ? 29 : 21));

  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(textAreaX + 16, badgeTop + (hasCustomTagImage ? 38 : 30));
  ctx.lineTo(textAreaX + textAreaW - 16, badgeTop + (hasCustomTagImage ? 38 : 30));
  ctx.stroke();

  const totalWidth = measurePriceTagAmount(amountParts, mainSize, fractionalSize);
  const amountStartX = textAreaX + Math.round((textAreaW - totalWidth) / 2);
  const amountBaselineY = badgeTop + Math.round(badgeH * (hasCustomTagImage ? 0.77 : 0.82));
  const fractionalText = amountParts.hasDecimal ? `.${amountParts.fractional}` : '';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = textColor;
  ctx.font = `900 ${mainSize}px Segoe UI`;
  const prefixWidth = amountParts.prefix ? ctx.measureText(amountParts.prefix).width : 0;
  const wholeWidth = amountParts.whole ? ctx.measureText(amountParts.whole).width : 0;
  const suffixWidth = amountParts.suffix ? ctx.measureText(amountParts.suffix).width : 0;

  let cursorX = amountStartX;
  if (amountParts.prefix) {
    ctx.fillText(amountParts.prefix, cursorX, amountBaselineY);
    cursorX += prefixWidth;
  }
  ctx.fillText(amountParts.whole, cursorX, amountBaselineY);
  cursorX += wholeWidth;

  if (fractionalText) {
    ctx.font = `900 ${fractionalSize}px Segoe UI`;
    ctx.fillText(fractionalText, cursorX, amountBaselineY - Math.round(mainSize * 0.18));
    cursorX += ctx.measureText(fractionalText).width;
    ctx.font = `900 ${mainSize}px Segoe UI`;
  }
  if (amountParts.suffix) {
    ctx.fillText(amountParts.suffix, cursorX, amountBaselineY);
    cursorX += suffixWidth;
  }

  if (oldPriceText) {
    const oldSize = fitText(oldPriceText, badgeW - 22, '700', 26, 12, 'Segoe UI');
    const oldY = badgeTop + badgeH + 24;
    ctx.font = `700 ${oldSize}px Segoe UI`;
    const textWidth = ctx.measureText(oldPriceText).width;
    const oldCenterX = hasCustomTagImage ? textAreaX + (textAreaW / 2) : badgeLeft + (badgeW / 2);
    const oldX = Math.round(oldCenterX - (textWidth / 2));
    ctx.fillStyle = '#3f4048';
    ctx.fillText(oldPriceText, oldX, oldY);
    ctx.strokeStyle = '#5a5d67';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(oldX - 4, oldY - Math.round(oldSize * 0.42));
    ctx.lineTo(oldX + textWidth + 4, oldY - Math.round(oldSize * 0.42));
    ctx.stroke();
  }
  ctx.restore();

  if (isPriceBadgeSelected) {
    ctx.save();
    ctx.strokeStyle = '#2c8eff';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(rotatedBounds.x, rotatedBounds.y, rotatedBounds.w, rotatedBounds.h);
    ctx.restore();
  }

  registerDraggableRegion(
    state.generator === 'diff' ? 'diffPrice' : 'price',
    rotatedBounds.x,
    rotatedBounds.y,
    rotatedBounds.w,
    rotatedBounds.h
  );
  registerRemovableElement(rotatedBounds.x, rotatedBounds.y, rotatedBounds.w, rotatedBounds.h, () => {
    state.sectionEnabled.price = false;
  });
}

function getContactTypeLabel(type) {
  const rawType = String(type || '').trim();
  const normalizedType = rawType.toLowerCase();
  if (normalizedType === 'email') {
    return t().labels.contactEmail;
  }
  if (normalizedType === 'website') {
    return t().labels.contactWebsite;
  }
  if (normalizedType === 'address') {
    return t().labels.contactAddress;
  }
  if (normalizedType === 'phone') {
    return t().labels.contactPhone;
  }
  return rawType || t().labels.contactPhone;
}

function drawContactBadge(cardX, cardY, cardW, cardH, theme) {
  if (state.sectionEnabled.contact === false) {
    return;
  }

  const rows = (Array.isArray(state.contactItems) ? state.contactItems : [])
    .map((item) => ({
      label: getContactTypeLabel(item.type),
      value: String(item.value || '').trim(),
    }))
    .filter((item) => item.value);

  if (rows.length === 0) {
    return;
  }

  ctx.font = '900 17px Segoe UI';
  const title = t().sections.contact.toUpperCase();
  const titleWidth = ctx.measureText(title).width;
  const contactParts = rows.map((row) => ({
    text: `${row.label.toUpperCase()}: ${row.value}`,
  }));
  ctx.font = '900 18px Segoe UI';
  const contentWidth = contactParts.reduce((sum, part, idx) => {
    const partWidth = ctx.measureText(part.text).width;
    const separatorWidth = idx < contactParts.length - 1 ? 26 : 0;
    return sum + partWidth + separatorWidth;
  }, 0);

  const contactOffset = getLayoutOffset('contact');
  const badgeW = Math.max(420, Math.min(cardW - 60, Math.ceil(Math.max(titleWidth + 64, contentWidth + 64))));
  const badgeH = 110;
  const priceRect = getPriceBadgeRect(cardX, cardY, cardW, cardH);
  const deviceRect = state.generator === 'device' ? getDeviceImageBoxRect() : null;
  const bottomY = cardY + cardH - badgeH - 28;
  let badgeX = deviceRect
    ? deviceRect.x + Math.round((deviceRect.w - badgeW) / 2) + contactOffset.x
    : cardX + cardW - badgeW - 34 + contactOffset.x;
  badgeX = Math.max(cardX + 24, Math.min(cardX + cardW - badgeW - 24, badgeX));
  let badgeY = deviceRect
    ? Math.min(bottomY, deviceRect.y + deviceRect.h + 18 + contactOffset.y)
    : bottomY + contactOffset.y;

  if (priceRect) {
    const overlapsPrice = !(
      badgeX + badgeW + 18 <= priceRect.x
      || badgeX >= priceRect.x + priceRect.w + 18
      || badgeY + badgeH + 12 <= priceRect.y
      || badgeY >= priceRect.y + priceRect.h + 12
    );
    if (overlapsPrice) {
      const shiftedLeftX = priceRect.x - badgeW - 26 + contactOffset.x;
      badgeX = Math.max(cardX + 24, Math.min(cardX + cardW - badgeW - 24, shiftedLeftX));
      badgeY = bottomY;
    }
  }

  drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 16, theme.specOuter);
  const bg = ctx.createLinearGradient(badgeX + 6, badgeY + 6, badgeX + badgeW - 6, badgeY + badgeH - 6);
  bg.addColorStop(0, theme.specInnerA);
  bg.addColorStop(1, theme.specInnerB);
  drawRoundedRect(badgeX + 6, badgeY + 6, badgeW - 12, badgeH - 12, 14, bg);

  ctx.fillStyle = theme.specValue;
  ctx.font = '900 17px Segoe UI';
  ctx.fillText(title, badgeX + 22, badgeY + 32);
  drawRoundedRect(badgeX + 20, badgeY + 45, badgeW - 40, 2, 1, 'rgba(255,255,255,0.42)');

  ctx.save();
  ctx.textBaseline = 'middle';
  ctx.fillStyle = theme.specValue;
  const contentFontSize = fitText(
    contactParts.map((part) => part.text).join(' | '),
    badgeW - 44,
    '900',
    18,
    14,
    'Segoe UI'
  );
  ctx.font = `900 ${contentFontSize}px Segoe UI`;
  let cursorX = badgeX + 22;
  const contentY = badgeY + 78;
  contactParts.forEach((part, idx) => {
    ctx.fillText(part.text, cursorX, contentY);
    const partWidth = ctx.measureText(part.text).width;
    cursorX += partWidth;
    if (idx < contactParts.length - 1) {
      const dividerX = cursorX + 13;
      ctx.strokeStyle = theme.specDivider || 'rgba(255,255,255,0.42)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dividerX, contentY - 10);
      ctx.lineTo(dividerX, contentY + 10);
      ctx.stroke();
      cursorX += 26;
    }
  });
  ctx.restore();

  registerDraggableRegion('contact', badgeX, badgeY, badgeW, badgeH);
  registerRemovableElement(badgeX, badgeY, badgeW, badgeH, () => {
    state.sectionEnabled.contact = false;
  });
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
  const raw = String(state.batteryPercentage || '').trim();
  if (!raw) {
    return '0%';
  }
  if (/^\d+$/.test(raw)) {
    const clamped = Math.max(0, Math.min(100, Number(raw)));
    return `${clamped}%`;
  }
  return raw;
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

function getGuaranteeBoxDefaultText() {
  return state.lang === 'fr' ? 'TEXTE ICI' : 'YOUR TEXT HERE';
}

function getGuaranteeCaptionDefaultText() {
  return state.lang === 'fr' ? '12 MOIS DE GARANTIE' : '12 MONTHS OF GUARANTEE';
}

function normalizeGuaranteeBoxText() {
  const raw = String(state.guaranteeText || '').trim();
  if (!raw || raw.toUpperCase() === 'YOUR TEXT HERE' || raw.toUpperCase() === 'TEXTE ICI') {
    return getGuaranteeBoxDefaultText();
  }
  return raw;
}

function normalizeGuaranteeCaptionText() {
  const raw = String(state.guaranteePeriod || '').trim();
  if (
    !raw
    || raw.toUpperCase() === '12 MONTHS'
    || raw.toUpperCase() === '12 MONTHS OF GUARANTEE'
    || raw.toUpperCase() === '12 MOIS'
    || raw.toUpperCase() === '12 MOIS DE GARANTIE'
  ) {
    return getGuaranteeCaptionDefaultText();
  }
  return raw;
}

function localizeSpecCardTitle(title) {
  const raw = String(title || '').trim();
  if (!raw) {
    return t().specTitle;
  }

  const normalized = raw.toLowerCase();
  const titleMap = {
    specifications: { en: 'Specifications', fr: 'Caracteristiques' },
    caracteristiques: { en: 'Specifications', fr: 'Caracteristiques' },
    connectivity: { en: 'Connectivity', fr: 'Connectivite' },
    connectivite: { en: 'Connectivity', fr: 'Connectivite' },
    power: { en: 'Power', fr: 'Alimentation' },
    'power supply': { en: 'Power Supply', fr: 'Alimentation' },
    alimentation: { en: 'Power Supply', fr: 'Alimentation' },
    ports: { en: 'Ports', fr: 'Ports' },
    display: { en: 'Display', fr: 'Affichage' },
    affichage: { en: 'Display', fr: 'Affichage' },
    storage: { en: 'Storage', fr: 'Stockage' },
    stockage: { en: 'Storage', fr: 'Stockage' },
    battery: { en: 'Battery', fr: 'Batterie' },
    batterie: { en: 'Battery', fr: 'Batterie' },
  };

  const mapped = titleMap[normalized];
  if (mapped) {
    return state.lang === 'fr' ? mapped.fr : mapped.en;
  }
  return raw;
}

function localizeSpecRowText(text) {
  const raw = String(text || '').trim();
  if (!raw) {
    return '';
  }

  const normalized = raw.toLowerCase();
  const textMap = {
    yes: { en: 'Yes', fr: 'Oui' },
    oui: { en: 'Yes', fr: 'Oui' },
    no: { en: 'No', fr: 'Non' },
    non: { en: 'No', fr: 'Non' },
    processor: { en: 'Processor', fr: 'Processeur' },
    processeur: { en: 'Processor', fr: 'Processeur' },
    generation: { en: 'Generation', fr: 'Generation' },
    ram: { en: 'RAM', fr: 'RAM' },
    harddrive: { en: 'Hard Drive', fr: 'Disque Dur' },
    'hard drive': { en: 'Hard Drive', fr: 'Disque Dur' },
    'disque dur': { en: 'Hard Drive', fr: 'Disque Dur' },
    keyboardbacklight: { en: 'Keyboard Backlight', fr: 'Retroeclairage Clavier' },
    'keyboard backlight': { en: 'Keyboard Backlight', fr: 'Retroeclairage Clavier' },
    'retroeclairage clavier': { en: 'Keyboard Backlight', fr: 'Retroeclairage Clavier' },
    usb: { en: 'USB', fr: 'USB' },
    'wi-fi': { en: 'Wi-Fi', fr: 'Wi-Fi' },
    wifi: { en: 'Wi-Fi', fr: 'Wi-Fi' },
    battery: { en: 'Battery', fr: 'Batterie' },
    batterie: { en: 'Battery', fr: 'Batterie' },
    storage: { en: 'Storage', fr: 'Stockage' },
    stockage: { en: 'Storage', fr: 'Stockage' },
    screen: { en: 'Screen', fr: 'Ecran' },
    ecran: { en: 'Screen', fr: 'Ecran' },
    power: { en: 'Power', fr: 'Puissance' },
    puissance: { en: 'Power', fr: 'Puissance' },
    voltage: { en: 'Voltage', fr: 'Tension' },
    tension: { en: 'Voltage', fr: 'Tension' },
    connectivity: { en: 'Connectivity', fr: 'Connectivite' },
    connectivite: { en: 'Connectivity', fr: 'Connectivite' },
  };

  const mapped = textMap[normalized];
  if (mapped) {
    return state.lang === 'fr' ? mapped.fr : mapped.en;
  }
  return raw;
}

function getSpecRowLine(row) {
  if (!row) {
    return '';
  }
  const directText = row.text || row.textEn || row.textFr || '';
  if (String(directText).trim()) {
    return localizeSpecRowText(directText);
  }
  const left = row.left || row.leftEn || row.leftFr || '';
  const right = row.right || row.rightEn || row.rightFr || '';
  return localizeSpecRowText([left, right].filter(Boolean).join(' ').trim());
}

function buildWrappedBadgeLines(text, maxWidth, fontSize, weight = 'bold', maxLines = 2, family = 'Segoe UI', fontStyle = '') {
  const normalized = String(text || '').trim().replace(/\s+/g, ' ');
  if (!normalized) {
    return [];
  }
  const words = normalized.split(' ');
  ctx.save();
  ctx.font = `${fontStyle}${weight} ${fontSize}px ${family}`;
  const lines = [];
  let current = words[0] || '';
  for (let i = 1; i < words.length; i += 1) {
    const candidate = `${current} ${words[i]}`;
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = words[i];
  }
  if (current) {
    lines.push(current);
  }
  ctx.restore();
  return lines;
}

function drawCenteredBadgeLines(text, x, y, w, h, color, maxSize, minSize, weight = 'bold', maxLines = 2, family = 'Segoe UI', fontStyle = '', underline = false) {
  let lines = [];
  let fontSize = minSize;

  for (let size = maxSize; size >= minSize; size -= 1) {
    const candidateLines = buildWrappedBadgeLines(text, w, size, weight, maxLines, family, fontStyle);
    const lineGap = candidateLines.length > 1 ? Math.max(2, Math.round(size * 0.16)) : 0;
    const blockHeight = (candidateLines.length * size) + ((candidateLines.length - 1) * lineGap);
    ctx.save();
    ctx.font = `${fontStyle}${weight} ${size}px ${family}`;
    const widestLine = candidateLines.reduce((max, line) => Math.max(max, ctx.measureText(line).width), 0);
    ctx.restore();
    if (candidateLines.length <= maxLines && blockHeight <= h && widestLine <= w) {
      lines = candidateLines;
      fontSize = size;
      break;
    }
  }

  if (!lines.length) {
    lines = buildWrappedBadgeLines(text, w, minSize, weight, maxLines, family, fontStyle).slice(0, maxLines);
    fontSize = minSize;
  }

  const lineGap = lines.length > 1 ? Math.max(2, Math.round(fontSize * 0.16)) : 0;
  const blockHeight = (lines.length * fontSize) + ((lines.length - 1) * lineGap);
  let lineY = y + Math.max(0, ((h - blockHeight) / 2));

  ctx.save();
  ctx.textBaseline = 'top';
  ctx.fillStyle = color;
  ctx.font = `${fontStyle}${weight} ${fontSize}px ${family}`;
  lines.forEach((line) => {
    const lineWidth = ctx.measureText(line).width;
    const lineX = x + ((w - lineWidth) / 2);
    ctx.fillText(line, lineX, lineY);
    if (underline) {
      const underlineY = lineY + fontSize + Math.max(1, Math.round(fontSize * 0.06));
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1.5, Math.round(fontSize * 0.06));
      ctx.beginPath();
      ctx.moveTo(lineX, underlineY);
      ctx.lineTo(lineX + lineWidth, underlineY);
      ctx.stroke();
      ctx.restore();
    }
    lineY += fontSize + lineGap;
  });
  ctx.restore();
}

function drawResizeHandle(x, y, w, h, targetW, targetH, selected, minW, minH, rectRefSetter) {
  if (!selected) {
    rectRefSetter(null);
    return;
  }
  const handleSize = 14;
  const hitPad = 8;
  const handleX = x + w - handleSize / 2;
  const handleY = y + h - handleSize / 2;
  drawRoundedRect(handleX, handleY, handleSize, handleSize, 3, '#0a84ff');
  rectRefSetter({
    x: handleX - hitPad,
    y: handleY - hitPad,
    w: handleSize + (hitPad * 2),
    h: handleSize + (hitPad * 2),
    targetW,
    targetH,
    minW,
    minH,
  });
}

function findTopDiffBrandBoxCropHandle(point) {
  for (let i = diffBrandBoxCropHandleRects.length - 1; i >= 0; i -= 1) {
    const rect = diffBrandBoxCropHandleRects[i];
    if (pointInRect(point, rect)) {
      return rect;
    }
  }
  return null;
}

function clampDiffBrandBoxCrop(crop, baseW, baseH) {
  const minW = 16;
  const minH = 16;
  let left = Math.max(0, Math.round(Number(crop?.left) || 0));
  let right = Math.max(0, Math.round(Number(crop?.right) || 0));
  let top = Math.max(0, Math.round(Number(crop?.top) || 0));
  let bottom = Math.max(0, Math.round(Number(crop?.bottom) || 0));

  const maxCropX = Math.max(0, Math.round(baseW - minW));
  const maxCropY = Math.max(0, Math.round(baseH - minH));

  left = Math.min(left, maxCropX);
  right = Math.min(right, maxCropX);
  top = Math.min(top, maxCropY);
  bottom = Math.min(bottom, maxCropY);

  if (left + right > maxCropX) {
    right = Math.max(0, maxCropX - left);
  }
  if (top + bottom > maxCropY) {
    bottom = Math.max(0, maxCropY - top);
  }

  return { left, right, top, bottom };
}

function drawDiffBrandBoxCropHandles(rect) {
  diffBrandBoxCropHandleRects = [];
  if (!rect || !isDiffBrandBoxSelected || !state.diffBrandBoxCropEnabled) {
    return;
  }
  ctx.save();
  ctx.strokeStyle = '#0a84ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

  const handleSize = 12;
  const hitPad = 8;
  const handles = [
    {
      side: 'left',
      cursor: 'ew-resize',
      x: rect.x - (handleSize / 2),
      y: rect.y + (rect.h / 2) - (handleSize / 2),
    },
    {
      side: 'right',
      cursor: 'ew-resize',
      x: rect.x + rect.w - (handleSize / 2),
      y: rect.y + (rect.h / 2) - (handleSize / 2),
    },
    {
      side: 'top',
      cursor: 'ns-resize',
      x: rect.x + (rect.w / 2) - (handleSize / 2),
      y: rect.y - (handleSize / 2),
    },
    {
      side: 'bottom',
      cursor: 'ns-resize',
      x: rect.x + (rect.w / 2) - (handleSize / 2),
      y: rect.y + rect.h - (handleSize / 2),
    },
  ];

  handles.forEach((handle) => {
    drawRoundedRect(handle.x, handle.y, handleSize, handleSize, 3, '#0a84ff');
    diffBrandBoxCropHandleRects.push({
      side: handle.side,
      cursor: handle.cursor,
      x: handle.x - hitPad,
      y: handle.y - hitPad,
      w: handleSize + (hitPad * 2),
      h: handleSize + (hitPad * 2),
    });
  });
  ctx.restore();
}

function registerStackBadgeResizeHandle(key, x, y, w, h) {
  stackBadgeRects.push({ key, x, y, w, h });
  if (selectedStackBadgeKey !== key) {
    return;
  }
  const handleSize = 12;
  const hitPad = 8;
  const handleX = x + w - handleSize / 2;
  const handleY = y + h - handleSize / 2;
  drawRoundedRect(handleX, handleY, handleSize, handleSize, 3, '#0a84ff');
  stackBadgeResizeHandleRects.push({
    key,
    x: handleX - hitPad,
    y: handleY - hitPad,
    w: handleSize + (hitPad * 2),
    h: handleSize + (hitPad * 2),
    minW: 86,
    minH: 86,
  });
}

function findTopStackBadgeHandle(point) {
  for (let i = stackBadgeResizeHandleRects.length - 1; i >= 0; i -= 1) {
    const rect = stackBadgeResizeHandleRects[i];
    if (pointInRect(point, rect)) {
      return rect;
    }
  }
  return null;
}

function findTopStackBadgeBody(point) {
  for (let i = stackBadgeRects.length - 1; i >= 0; i -= 1) {
    const rect = stackBadgeRects[i];
    if (pointInRect(point, rect)) {
      return rect;
    }
  }
  return null;
}

function drawChargerPoster(cardX, cardY, cardW, cardH, theme) {
  const titleOffset = getLayoutOffset('storage');
  const titleText = (state.chargerTitle || 'FAST CHARGER').trim().toUpperCase();
  const titleX = Math.max(cardX + 34, cardX + 34 + titleOffset.x);
  const titleY = cardY + 96 + titleOffset.y;
  const titleMaxWidth = Math.max(180, (cardX + cardW - 220) - titleX);
  ctx.fillStyle = theme.title;
  const titleSize = fitText(titleText, titleMaxWidth, 'italic bold', 76, 26, 'Segoe UI');
  ctx.font = `italic bold ${titleSize}px Segoe UI`;
  ctx.fillText(titleText, titleX, titleY);
  registerDraggableRegion('storage', titleX - 8, titleY - titleSize, titleMaxWidth + 16, titleSize + 20);
  registerRemovableElement(titleX - 8, titleY - titleSize, titleMaxWidth + 16, titleSize + 20, () => {
    state.chargerTitle = '';
  });

  const showTopGuarantee = state.sectionEnabled.badges !== false
    && state.sectionEnabled.guarantee !== false
    && state.showGuaranteeBadge;
  if (showTopGuarantee) {
    const guaranteeOffset = getLayoutOffset('guarantee');
    const badgeX = cardX + 34 + guaranteeOffset.x;
    const badgeY = cardY + cardH - 186 + guaranteeOffset.y;
    const guaranteeBadgeSource = state.guaranteeBadgeSizeAdjusted ? state.guaranteeBadgeSize : DEFAULT_GUARANTEE_BADGE_SIZE;
    const badgeW = Math.max(96, Number(guaranteeBadgeSource?.w) || DEFAULT_GUARANTEE_BADGE_SIZE.w);
    const badgeH = Math.max(112, Number(guaranteeBadgeSource?.h) || DEFAULT_GUARANTEE_BADGE_SIZE.h);
    const innerPad = Math.max(6, Math.round(badgeW * 0.05));
    const topPanelH = Math.max(58, Math.round(badgeH * 0.60));
    const boxText = normalizeGuaranteeBoxText().toUpperCase();
    const captionText = normalizeGuaranteeCaptionText().toUpperCase();
    guaranteeBadgeBodyRect = { x: badgeX, y: badgeY, w: badgeW, h: badgeH };

    drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 2, theme.burst);
    ctx.fillStyle = theme.osCardText;
    ctx.fillRect(badgeX + innerPad, badgeY + innerPad, badgeW - (innerPad * 2), topPanelH);
    drawCenteredBadgeLines(boxText, badgeX + innerPad + 8, badgeY + innerPad + 8, badgeW - ((innerPad + 8) * 2), topPanelH - 16, theme.burst, Math.max(18, Math.round(badgeW * 0.17)), 8, 'bold', 3);
    drawCenteredBadgeLines(captionText, badgeX + innerPad + 8, badgeY + topPanelH + 10, badgeW - ((innerPad + 8) * 2), badgeH - topPanelH - 18, theme.osCardText, Math.max(11, Math.round(badgeW * 0.11)), 7, 'bold', 2);
    drawResizeHandle(badgeX, badgeY, badgeW, badgeH, badgeW, badgeH, isGuaranteeBadgeSelected, 96, 112, (rect) => {
      guaranteeBadgeResizeHandleRect = rect;
    });
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
      '',
      '#fff',
      '',
      state.lang === 'fr' ? 'MARQUE' : 'COMPANY'
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
        '',
        '#fff',
        '',
        state.lang === 'fr' ? 'TYPE' : 'TYPE'
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
        '',
        '#fff',
        '',
        state.lang === 'fr' ? 'TENSION' : 'VOLTAGE'
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
        '',
        '#fff',
        '',
        state.lang === 'fr' ? 'AMPERAGE' : 'AMPERE'
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
        '',
        '#fff',
        '',
        state.lang === 'fr' ? 'PUISSANCE' : 'POWER'
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
        '',
        '#fff',
        '',
        state.lang === 'fr' ? 'ETAT' : 'CONDITION'
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

  drawPriceBadge(cardX, cardY, cardW, cardH, theme);
}

function drawDiffLeaf(x, y, scale = 1, rotation = 0, color = '#7cc83c') {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(12, -16, 28, -8);
  ctx.quadraticCurveTo(12, 6, 0, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(2, -1);
  ctx.lineTo(24, -7);
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.stroke();
  ctx.restore();
}

function drawDiffLeafCluster(x, y, scale = 1) {
  drawDiffLeaf(x, y, scale, -0.3);
  drawDiffLeaf(x + (20 * scale), y + (6 * scale), scale * 0.85, 0.2, '#5bbf2f');
  drawDiffLeaf(x - (14 * scale), y + (10 * scale), scale * 0.72, -0.8, '#90d748');
}

function drawDiffFormatBackdrop(cardX, cardY, cardW, cardH) {
  const bgX = 0;
  const bgY = 0;
  const bgW = canvas.width;
  const bgH = canvas.height;

  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bgX, bgY, bgW, bgH);

  if (generatorBackgroundImageObj?.complete) {
    drawImageCover(generatorBackgroundImageObj, bgX, bgY, bgW, bgH);
    ctx.restore();
    return;
  }

  const waveStroke = 'rgba(220, 224, 229, 0.68)';
  ctx.strokeStyle = waveStroke;
  ctx.lineWidth = 24;
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.ellipse(
      bgX + (bgW * 0.58),
      bgY + 80 + (i * 72),
      bgW * 0.72,
      bgH * 0.30,
      0,
      0.2,
      Math.PI + 0.1
    );
    ctx.stroke();
  }

  drawDiffLeafCluster(bgX + 22, bgY + 26, 0.9);
  drawDiffLeafCluster(bgX + bgW - 34, bgY + 24, 0.85);
  drawDiffLeafCluster(bgX + 26, bgY + bgH - 42, 1);
  drawDiffLeafCluster(bgX + bgW - 40, bgY + bgH - 40, 0.95);
  ctx.restore();
}

function drawCenteredSingleLineText(text, x, y, w, h, color, maxSize, minSize, weight = 'bold', family = 'Segoe UI') {
  const value = String(text || '').trim();
  if (!value) {
    return;
  }

  const fontSize = fitText(value, w, weight, maxSize, minSize, family);
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${weight} ${fontSize}px ${family}`;
  ctx.fillText(value, x + (w / 2), y + (h / 2));
  ctx.restore();
}

function drawDiffSquareBadge(x, y, w, h, colorA, colorB, topText, mainText, subText = '') {
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, colorA);
  grad.addColorStop(1, colorB);
  drawRoundedRect(x, y, w, h, 18, grad);
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.beginPath();
  ctx.moveTo(x + w * 0.58, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h * 0.42);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  if (topText) {
    drawCenteredBadgeLines(topText.toUpperCase(), x + 10, y + 16, w - 20, 28, '#f6fbff', 18, 10, '700', 1);
  }
  drawCenteredBadgeLines(mainText, x + 12, y + 46, w - 24, h - 74, '#ffffff', 36, 18, '800', 2);
  if (subText) {
    drawCenteredBadgeLines(subText, x + 12, y + h - 42, w - 24, 26, '#edf7ff', 22, 12, '700', 1);
  }
}

function drawDiffValueBadge(x, y, w, h, colorA, colorB, topText, mainText, subText = '') {
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, colorA);
  grad.addColorStop(1, colorB);
  drawRoundedRect(x, y, w, h, 18, grad);
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.beginPath();
  ctx.moveTo(x + w * 0.58, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h * 0.42);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  if (topText) {
    drawCenteredBadgeLines(topText.toUpperCase(), x + 10, y + 16, w - 20, 24, '#f6fbff', 18, 10, '700', 1);
  }

  const contentX = x + 12;
  const contentW = w - 24;
  const contentY = y + 42;
  const contentH = h - 58;

  if (subText) {
    const primary = String(mainText || '').trim();
    const secondary = String(subText || '').trim();
    const mainSize = fitText(primary, contentW, '800', 30, 18, 'Segoe UI');
    const subSize = fitText(secondary, contentW, '700', 18, 11, 'Segoe UI');
    const gap = Math.max(2, Math.round(mainSize * 0.12));
    const blockHeight = mainSize + subSize + gap;
    const startY = contentY + Math.max(0, (contentH - blockHeight) / 2) - 2;

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${mainSize}px Segoe UI`;
    ctx.fillText(primary, x + (w / 2), startY + (mainSize / 2));

    ctx.fillStyle = '#edf7ff';
    ctx.font = `700 ${subSize}px Segoe UI`;
    ctx.fillText(secondary, x + (w / 2), startY + mainSize + gap + (subSize / 2));
    ctx.restore();
    return;
  }

  drawCenteredSingleLineText(mainText, contentX, contentY + 2, contentW, contentH - 6, '#ffffff', 30, 18, '800');
}

function splitDiffStorageBadgeText(value) {
  const raw = String(value || '').replace(/\s+/g, ' ').trim();
  if (!raw) {
    return { main: '', detail: '' };
  }

  const markerMatch = raw.match(/^(.*?)(\b(?:health|etat|sante|condition)\b.*)$/i);
  if (markerMatch) {
    return {
      main: markerMatch[1].trim(),
      detail: markerMatch[2].trim(),
    };
  }

  const lineParts = String(value || '')
    .split(/\r?\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (lineParts.length > 1) {
    return {
      main: lineParts[0],
      detail: lineParts.slice(1).join(' '),
    };
  }

  return { main: raw, detail: '' };
}

function splitDiffOsBadgeText(value) {
  const raw = String(value || '').trim();
  if (!raw) {
    return { main: '', detail: '' };
  }

  const lineParts = raw
    .split(/\r?\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (lineParts.length > 1) {
    return {
      main: lineParts[0],
      detail: lineParts.slice(1).join(' '),
    };
  }

  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length <= 1) {
    return { main: raw, detail: '' };
  }

  return {
    main: words[0],
    detail: words.slice(1).join(' '),
  };
}

function drawDiffStorageBadge(x, y, w, h, colorA, colorB, topText, lines = []) {
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, colorA);
  grad.addColorStop(1, colorB);
  drawRoundedRect(x, y, w, h, 18, grad);
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.beginPath();
  ctx.moveTo(x + w * 0.58, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h * 0.42);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const normalizedLines = (Array.isArray(lines) ? lines : [lines])
    .map((line) => String(line || '').trim())
    .filter(Boolean);

  if (normalizedLines.length === 0) {
    return;
  }

  if (topText) {
    drawCenteredBadgeLines(topText.toUpperCase(), x + 10, y + 16, w - 20, 24, '#f6fbff', 18, 10, '700', 1);
  }

  const contentX = x + 14;
  const contentY = y + 42;
  const contentW = w - 28;
  const contentH = h - 58;
  let chosenSize = 16;
  let chosenGap = 4;

  for (let size = 28; size >= 12; size -= 1) {
    ctx.save();
    ctx.font = `800 ${size}px Segoe UI`;
    const widestLine = normalizedLines.reduce((max, line) => Math.max(max, ctx.measureText(line).width), 0);
    ctx.restore();
    const gap = Math.max(3, Math.round(size * 0.16));
    const blockHeight = (normalizedLines.length * size) + ((normalizedLines.length - 1) * gap);
    if (widestLine <= contentW && blockHeight <= contentH) {
      chosenSize = size;
      chosenGap = gap;
      break;
    }
  }

  const blockHeight = (normalizedLines.length * chosenSize) + ((normalizedLines.length - 1) * chosenGap);
  const startY = contentY + ((contentH - blockHeight) / 2);

  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `800 ${chosenSize}px Segoe UI`;
  normalizedLines.forEach((line, index) => {
    const lineY = startY + (chosenSize / 2) + (index * (chosenSize + chosenGap));
    ctx.fillText(line, x + (w / 2), lineY);
  });
  ctx.restore();
}

function resolveDiffBadgeColors(baseColor, fallbackA, fallbackB) {
  if (isHexColor(baseColor)) {
    return [
      shadeHexColor(baseColor, 0.16),
      shadeHexColor(baseColor, -0.08),
    ];
  }
  return [fallbackA, fallbackB];
}

function drawDiffPromoText(x, y, w, h) {
  const lead = String(state.diffPromoLead || '').trim();
  const value = String(state.diffPromoValue || '').trim();
  const tail = String(state.diffPromoTail || '').trim();
  if (!lead && !value && !tail) {
    return;
  }

  const textColor = isHexColor(state.diffPromoTextColor) ? state.diffPromoTextColor : '#171717';
  const valueColor = isHexColor(state.diffPromoValueColor) ? state.diffPromoValueColor : '#4dbb35';
  const promoFamily = 'Bahnschrift, Segoe UI, Arial, sans-serif';
  const promoBaseSize = Math.max(16, Number(state.diffPromoFontSize) || 28);
  const promoWeight = state.diffPromoBold ? '800' : '600';
  const promoValueWeight = state.diffPromoBold ? '900' : '800';
  const promoStyle = state.diffPromoItalic ? 'italic ' : '';
  const promoUnderline = !!state.diffPromoUnderline;
  const leadH = Math.round(h * 0.18);
  const valueH = Math.round(h * 0.22);
  const tailH = Math.round(h * 0.22);
  const gap = Math.max(4, Math.round(h * 0.03));
  const totalH = leadH + valueH + tailH + (gap * 2);
  const startY = y + Math.max(0, Math.round((h - totalH) / 2));

  if (lead) {
    drawCenteredBadgeLines(lead.toUpperCase(), x, startY, w, leadH, textColor, promoBaseSize, 14, promoWeight, 2, promoFamily, promoStyle, promoUnderline);
  }
  if (value) {
    drawCenteredBadgeLines(value.toUpperCase(), x, startY + leadH + gap, w, valueH, valueColor, Math.round(promoBaseSize * 1.5), 20, promoValueWeight, 2, promoFamily, promoStyle, promoUnderline);
  }
  if (tail) {
    drawCenteredBadgeLines(tail.toUpperCase(), x, startY + leadH + valueH + (gap * 2), w, tailH, textColor, promoBaseSize, 14, promoWeight, 3, promoFamily, promoStyle, promoUnderline);
  }
}

function drawUnderlinedText(x, baselineY, text, underline, fontSize, color) {
  if (!underline || !text) {
    return;
  }
  const textWidth = ctx.measureText(text).width;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.5, Math.round(fontSize * 0.08));
  ctx.beginPath();
  const underlineY = baselineY + Math.max(4, Math.round(fontSize * 0.12));
  ctx.moveTo(x, underlineY);
  ctx.lineTo(x + textWidth, underlineY);
  ctx.stroke();
  ctx.restore();
}

function fitArcTextSize(text, radius, arcSpan, weight = '700', startSize = 26, minSize = 10, family = 'Segoe UI') {
  let size = startSize;
  const maxArcWidth = radius * arcSpan * 0.92;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxArcWidth) {
      return size;
    }
    size -= 1;
  }
  return minSize;
}

function drawArcText(text, cx, cy, radius, centerAngle, clockwise, fontSize, fillColor, strokeColor, strokeWidth = 2, family = 'Segoe UI') {
  const raw = String(text || '').trim();
  if (!raw) {
    return;
  }
  const chars = (clockwise ? raw : raw.split('').reverse().join('')).split('');
  ctx.save();
  ctx.font = `700 ${fontSize}px ${family}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const letterSpacing = Math.max(1, Math.round(fontSize * 0.08));
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const totalAngle = widths.reduce((sum, width) => sum + ((width + letterSpacing) / radius), 0);
  let angle = centerAngle - (totalAngle / 2);

  chars.forEach((ch, index) => {
    const width = widths[index];
    angle += (width / 2) / radius;
    const x = cx + (Math.cos(angle) * radius);
    const y = cy + (Math.sin(angle) * radius);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + (clockwise ? Math.PI / 2 : -Math.PI / 2));
    ctx.lineJoin = 'round';
    if (strokeWidth > 0) {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
      ctx.strokeText(ch, 0, 0);
    }
    ctx.fillStyle = fillColor;
    ctx.fillText(ch, 0, 0);
    ctx.restore();
    angle += ((width / 2) + letterSpacing) / radius;
  });
  ctx.restore();
}

function drawTintedImage(img, x, y, w, h, color) {
  ctx.save();
  ctx.drawImage(img, x, y, w, h);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function drawDiffFormatPoster(cardX, cardY, cardW, cardH, theme) {
  const localizeStorageValue = (value) => {
    const raw = String(value || '').trim();
    if (!raw) {
      return '';
    }
    return state.lang === 'fr'
      ? raw.replace(/\bGB\b/gi, 'GO')
      : raw.replace(/\bGO\b/gi, 'GB');
  };

  drawDiffFormatBackdrop(cardX, cardY, cardW, cardH);

  const headerOffset = getLayoutOffset('diffHeader');
  const logoOffset = getLayoutOffset('logo');
  const headerX = cardX + 34 + headerOffset.x;
  const headerY = cardY + 70 + headerOffset.y;
  const headerBaselineY = headerY;
  const headerH = 88;
  const showDiffHeaderText = state.sectionEnabled.diffFormat !== false;
  const showLogoHolder = state.sectionEnabled.logo !== false;
  const hasLogoImage = !!(logoImageObj && logoImageObj.complete && showLogoHolder);
  const companyText = String(state.diffBrandText || '').trim();
  const modelText = String(state.diffModelTitle || '').trim();
  let modelStartX = headerX;
  let headerRegionWidth = 0;

  if (showLogoHolder) {
    const logoBadgeW = 142;
    const logoBadgeH = 104;
    // Keep the Generator logo holder independent from the bottom badge row.
    const bottomBadgesTop = cardY + cardH - 210;
    const logoBaseX = cardX + cardW - logoBadgeW - 34;
    const logoBaseY = Math.min(
      cardY + cardH - logoBadgeH - 28,
      bottomBadgesTop - logoBadgeH - 24
    );
    const logoBadgeX = logoBaseX + logoOffset.x;
    const logoBadgeY = logoBaseY + logoOffset.y;
    const logoInnerX = logoBadgeX + 8;
    const logoInnerY = logoBadgeY + 8;
    const logoInnerW = logoBadgeW - 16;
    const logoInnerH = logoBadgeH - 16;
    logoBadgeBodyRect = hasLogoImage ? null : { x: logoBadgeX, y: logoBadgeY, w: logoBadgeW, h: logoBadgeH };

    if (!hasLogoImage) {
      drawRoundedRect(logoBadgeX, logoBadgeY, logoBadgeW, logoBadgeH, 12, theme.logoBadge);
      drawRoundedRect(logoInnerX, logoInnerY, logoInnerW, logoInnerH, 8, '#f7fbff');
      logoResizeHandleRect = null;
      logoImageBodyRect = null;
      ctx.fillStyle = '#2f4f76';
      const logoText = 'LOGO';
      const logoTextSize = fitText(logoText, logoInnerW - 18, 'bold', 28, 14, 'Segoe UI');
      ctx.font = `bold ${logoTextSize}px Segoe UI`;
      const logoTextWidth = ctx.measureText(logoText).width;
      ctx.fillText(logoText, logoInnerX + (logoInnerW - logoTextWidth) / 2, logoInnerY + 48);
      ctx.fillStyle = '#f2f8ff';
      ctx.font = 'bold 22px Segoe UI';
      const caption = 'LOGO';
      const captionWidth = ctx.measureText(caption).width;
      ctx.fillText(caption, logoBadgeX + (logoBadgeW - captionWidth) / 2, logoBadgeY + 94);
    } else {
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
        minH: 104,
      };
    } else {
      logoBadgeResizeHandleRect = null;
    }

    const logoDragRect = hasLogoImage && logoImageBodyRect
      ? logoImageBodyRect
      : { x: logoBadgeX, y: logoBadgeY, w: logoBadgeW, h: logoBadgeH };
    registerDraggableRegion('logo', logoDragRect.x, logoDragRect.y, logoDragRect.w, logoDragRect.h);
  } else {
    logoResizeHandleRect = null;
    logoBadgeResizeHandleRect = null;
    logoImageBodyRect = null;
    logoBadgeBodyRect = null;
  }

  if (showDiffHeaderText && companyText) {
    const companyColor = String(state.diffBrandColor || '#ffffff');
    const companyBgColor = String(state.diffBrandBgColor || '#1471bf');
    const companyWeight = state.diffBrandBold ? '800' : '400';
    const companyFont = `${state.diffBrandItalic ? 'italic ' : ''}${companyWeight}`;
    const preferredCompanySize = Math.max(18, Number(state.diffBrandFontSize) || 54);
    const companyMaxWidth = Math.max(300, Math.round(cardW * 0.42));
    const companySize = fitText(companyText, companyMaxWidth, companyFont, preferredCompanySize, 18, 'Segoe UI');

    ctx.save();
    ctx.font = `${companyFont} ${companySize}px Segoe UI`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    const companyMetrics = ctx.measureText(companyText);
    const companyTextWidth = Math.ceil(companyMetrics.width);
    const fontAscent = Math.ceil(
      companyMetrics.fontBoundingBoxAscent
      || companyMetrics.emHeightAscent
      || companyMetrics.actualBoundingBoxAscent
      || Math.round(companySize * 0.78)
    );
    const fontDescent = Math.ceil(
      companyMetrics.fontBoundingBoxDescent
      || companyMetrics.emHeightDescent
      || companyMetrics.actualBoundingBoxDescent
      || Math.round(companySize * 0.2)
    );
    const badgePadX = Math.max(16, Math.round(companySize * 0.28));
    const badgePadY = Math.max(10, Math.round(companySize * 0.2));
    const baseBadgeHeight = fontAscent + fontDescent + (badgePadY * 2);
    const baseBadgeWidth = Math.ceil(companyTextWidth + (badgePadX * 2));
    const baseBadgeX = modelStartX;
    const baseBadgeY = Math.round(headerBaselineY - fontAscent - badgePadY);
    const badgeCenterX = baseBadgeX + (baseBadgeWidth / 2);
    const companyTextY = Math.round(baseBadgeY + badgePadY + fontAscent);
    const underlineX = Math.round(badgeCenterX - (companyTextWidth / 2));
    const brandBoxCrop = clampDiffBrandBoxCrop(state.diffBrandBoxCrop, baseBadgeWidth, baseBadgeHeight);
    state.diffBrandBoxCrop = brandBoxCrop;
    const badgeX = baseBadgeX + brandBoxCrop.left;
    const badgeY = baseBadgeY + brandBoxCrop.top;
    const badgeWidth = Math.max(16, baseBadgeWidth - brandBoxCrop.left - brandBoxCrop.right);
    const badgeHeight = Math.max(16, baseBadgeHeight - brandBoxCrop.top - brandBoxCrop.bottom);
    const companyTextRight = Math.round(badgeCenterX + (companyTextWidth / 2));

    drawRoundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 2, companyBgColor);
    ctx.fillStyle = companyColor;
    ctx.fillText(companyText, badgeCenterX, companyTextY);
    drawUnderlinedText(underlineX, companyTextY, companyText, !!state.diffBrandUnderline, companySize, companyColor);
    ctx.restore();

    if (state.diffBrandBoxCropEnabled) {
      diffBrandBoxBodyRect = { x: badgeX, y: badgeY, w: badgeWidth, h: badgeHeight };
      drawDiffBrandBoxCropHandles(diffBrandBoxBodyRect);
    } else {
      diffBrandBoxBodyRect = null;
      isDiffBrandBoxSelected = false;
    }

    const companyGap = Math.max(14, Math.round(companySize * 0.24));
    const companyVisualRight = Math.max(badgeX + badgeWidth, companyTextRight);
    const companyRegionWidth = (companyVisualRight - headerX) + companyGap;
    modelStartX = companyVisualRight + companyGap;
    headerRegionWidth = Math.max(headerRegionWidth, companyRegionWidth);
  } else {
    diffBrandBoxBodyRect = null;
    isDiffBrandBoxSelected = false;
  }

  if (showDiffHeaderText && modelText) {
    const modelColor = String(state.diffModelColor || '#1471bf');
    const modelW = Math.max(180, cardW - (modelStartX - cardX) - 380);
    const modelWeight = state.diffModelBold ? '800' : '400';
    const modelFont = `${state.diffModelItalic ? 'italic ' : ''}${modelWeight}`;
    const modelSize = fitText(modelText, modelW, modelFont, Math.max(18, Number(state.diffModelFontSize) || 62), 18, 'Segoe UI');
    ctx.fillStyle = modelColor;
    ctx.textBaseline = 'alphabetic';
    ctx.font = `${modelFont} ${modelSize}px Segoe UI`;
    ctx.fillText(modelText, modelStartX, headerBaselineY);
    drawUnderlinedText(modelStartX, headerBaselineY, modelText, !!state.diffModelUnderline, modelSize, modelColor);
    headerRegionWidth = Math.max(headerRegionWidth, (modelStartX - headerX) + ctx.measureText(modelText).width);
  }

  if (showDiffHeaderText && headerRegionWidth > 0) {
    registerDraggableRegion('diffHeader', headerX, headerY - 56, headerRegionWidth, headerH);
  }

  const currentDeviceImages = getCurrentDeviceImages();
  const imageBox = getDeviceImageBoxRect();
  const showDeviceImage = state.sectionEnabled.type !== false && state.sectionEnabled.image !== false;
  if (showDeviceImage && currentDeviceImages.length > 0) {
    drawDeviceImageLayers(imageBox);
    registerDraggableRegion('diffDevice', imageBox.x, imageBox.y, imageBox.w, imageBox.h);
    registerRemovableElement(imageBox.x, imageBox.y, imageBox.w, imageBox.h, () => {
      state.sectionEnabled.image = false;
    });
  } else if (showDeviceImage && state.type === 'Laptop' && defaultLaptopImageObj?.complete) {
    deviceImageHandles = [];
    drawDefaultDeviceImage(defaultLaptopImageObj, DEFAULT_LAPTOP_IMAGE_CROP, getDefaultLaptopImageRect(), DEFAULT_LAPTOP_IMAGE_ID, isDefaultDeviceImageSelected);
  } else if (showDeviceImage && defaultPcImageObj?.complete) {
    deviceImageHandles = [];
    drawDefaultDeviceImage(defaultPcImageObj, DEFAULT_PC_IMAGE_CROP, getDefaultPcImageRect(), DEFAULT_PC_IMAGE_ID, isDefaultDeviceImageSelected);
  }

  if (state.sectionEnabled.pointsText !== false && generatorPointsTextImageObj?.complete) {
    const pointsOffset = getLayoutOffset('diffPointsText');
    const pointsSize = normalizeBoxSize(state.diffPointsTextSize, DEFAULT_DIFF_POINTS_TEXT_SIZE);
    const pointsWidth = Math.max(90, Number(pointsSize?.w) || DEFAULT_DIFF_POINTS_TEXT_SIZE.w);
    const pointsHeight = Math.max(90, Number(pointsSize?.h) || DEFAULT_DIFF_POINTS_TEXT_SIZE.h);
    const pointsX = cardX + cardW - pointsWidth - 78 + pointsOffset.x;
    const pointsY = cardY + 6 + pointsOffset.y;
    const rotatedBounds = drawRotatedImageContain(
      generatorPointsTextImageObj,
      pointsX,
      pointsY,
      pointsWidth,
      pointsHeight,
      state.diffPointsTextRotation
    );
    pointsTextBodyRect = rotatedBounds;
    if (isPointsTextSelected) {
      ctx.save();
      ctx.strokeStyle = '#2c8eff';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(rotatedBounds.x, rotatedBounds.y, rotatedBounds.w, rotatedBounds.h);
      ctx.restore();
    }
    drawResizeHandle(
      rotatedBounds.x,
      rotatedBounds.y,
      rotatedBounds.w,
      rotatedBounds.h,
      Number(pointsSize?.w) || DEFAULT_DIFF_POINTS_TEXT_SIZE.w,
      Number(pointsSize?.h) || DEFAULT_DIFF_POINTS_TEXT_SIZE.h,
      isPointsTextSelected,
      90,
      90,
      (rect) => {
        pointsTextResizeHandleRect = rect;
      }
    );
    registerDraggableRegion('diffPointsText', rotatedBounds.x, rotatedBounds.y, rotatedBounds.w, rotatedBounds.h);
  } else {
    pointsTextBodyRect = null;
    pointsTextResizeHandleRect = null;
  }

  if (state.sectionEnabled.guarantee !== false && generatorSideGuaranteeImageObj?.complete) {
    const warrantyOffset = getLayoutOffset('diffWarranty');
    const guaranteeSource = state.guaranteeBadgeSizeAdjusted
      ? state.guaranteeBadgeSize
      : DEFAULT_DIFF_SIDE_GUARANTEE_SIZE;
    const badgeW = Math.max(120, Number(guaranteeSource?.w) || DEFAULT_DIFF_SIDE_GUARANTEE_SIZE.w);
    const badgeH = Math.max(120, Number(guaranteeSource?.h) || DEFAULT_DIFF_SIDE_GUARANTEE_SIZE.h);
    const badgeX = cardX + cardW - badgeW - 74 + warrantyOffset.x;
    const badgeY = cardY + 126 + warrantyOffset.y;
    guaranteeBadgeBodyRect = { x: badgeX, y: badgeY, w: badgeW, h: badgeH };
    drawImageContain(generatorSideGuaranteeImageObj, badgeX, badgeY, badgeW, badgeH);
    drawResizeHandle(badgeX, badgeY, badgeW, badgeH, badgeW, badgeH, isGuaranteeBadgeSelected, 120, 120, (rect) => {
      guaranteeBadgeResizeHandleRect = rect;
    });
    registerDraggableRegion('diffWarranty', badgeX, badgeY, badgeW, badgeH);
  } else {
    guaranteeBadgeBodyRect = null;
    guaranteeBadgeResizeHandleRect = null;
  }

  if (state.sectionEnabled.reconditioned !== false && generatorReconditionedImageObj?.complete) {
    const reconditionedOffset = getLayoutOffset('diffReconditioned');
    const reconditionedSize = normalizeBoxSize(state.diffReconditionedSize, DEFAULT_DIFF_RECONDITIONED_SIZE);
    const reconditionedWidth = Math.max(90, Number(reconditionedSize?.w) || DEFAULT_DIFF_RECONDITIONED_SIZE.w);
    const reconditionedHeight = Math.max(90, Number(reconditionedSize?.h) || DEFAULT_DIFF_RECONDITIONED_SIZE.h);
    const reconditionedX = cardX + cardW - reconditionedWidth - 88 + reconditionedOffset.x;
    const reconditionedY = cardY + 358 + reconditionedOffset.y;
    const rotatedBounds = drawRotatedImageContain(
      generatorReconditionedImageObj,
      reconditionedX,
      reconditionedY,
      reconditionedWidth,
      reconditionedHeight,
      state.diffReconditionedRotation
    );
    reconditionedBodyRect = rotatedBounds;
    if (isReconditionedSelected) {
      ctx.save();
      ctx.strokeStyle = '#2c8eff';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(rotatedBounds.x, rotatedBounds.y, rotatedBounds.w, rotatedBounds.h);
      ctx.restore();
    }
    drawResizeHandle(
      rotatedBounds.x,
      rotatedBounds.y,
      rotatedBounds.w,
      rotatedBounds.h,
      reconditionedWidth,
      reconditionedHeight,
      isReconditionedSelected,
      90,
      90,
      (rect) => {
        reconditionedResizeHandleRect = rect;
      }
    );
    registerDraggableRegion('diffReconditioned', rotatedBounds.x, rotatedBounds.y, rotatedBounds.w, rotatedBounds.h);
  } else {
    reconditionedBodyRect = null;
    reconditionedResizeHandleRect = null;
  }

  const bottomOffset = getLayoutOffset('diffBottomBadges');
  let badgeW = 150;
  let badgeH = 150;
  let gap = 18;
  let badgeY = cardY + cardH - badgeH - 60 + bottomOffset.y;
  const [processorColorA, processorColorB] = resolveDiffBadgeColors(state.diffProcessorBadgeColor, '#1b9fea', '#167ec8');
  const [ramColorA, ramColorB] = resolveDiffBadgeColors(state.diffRamBadgeColor, '#65c3c5', '#3e96a0');
  const [storageColorA, storageColorB] = resolveDiffBadgeColors(state.diffStorageBadgeColor, '#f2c246', '#d8a429');
  const [screenColorA, screenColorB] = resolveDiffBadgeColors(state.diffScreenBadgeColor, '#57b7cf', '#2d95af');
  const [connectivityColorA, connectivityColorB] = resolveDiffBadgeColors(state.diffConnectivityBadgeColor, '#5b86d8', '#3e64b6');
  const [gpuColorA, gpuColorB] = resolveDiffBadgeColors(state.diffGpuBadgeColor, '#63b746', '#3e8e28');
  const [osColorA, osColorB] = resolveDiffBadgeColors(state.diffOsBadgeColor, '#1d9be4', '#116db7');
  const processorPrimaryText = String(state.processorCore || '').trim();
  const processorSecondaryText = String(state.processorNumber || '').trim();
  const processorFallback = [processorPrimaryText, processorSecondaryText].filter(Boolean).join(' ').trim();
  const processorBadgeTitle = String(t().labels.processor || 'Processor');
  const storageBadgeTitle = String(t().sections.storage || 'Storage');
  const screenBadgeTitle = String(t().sections.screen || 'Screen');
  const connectivityBadgeTitle = String(t().sections.connectivity || 'Connectivity');
  const gpuBadgeTitle = 'GPU';
  const diffStorageLines = [
    state.diffStorageLine1,
    state.diffStorageLine2,
    state.diffStorageLine3Enabled ? state.diffStorageLine3 : '',
  ]
    .map((line) => localizeStorageValue(line))
    .filter((line) => String(line || '').trim());
  const diffScreenLines = [
    state.diffScreenLine1,
    state.diffScreenLine2,
    state.diffScreenLine3Enabled ? state.diffScreenLine3 : '',
  ].filter((line) => String(line || '').trim());
  const diffConnectivityLines = [
    state.diffConnectivityLine1,
    state.diffConnectivityLine2,
    state.diffConnectivityLine3Enabled ? state.diffConnectivityLine3 : '',
  ].filter((line) => String(line || '').trim());
  const diffGpuLines = [
    state.diffGpuLine1,
    state.diffGpuLine2,
    state.diffGpuLine3Enabled ? state.diffGpuLine3 : '',
  ].filter((line) => String(line || '').trim());
  const visibleBadgeDrawers = [];

  if (state.sectionEnabled.processor !== false) {
    visibleBadgeDrawers.push((x) => {
      drawDiffValueBadge(
        x,
        badgeY,
        badgeW,
        badgeH,
        processorColorA,
        processorColorB,
        processorBadgeTitle,
        processorPrimaryText || processorFallback || 'Core i5',
        processorSecondaryText
      );
    });
  }

  if (state.sectionEnabled.ram !== false) {
    visibleBadgeDrawers.push((x) => {
      drawDiffValueBadge(
        x,
        badgeY,
        badgeW,
        badgeH,
        ramColorA,
        ramColorB,
        'RAM',
        state.ram || '8 GB',
        (state.ramType || '').toUpperCase()
      );
    });
  }

  if (state.sectionEnabled.storage !== false) {
    visibleBadgeDrawers.push((x) => {
      drawDiffStorageBadge(
        x,
        badgeY,
        badgeW,
        badgeH,
        storageColorA,
        storageColorB,
        storageBadgeTitle,
        diffStorageLines.length > 0 ? diffStorageLines : [localizeStorageValue('SSD 256 GB')]
      );
    });
  }

  if (state.sectionEnabled.screen !== false) {
    visibleBadgeDrawers.push((x) => {
      drawDiffStorageBadge(
        x,
        badgeY,
        badgeW,
        badgeH,
        screenColorA,
        screenColorB,
        screenBadgeTitle,
        diffScreenLines.length > 0 ? diffScreenLines : ['15.6"', 'Full HD']
      );
    });
  }

  if (state.sectionEnabled.connectivity !== false) {
    visibleBadgeDrawers.push((x) => {
      drawDiffStorageBadge(
        x,
        badgeY,
        badgeW,
        badgeH,
        connectivityColorA,
        connectivityColorB,
        connectivityBadgeTitle,
        diffConnectivityLines.length > 0 ? diffConnectivityLines : ['Wi-Fi', 'Bluetooth']
      );
    });
  }

  if (state.sectionEnabled.gpu !== false) {
    visibleBadgeDrawers.push((x) => {
      drawDiffStorageBadge(
        x,
        badgeY,
        badgeW,
        badgeH,
        gpuColorA,
        gpuColorB,
        gpuBadgeTitle,
        diffGpuLines.length > 0 ? diffGpuLines : ['Nvidia', 'GTX 1080']
      );
    });
  }

  if (state.sectionEnabled.os !== false) {
    visibleBadgeDrawers.push((x) => {
      const osBadgeText = splitDiffOsBadgeText(state.os || 'Windows');
      drawDiffValueBadge(
        x,
        badgeY,
        badgeW,
        badgeH,
        osColorA,
        osColorB,
        'OS',
        osBadgeText.main || 'Windows',
        osBadgeText.detail
      );
    });
  }

  if (visibleBadgeDrawers.length > 0) {
    const availableWidth = Math.max(0, cardW - 72);
    if ((badgeW * visibleBadgeDrawers.length) + (gap * (visibleBadgeDrawers.length - 1)) > availableWidth) {
      const minimumGap = 12;
      badgeW = Math.max(86, Math.floor((availableWidth - (minimumGap * (visibleBadgeDrawers.length - 1))) / visibleBadgeDrawers.length));
      gap = visibleBadgeDrawers.length > 1
        ? Math.max(minimumGap, Math.floor((availableWidth - (badgeW * visibleBadgeDrawers.length)) / (visibleBadgeDrawers.length - 1)))
        : 0;
    }
    badgeH = badgeW;
    badgeY = cardY + cardH - badgeH - 60 + bottomOffset.y;
    const totalBadgeWidth = (badgeW * visibleBadgeDrawers.length) + (gap * (visibleBadgeDrawers.length - 1));
    const startX = cardX + Math.round((cardW - totalBadgeWidth) / 2) + bottomOffset.x;
    visibleBadgeDrawers.forEach((drawBadge, index) => {
      drawBadge(startX + (index * (badgeW + gap)));
    });
    registerDraggableRegion('diffBottomBadges', startX, badgeY, totalBadgeWidth, badgeH);
  }

  drawPriceBadge(cardX, cardY, cardW, cardH, theme);
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
  diffBrandBoxCropHandleRects = [];
  diffBrandBoxBodyRect = null;
  priceBadgeBodyRect = null;
  storageBadgeResizeHandleRect = null;
  storageBadgeBodyRect = null;
  osBadgeResizeHandleRect = null;
  osBadgeBodyRect = null;
  guaranteeBadgeResizeHandleRect = null;
  guaranteeBadgeBodyRect = null;
  pointsTextResizeHandleRect = null;
  pointsTextBodyRect = null;
  reconditionedResizeHandleRect = null;
  reconditionedBodyRect = null;
  stackBadgeRects = [];
  stackBadgeResizeHandleRects = [];
  const w = canvas.width;
  const h = canvas.height;
  const theme = getActiveThemePalette();
  ctx.clearRect(0, 0, w, h);

  const cardX = 28;
  const cardY = 30;
  const cardW = w - 56;
  const cardH = h - 60;
  const isGeneratorPoster = state.generator === 'diff';

  if (isGeneratorPoster) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
  } else {
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
  }

  if (state.generator === 'charger') {
    isStorageBadgeSelected = false;
    isOsBadgeSelected = false;
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

  if (state.generator === 'diff') {
    isStorageBadgeSelected = false;
    isOsBadgeSelected = false;
    drawDiffFormatPoster(cardX, cardY, cardW, cardH, theme);
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
    const osBadgeSource = state.osBadgeSizeAdjusted ? state.osBadgeSize : DEFAULT_OS_BADGE_SIZE;
    const osBadgeW = Math.max(96, Number(osBadgeSource?.w) || DEFAULT_OS_BADGE_SIZE.w);
    const osBadgeH = Math.max(112, Number(osBadgeSource?.h) || DEFAULT_OS_BADGE_SIZE.h);
    const osInnerPad = Math.max(6, Math.round(osBadgeW * 0.05));
    const osInnerW = osBadgeW - (osInnerPad * 2);
    const osTopPanelH = Math.max(58, Math.round(osBadgeH * 0.60));
    osBadgeBodyRect = { x: osX, y: osY, w: osBadgeW, h: osBadgeH };
    drawRoundedRect(osX, osY, osBadgeW, osBadgeH, 2, theme.osCard);
    ctx.fillStyle = theme.osCardText;
    ctx.fillRect(osX + osInnerPad, osY + osInnerPad, osInnerW, osTopPanelH);
    ctx.fillStyle = theme.osCard;
    const rawOsText = (state.os || '').trim();
    const osText = rawOsText.toLowerCase() === 'mac' ? 'macOS' : (rawOsText || 'Windows');
    drawCenteredBadgeLines(
      osText,
      osX + osInnerPad + 8,
      osY + osInnerPad + 8,
      osInnerW - 16,
      osTopPanelH - 16,
      theme.osCard,
      Math.max(18, Math.round(osBadgeW * 0.22)),
      10,
      'bold',
      3
    );
    ctx.fillStyle = theme.osCardText;
    const osLine1 = state.lang === 'fr' ? 'Systeme' : 'Operating';
    const osLine2 = state.lang === 'fr' ? 'Exploitation' : 'System';
    drawCenteredBadgeLines(
      `${osLine1} ${osLine2}`,
      osX + osInnerPad + 8,
      osY + osTopPanelH + 8,
      osInnerW - 16,
      osBadgeH - osTopPanelH - 16,
      theme.osCardText,
      Math.max(11, Math.round(osBadgeW * 0.12)),
      8,
      'bold',
      2
    );
    drawResizeHandle(osX, osY, osBadgeW, osBadgeH, osBadgeW, osBadgeH, isOsBadgeSelected, 96, 112, (rect) => {
      osBadgeResizeHandleRect = rect;
    });
    registerDraggableRegion('os', osX, osY, osBadgeW, osBadgeH);
    registerRemovableElement(osX, osY, osBadgeW, osBadgeH, () => {
      state.sectionEnabled.os = false;
    });
  } else {
    osBadgeBodyRect = null;
    osBadgeResizeHandleRect = null;
    isOsBadgeSelected = false;
  }

  const showTopGuarantee = state.sectionEnabled.badges !== false
    && state.sectionEnabled.guarantee !== false
    && state.showGuaranteeBadge;
  const storageOffset = getLayoutOffset('storage');
  const storageTitleX = (showTopGuarantee ? cardX + 300 : cardX + 182) + storageOffset.x;
  const storageTitleY = cardY + storageOffset.y;

  if (state.sectionEnabled.titleBadge !== false) {
    const topTitle = (state.titleTop || '').trim();
    const bottomTitle = (state.titleBottom || '').trim();
    const storageBadgeW = Math.max(220, Number(state.storageBadgeSize?.w) || 340);
    const storageBadgeH = Math.max(82, Number(state.storageBadgeSize?.h) || 108);
    const storageBadgeX = storageTitleX - 8;
    const storageBadgeY = storageTitleY + 24;
    storageBadgeBodyRect = { x: storageBadgeX, y: storageBadgeY, w: storageBadgeW, h: storageBadgeH };
    const storageBadgeGrad = ctx.createLinearGradient(
      storageBadgeX,
      storageBadgeY,
      storageBadgeX + storageBadgeW,
      storageBadgeY + storageBadgeH
    );
    storageBadgeGrad.addColorStop(0, shadeHexColor(theme.tag4, 0.2));
    storageBadgeGrad.addColorStop(0.5, theme.tag4);
    storageBadgeGrad.addColorStop(1, shadeHexColor(theme.burst, 0.04));

    ctx.save();
    ctx.shadowColor = 'rgba(255, 122, 24, 0.34)';
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 10;
    drawRoundedRect(storageBadgeX, storageBadgeY, storageBadgeW, storageBadgeH, 18, storageBadgeGrad);
    ctx.restore();

    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    drawRoundedRect(storageBadgeX + 1, storageBadgeY + 1, storageBadgeW - 2, storageBadgeH - 2, 17, null, 'rgba(255,255,255,0.5)');
    ctx.restore();

    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    drawRoundedRect(storageBadgeX + 10, storageBadgeY + 10, storageBadgeW - 20, 28, 14, 'rgba(255,255,255,0.14)');

    const topTitleSize = topTitle ? fitText(topTitle, storageBadgeW - 44, 'italic bold', 56, 20, 'Segoe UI') : 0;
    const bottomTitleSize = bottomTitle ? fitText(bottomTitle, storageBadgeW - 50, 'bold', 26, 12, 'Segoe UI') : 0;
    const lineGap = topTitle && bottomTitle ? Math.max(8, Math.round(storageBadgeH * 0.07)) : 0;
    const totalTextHeight = topTitleSize + lineGap + bottomTitleSize;
    const blockTop = storageBadgeY + ((storageBadgeH - totalTextHeight) / 2);

    if (topTitle) {
      ctx.fillStyle = '#ffffff';
      ctx.font = `italic bold ${topTitleSize}px Segoe UI`;
      const topTitleWidth = ctx.measureText(topTitle).width;
      ctx.fillText(
        topTitle,
        storageBadgeX + (storageBadgeW - topTitleWidth) / 2,
        blockTop + topTitleSize
      );
    }

    if (bottomTitle) {
      ctx.font = `700 ${bottomTitleSize}px Segoe UI`;
      const bottomTitleWidth = ctx.measureText(bottomTitle).width;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.fillText(
        bottomTitle,
        storageBadgeX + (storageBadgeW - bottomTitleWidth) / 2,
        blockTop + topTitleSize + lineGap + bottomTitleSize
      );
    }

    if (isStorageBadgeSelected) {
      const handleSize = 14;
      const hitPad = 8;
      const handleX = storageBadgeX + storageBadgeW - handleSize / 2;
      const handleY = storageBadgeY + storageBadgeH - handleSize / 2;
      drawRoundedRect(handleX, handleY, handleSize, handleSize, 3, '#0a84ff');
      storageBadgeResizeHandleRect = {
        x: handleX - hitPad,
        y: handleY - hitPad,
        w: handleSize + (hitPad * 2),
        h: handleSize + (hitPad * 2),
        minW: 220,
        minH: 82,
      };
    } else {
      storageBadgeResizeHandleRect = null;
    }

    registerDraggableRegion('storage', storageBadgeX, storageBadgeY, storageBadgeW, storageBadgeH);
    registerRemovableElement(storageBadgeX, storageBadgeY, storageBadgeW, storageBadgeH, () => {
      state.sectionEnabled.titleBadge = false;
    });
  } else {
    storageBadgeResizeHandleRect = null;
    storageBadgeBodyRect = null;
    isStorageBadgeSelected = false;
  }

  if (showTopGuarantee) {
    const guaranteeOffset = getLayoutOffset('guarantee');
    const badgeX = cardX + 154 + guaranteeOffset.x;
    const badgeY = cardY + 18 + guaranteeOffset.y;
    const guaranteeBadgeSource = state.guaranteeBadgeSizeAdjusted ? state.guaranteeBadgeSize : DEFAULT_GUARANTEE_BADGE_SIZE;
    const badgeW = Math.max(96, Number(guaranteeBadgeSource?.w) || DEFAULT_GUARANTEE_BADGE_SIZE.w);
    const badgeH = Math.max(112, Number(guaranteeBadgeSource?.h) || DEFAULT_GUARANTEE_BADGE_SIZE.h);
    const innerPad = Math.max(6, Math.round(badgeW * 0.05));
    const topPanelH = Math.max(58, Math.round(badgeH * 0.60));
    const boxText = normalizeGuaranteeBoxText().toUpperCase();
    const captionText = normalizeGuaranteeCaptionText().toUpperCase();
    guaranteeBadgeBodyRect = { x: badgeX, y: badgeY, w: badgeW, h: badgeH };

    drawRoundedRect(badgeX, badgeY, badgeW, badgeH, 2, theme.burst);
    ctx.fillStyle = theme.osCardText;
    ctx.fillRect(badgeX + innerPad, badgeY + innerPad, badgeW - (innerPad * 2), topPanelH);
    drawCenteredBadgeLines(boxText, badgeX + innerPad + 8, badgeY + innerPad + 8, badgeW - ((innerPad + 8) * 2), topPanelH - 16, theme.burst, Math.max(18, Math.round(badgeW * 0.17)), 8, 'bold', 3);
    drawCenteredBadgeLines(captionText, badgeX + innerPad + 8, badgeY + topPanelH + 10, badgeW - ((innerPad + 8) * 2), badgeH - topPanelH - 18, theme.osCardText, Math.max(11, Math.round(badgeW * 0.11)), 7, 'bold', 2);
    drawResizeHandle(badgeX, badgeY, badgeW, badgeH, badgeW, badgeH, isGuaranteeBadgeSelected, 96, 112, (rect) => {
      guaranteeBadgeResizeHandleRect = rect;
    });
    registerDraggableRegion('guarantee', badgeX, badgeY, badgeW, badgeH);
    registerRemovableElement(badgeX, badgeY, badgeW, badgeH, () => {
      state.showGuaranteeBadge = false;
    });
  } else {
    guaranteeBadgeBodyRect = null;
    guaranteeBadgeResizeHandleRect = null;
    isGuaranteeBadgeSelected = false;
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
    const imageBox = getDefaultLaptopImageRect();
    if (defaultLaptopImageObj && defaultLaptopImageObj.complete) {
      drawDefaultDeviceImage(defaultLaptopImageObj, DEFAULT_LAPTOP_IMAGE_CROP, imageBox, DEFAULT_LAPTOP_IMAGE_ID, isDefaultDeviceImageSelected);
    } else {
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
    }
  } else if (state.sectionEnabled.type !== false) {
    deviceImageHandles = [];
    const dx = deviceOffset.x;
    const dy = deviceOffset.y;
    const imageBox = getDefaultPcImageRect();
    if (defaultPcImageObj && defaultPcImageObj.complete) {
      drawDefaultDeviceImage(defaultPcImageObj, DEFAULT_PC_IMAGE_CROP, imageBox, DEFAULT_PC_IMAGE_ID, isDefaultDeviceImageSelected);
    } else {
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
  }

  const procParts = state.processor.split(' ');
  const procMain = procParts.slice(0, 2).join(' ') || 'Intel';
  const procSub = procParts.slice(2, 4).join(' ') || 'Core';

  const tagsOffset = getLayoutOffset('tags');
  const tagsX = cardX + cardW - 180 + tagsOffset.x;
  const sharedStackMetrics = getUnifiedStackBadgeMetrics();
  const defaultTagW = sharedStackMetrics.w;
  const tagsStartY = cardY + 188 + tagsOffset.y;
  let tagY = tagsStartY;
  const tagGap = 10;
  let tagsBottom = tagsStartY;
  let tagsMaxW = defaultTagW;

  if (state.sectionEnabled.processor !== false && state.showIntelBadge && (state.processor || '').trim()) {
    const tagW = sharedStackMetrics.w;
    const processorPrimary = (state.processorCore || '').trim();
    const processorSecondary = (state.processorNumber || '').trim();
    const processorTertiary = (state.processorGeneration || '').trim();
    const headerText = state.lang === 'fr' ? 'PROCESSEUR' : 'PROCESSOR';
    const processorMetrics = getResponsiveProcessorBadgeMetrics(
      tagW,
      processorPrimary,
      processorSecondary,
      processorTertiary,
      headerText
    );
    const badgeH = sharedStackMetrics.h;
    const titleH = Math.max(24, Math.round(badgeH * 0.22));
    const outerPad = 6;
    const innerX = tagsX + outerPad;
    const innerY = tagY + titleH + 2;
    const innerW = tagW - (outerPad * 2);
    const innerH = Math.max(34, badgeH - titleH - outerPad - 2);
    const processorContent = [processorPrimary, processorSecondary, processorTertiary].filter(Boolean).join(' ');

    drawRoundedRect(tagsX, tagY, tagW, badgeH, 10, theme.tag1);
    drawRoundedRect(innerX, innerY, innerW, innerH, 6, '#f7fbff');
    drawCenteredBadgeLines(
      headerText,
      tagsX + 8,
      tagY + 5,
      tagW - 16,
      Math.max(16, titleH - 8),
      '#ffffff',
      sharedStackMetrics.headerFontSize || 10,
      sharedStackMetrics.headerMinSize || 9,
      '800',
      1
    );
    drawCenteredBadgeLines(
      processorContent,
      innerX + 8,
      innerY + 8,
      innerW - 16,
      innerH - 16,
      '#2f4f76',
      sharedStackMetrics.contentFontSize || 16,
      sharedStackMetrics.contentMinSize || 10,
      '800',
      3
    );

    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showIntelBadge = false;
    });
    registerStackBadgeResizeHandle('processor', tagsX, tagY, tagW, badgeH);
    tagsMaxW = Math.max(tagsMaxW, tagW);
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.screen !== false && state.showScreenBadge && (state.screenSize || '').trim()) {
    const tagW = sharedStackMetrics.w;
    const badgeH = sharedStackMetrics.h;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      shadeHexColor(theme.tag2, 0.08),
      (state.screenSize || '').trim(),
      '',
      '#111111',
      '',
      state.lang === 'fr' ? 'ECRAN' : 'SCREEN',
      sharedStackMetrics
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showScreenBadge = false;
    });
    registerStackBadgeResizeHandle('screen', tagsX, tagY, tagW, badgeH);
    tagsMaxW = Math.max(tagsMaxW, tagW);
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.badges !== false && state.sectionEnabled.battery !== false && state.showBatteryBadge) {
    const tagW = sharedStackMetrics.w;
    const badgeH = sharedStackMetrics.h;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      theme.batteryBadge,
      getBatteryPercentLabel(),
      '',
      '#111111',
      '',
      state.lang === 'fr' ? 'BATTERIE' : 'BATTERY',
      sharedStackMetrics
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showBatteryBadge = false;
    });
    registerStackBadgeResizeHandle('battery', tagsX, tagY, tagW, badgeH);
    tagsMaxW = Math.max(tagsMaxW, tagW);
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.storage !== false && state.showStorageBadge) {
    const tagW = sharedStackMetrics.w;
    const badgeH = sharedStackMetrics.h;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      theme.tag4,
      state.storageSize.replace(' ', ''),
      state.storageType,
      '#111111',
      '',
      state.lang === 'fr' ? 'DISQUE DUR' : 'HARD DRIVE',
      sharedStackMetrics
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showStorageBadge = false;
    });
    registerStackBadgeResizeHandle('storage', tagsX, tagY, tagW, badgeH);
    tagsMaxW = Math.max(tagsMaxW, tagW);
    tagsBottom = tagY + badgeH;
    tagY += badgeH + tagGap;
  }
  if (state.sectionEnabled.ram !== false && state.showRamBadge) {
    const tagW = sharedStackMetrics.w;
    const ramBadgeSubtext = (state.ramType || '').trim();
    const badgeH = sharedStackMetrics.h;
    drawTag(
      tagsX,
      tagY,
      tagW,
      badgeH,
      theme.tag5,
      state.ram.replace(' ', ''),
      ramBadgeSubtext,
      '#111111',
      '',
      'RAM',
      sharedStackMetrics
    );
    registerRemovableElement(tagsX, tagY, tagW, badgeH, () => {
      state.showRamBadge = false;
    });
    registerStackBadgeResizeHandle('ram', tagsX, tagY, tagW, badgeH);
    tagsMaxW = Math.max(tagsMaxW, tagW);
    tagsBottom = tagY + badgeH;
  }
  registerDraggableRegion(
    'tags',
    tagsX,
    tagsStartY,
    tagsMaxW,
    Math.max(78, tagsBottom - tagsStartY)
  );

  if (state.sectionEnabled.specifications !== false) {
    const specOffset = getLayoutOffset('spec');
    const specCards = Array.isArray(state.specCards) ? state.specCards : [];
    const specX = cardX + 34 + specOffset.x;
    const specY = cardY + cardH - 350 + specOffset.y;
    const measuredSections = specCards.map((card) => {
      const titleSource = card.title || card.titleEn || card.titleFr || '';
      const title = localizeSpecCardTitle(titleSource);
      const rows = Array.isArray(card.rows)
        ? card.rows
          .map((row) => getSpecRowLine(row))
          .filter(Boolean)
        : [];

      ctx.font = '900 17px Segoe UI';
      const titleWidth = ctx.measureText(title.toUpperCase()).width;
      let maxRowWidth = 0;
      rows.forEach((line) => {
        ctx.font = '800 18px Segoe UI';
        maxRowWidth = Math.max(maxRowWidth, ctx.measureText(line).width);
      });

      return { title, rows, titleWidth, maxRowWidth };
    });

    if (measuredSections.length > 0) {
      const availableSpecW = Math.max(220, cardW - 74 - specOffset.x);
      const specW = Math.max(
        180,
        Math.min(
          availableSpecW,
          Math.ceil(Math.max(
            180,
            ...measuredSections.map((sectionData) => Math.max(sectionData.titleWidth + 56, sectionData.maxRowWidth + 56))
          ))
        )
      );

      const sectionGap = 6;
      const headerH = 34;
      const rowH = 30;
      const emptySectionBodyH = 4;
      const filledSectionBottomPad = 6;
      const innerPadTop = 40;
      const innerPadBottom = 40;
      const innerPadX = 18;
      const totalBodyH = measuredSections.reduce((sum, sectionData, index) => {
        const sectionRowsH = sectionData.rows.length > 0
          ? (sectionData.rows.length * rowH) + filledSectionBottomPad
          : emptySectionBodyH;
        return sum + headerH + sectionRowsH + (index < measuredSections.length - 1 ? sectionGap : 0);
      }, 0);
      const specH = innerPadTop + totalBodyH + innerPadBottom;

      drawRoundedRect(specX, specY, specW, specH, 14, theme.specOuter);
      const specInnerGrad = ctx.createLinearGradient(specX + 6, specY + 6, specX + specW - 6, specY + specH - 6);
      specInnerGrad.addColorStop(0, theme.specInnerA);
      specInnerGrad.addColorStop(1, theme.specInnerB);
      drawRoundedRect(specX + 6, specY + 6, specW - 12, specH - 12, 12, specInnerGrad);

      let cursorY = specY + innerPadTop;
      measuredSections.forEach((sectionData, index) => {
        ctx.fillStyle = theme.specValue;
        ctx.font = '900 17px Segoe UI';
        ctx.fillText(sectionData.title.toUpperCase(), specX + 20, cursorY + 14);
        drawRoundedRect(specX + innerPadX, cursorY + 26, specW - (innerPadX * 2), 2, 1, 'rgba(255,255,255,0.42)');
        cursorY += headerH;

        sectionData.rows.forEach((line) => {
          ctx.fillStyle = '#dce8ff';
          const lineSize = fitText(line, specW - 40, '800', 18, 15, 'Segoe UI');
          ctx.font = `800 ${lineSize}px Segoe UI`;
          ctx.fillText(line, specX + 20, cursorY + 17);
          cursorY += rowH;
        });

        cursorY += sectionData.rows.length === 0 ? emptySectionBodyH : filledSectionBottomPad;

        if (index < measuredSections.length - 1) {
          cursorY += sectionGap;
        }
      });

      registerDraggableRegion('spec', specX, specY, specW, specH);
      registerRemovableElement(specX, specY, specW, specH, () => {
        state.sectionEnabled.specifications = false;
      });
    }
  }

  drawPriceBadge(cardX, cardY, cardW, cardH, theme);
  drawContactBadge(cardX, cardY, cardW, cardH, theme);

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
  const tabCharger = document.getElementById('tabCharger');
  const tabDiffFormat = document.getElementById('tabDiffFormat');
  const tabBrands = document.getElementById('tabBrands');
  const activeTab = getActiveWorkspaceTab();
  if (tabCharger && tabDiffFormat && tabBrands) {
    tabCharger.textContent = t().labels.generatorCharger;
    tabDiffFormat.textContent = t().labels.generatorDiff;
    tabBrands.textContent = t().labels.generatorBrands;
    tabCharger.classList.toggle('active', activeTab === 'charger');
    tabDiffFormat.classList.toggle('active', activeTab === 'diff');
    tabBrands.classList.toggle('active', activeTab === 'brands');
  }
  if (!isGenerating) {
    document.getElementById('btnGeneratePng').textContent = t().generatePng;
    document.getElementById('btnGenerateJpg').textContent = t().generateJpg;
    const saveLayoutBtn = document.getElementById('btnSaveLayout');
    if (saveLayoutBtn) {
      saveLayoutBtn.textContent = t().saveLayout;
    }
    if (btnHigherResolution) {
      btnHigherResolution.textContent = t().higherResolution;
    }
  }
  if (brandsDialogTitle) {
    brandsDialogTitle.textContent = t().labels.generatorBrands;
  }
  if (btnBrandsConfirmAdd) {
    btnBrandsConfirmAdd.textContent = t().labels.brandsAdd;
  }
  if (brandsNameInput) {
    brandsNameInput.placeholder = t().labels.brandsNamePlaceholder;
  }
  if (brandsEmptyText) {
    brandsEmptyText.textContent = t().labels.brandsEmpty;
  }
  if (btnBrandsClose) {
    btnBrandsClose.textContent = t().labels.brandsClose;
  }
  if (btnBrandsAddToggle) {
    btnBrandsAddToggle.title = t().labels.brandsAdd;
    btnBrandsAddToggle.setAttribute('aria-label', t().labels.brandsAdd);
  }
  if (!isGenerating) {
    statusText.textContent = exportDesignSession
      ? getExportDialogText().design.replace('{size}', `${exportDesignSession.width} x ${exportDesignSession.height}`)
      : t().statusReady;
  }
  refreshExportDialogUi();
  if (exportDesignSession && designModeText) {
    designModeText.textContent = getExportDialogText().design.replace('{size}', `${exportDesignSession.width} x ${exportDesignSession.height}`);
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
  renderBrandsDialog();
}

function exportImage(extension) {
  const mime = extension === 'jpg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(mime, extension === 'jpg' ? 1 : undefined);
}

async function ensureBrandExportFolderSelected() {
  if (exportBaseFolder) {
    return exportBaseFolder;
  }
  if (!window.desktopApi?.pickFolder) {
    statusText.textContent = 'Folder picker unavailable. Restart the app.';
    return '';
  }
  const result = await window.desktopApi.pickFolder();
  if (result?.canceled || !result?.folderPath) {
    statusText.textContent = t().statusChooseExportFolder;
    return '';
  }
  exportBaseFolder = result.folderPath;
  persistExportBaseFolder(exportBaseFolder);
  const syncResult = await syncAllBrandFolders(exportBaseFolder);
  if (!syncResult?.ok) {
    statusText.textContent = syncResult?.error || t().statusLayoutSaveFailed;
    return '';
  }
  if (exportFolderPathInput) {
    exportFolderPathInput.value = exportBaseFolder;
  }
  statusText.textContent = t().statusExportFolderSaved(exportBaseFolder);
  return exportBaseFolder;
}

async function saveImageDataUrl(dataUrl, extension, options = {}) {
  const defaultFileName = String(options.defaultFileName || `${getGeneratedFileNameBase()}.${extension}`);

  if (activeBrandName) {
    if (!window.desktopApi?.saveImageToBrandFolder) {
      return { saved: false, error: 'Save API unavailable. Restart the app.' };
    }
    const baseFolderPath = options.baseFolderPath || await ensureBrandExportFolderSelected();
    if (!baseFolderPath) {
      return { saved: false, error: t().statusChooseExportFolder };
    }
    return window.desktopApi.saveImageToBrandFolder({
      base64Data: dataUrl,
      extension,
      baseFolderPath,
      brandName: activeBrandName,
      fileName: defaultFileName,
    });
  }

  if (!window.desktopApi?.saveImage) {
    return { saved: false, error: 'Save API unavailable. Restart the app.' };
  }

  return window.desktopApi.saveImage({
    base64Data: dataUrl,
    extension,
    defaultFileName,
  });
}

async function generateImageFromSnapshot(extension, designSnapshot, options = {}) {
  const originalSnapshot = createCurrentDesignSnapshot();
  try {
    applyDesignSnapshot(designSnapshot);
    drawPoster();
    const dataUrl = exportImage(extension);
    return saveImageDataUrl(dataUrl, extension, options);
  } finally {
    applyDesignSnapshot(originalSnapshot);
  }
}

async function generateImage(extension, options = {}) {
  if (isGenerating) {
    return;
  }
  setGeneratingState(true);
  try {
    const startedAt = Date.now();
    if (options.width && options.height && (canvas.width !== options.width || canvas.height !== options.height)) {
      setCanvasResolution(options.width, options.height);
    } else {
      drawPoster();
    }
    const dataUrl = exportImage(extension);
    const result = await saveImageDataUrl(dataUrl, extension, {
      defaultFileName: options.defaultFileName || `${options.fileNameBase || getGeneratedFileNameBase(options.resolutionValue, options.fileNameMode)}.${extension}`,
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
    if (options.restoreAfterSave && result.saved) {
      exitExportDesignMode();
    }
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
  const priceBadgeHit = pointInRect(p, priceBadgeBodyRect);
  const storageBadgeHandleHit = pointInRect(p, storageBadgeResizeHandleRect);
  const storageBadgeHit = pointInRect(p, storageBadgeBodyRect);
  const osBadgeHandleHit = pointInRect(p, osBadgeResizeHandleRect);
  const osBadgeHit = pointInRect(p, osBadgeBodyRect);
  const guaranteeBadgeHandleHit = pointInRect(p, guaranteeBadgeResizeHandleRect);
  const guaranteeBadgeHit = pointInRect(p, guaranteeBadgeBodyRect);
  const diffBrandBoxHandleHit = findTopDiffBrandBoxCropHandle(p);
  const diffBrandBoxHit = state.diffBrandBoxCropEnabled && pointInRect(p, diffBrandBoxBodyRect);
  const pointsTextHandleHit = pointInRect(p, pointsTextResizeHandleRect);
  const pointsTextHit = pointInRect(p, pointsTextBodyRect);
  const reconditionedHandleHit = pointInRect(p, reconditionedResizeHandleRect);
  const reconditionedHit = pointInRect(p, reconditionedBodyRect);
  const stackBadgeHandleHit = findTopStackBadgeHandle(p);
  const stackBadgeHit = findTopStackBadgeBody(p);
  const draggableHit = findTopDraggableRegion(p);
  const handleHit = findTopDeviceImageHandle(p);
  if (priceBadgeHit) {
    const selectionSnapshotBefore = getCanvasSelectionSnapshot();
    const hadSelectedDeviceImage = !!getSelectedInteractiveImageId();
    if (hadSelectedDeviceImage) {
      setSelectedInteractiveImageId(null);
    }
    isDefaultDeviceImageSelected = false;
    applyExclusiveCanvasSelection({
      type: 'price',
      dragKey: state.generator === 'diff' ? 'diffPrice' : 'price',
    });
    const selectionSnapshotAfter = getCanvasSelectionSnapshot();
    if (hadSelectedDeviceImage) {
      renderControls();
    }
    if (selectionSnapshotBefore !== selectionSnapshotAfter) {
      drawPoster();
    }
    const current = getLayoutOffset(state.generator === 'diff' ? 'diffPrice' : 'price');
    activeDrag = {
      key: state.generator === 'diff' ? 'diffPrice' : 'price',
      startX: p.x,
      startY: p.y,
      baseX: current.x,
      baseY: current.y,
    };
    canvas.style.cursor = 'grabbing';
    event.preventDefault();
    return;
  }
  if (handleHit) {
    if (isDefaultDeviceImageId(handleHit.id)) {
      clearExclusiveCanvasSelections();
      setSelectedInteractiveImageId(null);
      const currentSize = getDefaultDeviceImageSize(handleHit.id);
      isDefaultDeviceImageSelected = true;
      isResizingDeviceImage = true;
      resizingDeviceImageId = handleHit.id;
      deviceResizeStart = {
        x: p.x,
        y: p.y,
        w: currentSize.w,
        h: currentSize.h,
        ratio: currentSize.w / Math.max(1, currentSize.h),
      };
      canvas.style.cursor = 'nwse-resize';
      drawPoster();
      event.preventDefault();
      return;
    }
    const layer = getCurrentInteractiveImages().find((img) => img.id === handleHit.id);
    if (layer) {
      clearExclusiveCanvasSelections();
      isDefaultDeviceImageSelected = false;
      setSelectedInteractiveImageId(layer.id);
      renderControls();
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
      drawPoster();
      event.preventDefault();
      return;
    }
  }

  const imageHit = findTopDeviceImageBody(p);
  if (imageHit) {
    if (isDefaultDeviceImageId(imageHit.id)) {
      clearExclusiveCanvasSelections();
      setSelectedInteractiveImageId(null);
      isDefaultDeviceImageSelected = true;
      const deviceDragKey = state.generator === 'diff' ? 'diffDevice' : 'device';
      const current = getLayoutOffset(deviceDragKey);
      activeDrag = {
        key: deviceDragKey,
        startX: p.x,
        startY: p.y,
        baseX: current.x,
        baseY: current.y,
      };
      canvas.style.cursor = 'grabbing';
      drawPoster();
      event.preventDefault();
      return;
    }
    const layer = getCurrentInteractiveImages().find((img) => img.id === imageHit.id);
    if (layer) {
      clearExclusiveCanvasSelections();
      isDefaultDeviceImageSelected = false;
      setSelectedInteractiveImageId(layer.id);
      renderControls();
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

  const selectionSnapshotBefore = getCanvasSelectionSnapshot();
  const hadSelectedDeviceImage = !!getSelectedInteractiveImageId();
  const hadDefaultDeviceImageSelected = isDefaultDeviceImageSelected;
  const keepDefaultDeviceImageSelected = isDefaultDeviceImageId(handleHit?.id)
    || isDefaultDeviceImageId(imageHit?.id)
    || draggableHit?.key === 'device'
    || draggableHit?.key === 'diffDevice';
  const preferredCanvasTarget = resolvePreferredCanvasElementTarget({
    logoHandleHit,
    logoBadgeHandleHit,
    logoBadgeHit,
    logoBodyHit,
    priceBadgeHit,
    storageBadgeHandleHit,
    storageBadgeHit,
    osBadgeHandleHit,
    osBadgeHit,
    guaranteeBadgeHandleHit,
    guaranteeBadgeHit,
    diffBrandBoxHandleHit,
    diffBrandBoxHit,
    pointsTextHandleHit,
    pointsTextHit,
    reconditionedHandleHit,
    reconditionedHit,
    stackBadgeHandleHit,
    stackBadgeHit,
  });
  if (hadSelectedDeviceImage) {
    setSelectedInteractiveImageId(null);
  }
  if (hadDefaultDeviceImageSelected && !keepDefaultDeviceImageSelected) {
    isDefaultDeviceImageSelected = false;
  }
  if (preferredCanvasTarget) {
    applyExclusiveCanvasSelection(preferredCanvasTarget);
  } else {
    clearExclusiveCanvasSelections();
  }
  const selectionSnapshotAfter = getCanvasSelectionSnapshot();
  if (selectionSnapshotBefore !== selectionSnapshotAfter) {
    drawPoster();
  }

  if (diffBrandBoxHandleHit && diffBrandBoxBodyRect) {
    activeDiffBrandBoxCrop = {
      side: diffBrandBoxHandleHit.side,
      startX: p.x,
      startY: p.y,
      baseCrop: normalizeBrandBoxCrop(state.diffBrandBoxCrop),
      baseRect: {
        w: diffBrandBoxBodyRect.w + (state.diffBrandBoxCrop.left || 0) + (state.diffBrandBoxCrop.right || 0),
        h: diffBrandBoxBodyRect.h + (state.diffBrandBoxCrop.top || 0) + (state.diffBrandBoxCrop.bottom || 0),
      },
    };
    canvas.style.cursor = diffBrandBoxHandleHit.cursor || 'move';
    event.preventDefault();
    return;
  }

  if (preferredCanvasTarget?.type === 'diffBrandBox') {
    canvas.style.cursor = 'default';
    event.preventDefault();
    return;
  }

  if (stackBadgeHandleHit) {
    const currentSize = getStackBadgeSize(stackBadgeHandleHit.key);
    isResizingStackBadge = true;
    stackBadgeResizeStart = {
      key: stackBadgeHandleHit.key,
      x: p.x,
      y: p.y,
      w: currentSize.w,
      h: currentSize.h,
      minW: stackBadgeHandleHit.minW || 86,
      minH: stackBadgeHandleHit.minH || 86,
    };
    canvas.style.cursor = 'nwse-resize';
    event.preventDefault();
    return;
  }

  if (osBadgeHandleHit && osBadgeResizeHandleRect) {
    isResizingOsBadge = true;
    osBadgeResizeStart = {
      x: p.x,
      y: p.y,
      w: Number(state.osBadgeSize?.w) || DEFAULT_OS_BADGE_SIZE.w,
      h: Number(state.osBadgeSize?.h) || DEFAULT_OS_BADGE_SIZE.h,
      minW: osBadgeResizeHandleRect.minW || 96,
      minH: osBadgeResizeHandleRect.minH || 112,
    };
    canvas.style.cursor = 'nwse-resize';
    event.preventDefault();
    return;
  }

  if (guaranteeBadgeHandleHit && guaranteeBadgeResizeHandleRect) {
    isResizingGuaranteeBadge = true;
    guaranteeBadgeResizeStart = {
      x: p.x,
      y: p.y,
      w: Number(state.guaranteeBadgeSize?.w) || DEFAULT_GUARANTEE_BADGE_SIZE.w,
      h: Number(state.guaranteeBadgeSize?.h) || DEFAULT_GUARANTEE_BADGE_SIZE.h,
      minW: guaranteeBadgeResizeHandleRect.minW || 96,
      minH: guaranteeBadgeResizeHandleRect.minH || 112,
    };
    canvas.style.cursor = 'nwse-resize';
    event.preventDefault();
    return;
  }

  if (pointsTextHandleHit && pointsTextResizeHandleRect) {
    isResizingPointsText = true;
    pointsTextResizeStart = {
      x: p.x,
      y: p.y,
      w: Number(state.diffPointsTextSize?.w) || DEFAULT_DIFF_POINTS_TEXT_SIZE.w,
      h: Number(state.diffPointsTextSize?.h) || DEFAULT_DIFF_POINTS_TEXT_SIZE.h,
      minW: pointsTextResizeHandleRect.minW || 90,
      minH: pointsTextResizeHandleRect.minH || 90,
    };
    canvas.style.cursor = 'nwse-resize';
    event.preventDefault();
    return;
  }

  if (reconditionedHandleHit && reconditionedResizeHandleRect) {
    isResizingReconditioned = true;
    reconditionedResizeStart = {
      x: p.x,
      y: p.y,
      w: Number(state.diffReconditionedSize?.w) || DEFAULT_DIFF_RECONDITIONED_SIZE.w,
      h: Number(state.diffReconditionedSize?.h) || DEFAULT_DIFF_RECONDITIONED_SIZE.h,
      minW: reconditionedResizeHandleRect.minW || 90,
      minH: reconditionedResizeHandleRect.minH || 90,
    };
    canvas.style.cursor = 'nwse-resize';
    event.preventDefault();
    return;
  }

  if (storageBadgeHandleHit && storageBadgeResizeHandleRect) {
    isResizingStorageBadge = true;
    storageBadgeResizeStart = {
      x: p.x,
      y: p.y,
      w: Number(state.storageBadgeSize?.w) || 340,
      h: Number(state.storageBadgeSize?.h) || 108,
      minW: storageBadgeResizeHandleRect.minW || 220,
      minH: storageBadgeResizeHandleRect.minH || 82,
    };
    canvas.style.cursor = 'nwse-resize';
    event.preventDefault();
    return;
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
    const hit = preferredCanvasTarget?.dragKey
      ? { key: preferredCanvasTarget.dragKey }
      : draggableHit;
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
  const hit = preferredCanvasTarget?.dragKey
    ? { key: preferredCanvasTarget.dragKey }
    : draggableHit;
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
    if (isDefaultDeviceImageId(resizingDeviceImageId)) {
      const delta = Math.max(p.x - deviceResizeStart.x, p.y - deviceResizeStart.y);
      const nextW = Math.max(120, deviceResizeStart.w + delta);
      const nextH = Math.max(90, nextW / Math.max(0.1, deviceResizeStart.ratio));
      setDefaultDeviceImageSize(resizingDeviceImageId, {
        w: Math.round(nextW),
        h: Math.round(nextH),
      });
      drawPoster();
      canvas.style.cursor = 'nwse-resize';
      return;
    }
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

  if (activeDiffBrandBoxCrop) {
    const dx = p.x - activeDiffBrandBoxCrop.startX;
    const dy = p.y - activeDiffBrandBoxCrop.startY;
    const nextCrop = {
      ...activeDiffBrandBoxCrop.baseCrop,
    };
    const minW = 16;
    const minH = 16;
    const maxLeft = Math.max(0, activeDiffBrandBoxCrop.baseRect.w - activeDiffBrandBoxCrop.baseCrop.right - minW);
    const maxRight = Math.max(0, activeDiffBrandBoxCrop.baseRect.w - activeDiffBrandBoxCrop.baseCrop.left - minW);
    const maxTop = Math.max(0, activeDiffBrandBoxCrop.baseRect.h - activeDiffBrandBoxCrop.baseCrop.bottom - minH);
    const maxBottom = Math.max(0, activeDiffBrandBoxCrop.baseRect.h - activeDiffBrandBoxCrop.baseCrop.top - minH);

    if (activeDiffBrandBoxCrop.side === 'left') {
      nextCrop.left = Math.max(0, Math.min(maxLeft, Math.round(activeDiffBrandBoxCrop.baseCrop.left + dx)));
    } else if (activeDiffBrandBoxCrop.side === 'right') {
      nextCrop.right = Math.max(0, Math.min(maxRight, Math.round(activeDiffBrandBoxCrop.baseCrop.right - dx)));
    } else if (activeDiffBrandBoxCrop.side === 'top') {
      nextCrop.top = Math.max(0, Math.min(maxTop, Math.round(activeDiffBrandBoxCrop.baseCrop.top + dy)));
    } else if (activeDiffBrandBoxCrop.side === 'bottom') {
      nextCrop.bottom = Math.max(0, Math.min(maxBottom, Math.round(activeDiffBrandBoxCrop.baseCrop.bottom - dy)));
    }

    state.diffBrandBoxCrop = clampDiffBrandBoxCrop(
      nextCrop,
      activeDiffBrandBoxCrop.baseRect.w,
      activeDiffBrandBoxCrop.baseRect.h
    );
    drawPoster();
    canvas.style.cursor = activeDiffBrandBoxCrop.side === 'left' || activeDiffBrandBoxCrop.side === 'right'
      ? 'ew-resize'
      : 'ns-resize';
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

  if (isResizingStorageBadge && storageBadgeResizeStart) {
    const dx = p.x - storageBadgeResizeStart.x;
    const dy = p.y - storageBadgeResizeStart.y;
    const nextW = Math.max(storageBadgeResizeStart.minW, Math.round(storageBadgeResizeStart.w + dx));
    const nextH = Math.max(storageBadgeResizeStart.minH, Math.round(storageBadgeResizeStart.h + dy));
    state.storageBadgeSize = { w: nextW, h: nextH };
    drawPoster();
    canvas.style.cursor = 'nwse-resize';
    return;
  }

  if (isResizingStackBadge && stackBadgeResizeStart) {
    const dx = p.x - stackBadgeResizeStart.x;
    const dy = p.y - stackBadgeResizeStart.y;
    const nextW = Math.max(stackBadgeResizeStart.minW, Math.round(stackBadgeResizeStart.w + dx));
    const nextH = Math.max(stackBadgeResizeStart.minH, Math.round(stackBadgeResizeStart.h + dy));
    state.stackBadgeSizes = Object.fromEntries(
      Object.keys(state.stackBadgeSizes || cloneDefaultStackBadgeSizes()).map((key) => [key, { w: nextW, h: nextH }])
    );
    drawPoster();
    canvas.style.cursor = 'nwse-resize';
    return;
  }

  if (isResizingOsBadge && osBadgeResizeStart) {
    const dx = p.x - osBadgeResizeStart.x;
    const dy = p.y - osBadgeResizeStart.y;
    const nextW = Math.max(osBadgeResizeStart.minW, Math.round(osBadgeResizeStart.w + dx));
    const nextH = Math.max(osBadgeResizeStart.minH, Math.round(osBadgeResizeStart.h + dy));
    state.osBadgeSize = { w: nextW, h: nextH };
    state.osBadgeSizeAdjusted = true;
    drawPoster();
    canvas.style.cursor = 'nwse-resize';
    return;
  }

  if (isResizingGuaranteeBadge && guaranteeBadgeResizeStart) {
    const dx = p.x - guaranteeBadgeResizeStart.x;
    const dy = p.y - guaranteeBadgeResizeStart.y;
    const nextW = Math.max(guaranteeBadgeResizeStart.minW, Math.round(guaranteeBadgeResizeStart.w + dx));
    const nextH = Math.max(guaranteeBadgeResizeStart.minH, Math.round(guaranteeBadgeResizeStart.h + dy));
    state.guaranteeBadgeSize = { w: nextW, h: nextH };
    state.guaranteeBadgeSizeAdjusted = true;
    drawPoster();
    canvas.style.cursor = 'nwse-resize';
    return;
  }

  if (isResizingPointsText && pointsTextResizeStart) {
    const dx = p.x - pointsTextResizeStart.x;
    const dy = p.y - pointsTextResizeStart.y;
    const nextW = Math.max(pointsTextResizeStart.minW, Math.round(pointsTextResizeStart.w + dx));
    const nextH = Math.max(pointsTextResizeStart.minH, Math.round(pointsTextResizeStart.h + dy));
    state.diffPointsTextSize = { w: nextW, h: nextH };
    drawPoster();
    canvas.style.cursor = 'nwse-resize';
    return;
  }

  if (isResizingReconditioned && reconditionedResizeStart) {
    const dx = p.x - reconditionedResizeStart.x;
    const dy = p.y - reconditionedResizeStart.y;
    const nextW = Math.max(reconditionedResizeStart.minW, Math.round(reconditionedResizeStart.w + dx));
    const nextH = Math.max(reconditionedResizeStart.minH, Math.round(reconditionedResizeStart.h + dy));
    state.diffReconditionedSize = { w: nextW, h: nextH };
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
  if (pointInRect(p, storageBadgeResizeHandleRect)) {
    canvas.style.cursor = 'nwse-resize';
    return;
  }
  if (pointInRect(p, osBadgeResizeHandleRect)) {
    canvas.style.cursor = 'nwse-resize';
    return;
  }
  if (pointInRect(p, guaranteeBadgeResizeHandleRect)) {
    canvas.style.cursor = 'nwse-resize';
    return;
  }
  const diffBrandBoxHandle = findTopDiffBrandBoxCropHandle(p);
  if (diffBrandBoxHandle) {
    canvas.style.cursor = diffBrandBoxHandle.cursor || 'default';
    return;
  }
  if (state.diffBrandBoxCropEnabled && pointInRect(p, diffBrandBoxBodyRect)) {
    canvas.style.cursor = 'pointer';
    return;
  }
  if (pointInRect(p, pointsTextResizeHandleRect)) {
    canvas.style.cursor = 'nwse-resize';
    return;
  }
  if (pointInRect(p, reconditionedResizeHandleRect)) {
    canvas.style.cursor = 'nwse-resize';
    return;
  }
  if (pointInRect(p, priceBadgeBodyRect)) {
    canvas.style.cursor = 'move';
    return;
  }
  if (findTopStackBadgeHandle(p)) {
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
  const shouldPersistLayout = !!(
    activeDrag
    || isDefaultDeviceImageId(resizingDeviceImageId)
    || isResizingLogo
    || isResizingLogoBadge
    || isResizingStorageBadge
    || isResizingStackBadge
    || isResizingOsBadge
    || isResizingGuaranteeBadge
    || activeDiffBrandBoxCrop
    || isResizingPointsText
    || isResizingReconditioned
  );
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
  isResizingStorageBadge = false;
  storageBadgeResizeStart = null;
  isResizingStackBadge = false;
  stackBadgeResizeStart = null;
  isResizingOsBadge = false;
  osBadgeResizeStart = null;
  isResizingGuaranteeBadge = false;
  guaranteeBadgeResizeStart = null;
  activeDiffBrandBoxCrop = null;
  isResizingPointsText = false;
  pointsTextResizeStart = null;
  isResizingReconditioned = false;
  reconditionedResizeStart = null;
  activeDrag = null;
  isDraggingText = false;
  draggingTextId = null;
  textDragStart = null;
  canvas.style.cursor = 'default';
  if (shouldPersistLayout) {
    persistLayoutPreferences();
  }
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
  let shouldRedraw = false;
  if (!clickedEditor && event.target !== canvas && activeTextId) {
    activeTextId = null;
    hideTextEditor();
    shouldRedraw = true;
  }
  if (selectAllElementsMode && event.target !== canvas) {
    selectAllElementsMode = false;
    shouldRedraw = true;
  }
  if (event.target !== canvas && isStorageBadgeSelected) {
    isStorageBadgeSelected = false;
    shouldRedraw = true;
  }
  if (event.target !== canvas && isPriceBadgeSelected) {
    isPriceBadgeSelected = false;
    shouldRedraw = true;
  }
  if (event.target !== canvas && isOsBadgeSelected) {
    isOsBadgeSelected = false;
    shouldRedraw = true;
  }
  if (event.target !== canvas && isGuaranteeBadgeSelected) {
    isGuaranteeBadgeSelected = false;
    shouldRedraw = true;
  }
  if (event.target !== canvas && isDiffBrandBoxSelected) {
    isDiffBrandBoxSelected = false;
    shouldRedraw = true;
  }
  if (event.target !== canvas && isPointsTextSelected) {
    isPointsTextSelected = false;
    shouldRedraw = true;
  }
  if (event.target !== canvas && isReconditionedSelected) {
    isReconditionedSelected = false;
    shouldRedraw = true;
  }
  if (event.target !== canvas && selectedStackBadgeKey) {
    selectedStackBadgeKey = null;
    shouldRedraw = true;
  }
  if (event.target !== canvas && isDefaultDeviceImageSelected) {
    isDefaultDeviceImageSelected = false;
    shouldRedraw = true;
  }
  if (!isLogoSelected) {
    if (shouldRedraw) {
      drawPoster();
    }
    return;
  }
  if (event.target === canvas) {
    if (shouldRedraw) {
      drawPoster();
    }
    return;
  }
  isLogoSelected = false;
  shouldRedraw = true;
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

const tabCharger = document.getElementById('tabCharger');
const tabDiffFormat = document.getElementById('tabDiffFormat');
const tabBrands = document.getElementById('tabBrands');
if (tabCharger && tabDiffFormat && tabBrands) {
  tabCharger.addEventListener('click', () => {
    if (state.generator === 'charger' && !activeBrandName) {
      return;
    }
    activeBrandName = '';
    closeBrandsDialog();
    state.generator = 'charger';
    setUiLanguage();
    renderControls();
    drawPoster();
  });
  tabDiffFormat.addEventListener('click', () => {
    if (state.generator === 'diff' && !activeBrandName) {
      return;
    }
    activeBrandName = '';
    closeBrandsDialog();
    state.generator = 'diff';
    setUiLanguage();
    renderControls();
    drawPoster();
  });
  tabBrands.addEventListener('click', () => {
    openBrandsDialog();
    setUiLanguage();
  });
}

function openExportDialog(extension) {
  if (!exportDialog) {
    generateImage(extension);
    return;
  }
  pendingExportExtension = extension;
  exportDialog.querySelector('input[name="exportMode"][value="current"]').checked = true;
  if (resolutionSelect) {
    resolutionSelect.value = getSelectedHigherResolutionValue();
  }
  updateResolutionGroupVisibility();
  refreshExportDialogUi();
  exportDialog.showModal();
}

async function saveCurrentCanvasImageForExport(extension, options = {}) {
  drawPoster();
  const dataUrl = exportImage(extension);
  return saveImageDataUrl(dataUrl, extension, options);
}

async function generateExportSelection(extension, mode, resolutionValue) {
  if (isGenerating) {
    return;
  }

  const higherResolutionLabel = getResolutionLabel(resolutionValue);
  const { width, height } = getResolutionParts(resolutionValue);
  const higherVariantKey = getExportDesignVariantKey(width, height);
  const needsHigherLayout = mode === 'higher' || mode === 'both';

  if (needsHigherLayout && !getSavedExportDesignVariant(higherVariantKey)) {
    statusText.textContent = t().statusHigherResolutionNeeded(higherResolutionLabel);
    return;
  }

  let brandFolderPath = '';
  if (activeBrandName) {
    brandFolderPath = exportBaseFolder || await ensureBrandExportFolderSelected();
    if (!brandFolderPath) {
      return;
    }
  }

  setGeneratingState(true);
  try {
    const startedAt = Date.now();
    const batchStamp = formatExportTimestamp(new Date());
    let finalResult = null;

    if (mode === 'current') {
      finalResult = await saveCurrentCanvasImageForExport(extension, {
        defaultFileName: `${batchStamp}.${extension}`,
        baseFolderPath: brandFolderPath,
      });
    } else if (mode === 'higher') {
      finalResult = await generateImageFromSnapshot(
        extension,
        getSavedExportDesignVariant(higherVariantKey),
        {
          defaultFileName: `${batchStamp}_${resolutionValue}.${extension}`,
          baseFolderPath: brandFolderPath,
        }
      );
    } else {
      const currentResult = await saveCurrentCanvasImageForExport(extension, {
        defaultFileName: `${batchStamp}_current.${extension}`,
        baseFolderPath: brandFolderPath,
      });
      if (!currentResult?.saved || !currentResult?.filePath) {
        finalResult = currentResult;
      } else {
        finalResult = await generateImageFromSnapshot(
          extension,
          getSavedExportDesignVariant(higherVariantKey),
          {
            defaultFileName: `${batchStamp}_${resolutionValue}.${extension}`,
            baseFolderPath: brandFolderPath,
          }
        );
        if (finalResult?.saved && activeBrandName) {
          finalResult.multipleSaved = true;
          finalResult.brandFolderPath = finalResult.brandFolderPath || currentResult.brandFolderPath || brandFolderPath;
        }
      }
    }

    const elapsed = Date.now() - startedAt;
    const minLoaderMs = 520;
    if (elapsed < minLoaderMs) {
      await sleep(minLoaderMs - elapsed);
    }

    if (!finalResult?.saved) {
      statusText.textContent = finalResult?.error || t().statusCanceled;
      return;
    }

    if (!finalResult.filePath) {
      statusText.textContent = t().statusCanceled;
      return;
    }

    statusText.textContent = finalResult.multipleSaved
      ? t().statusSavedMultiple(finalResult.brandFolderPath || brandFolderPath)
      : t().statusSaved(finalResult.filePath);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown export error.';
    statusText.textContent = `Export failed: ${message}`;
  } finally {
    setGeneratingState(false);
  }
}

document.getElementById('btnGeneratePng').addEventListener('click', () => {
  if (exportDesignSession) {
    generateImage('png', {
      width: exportDesignSession.width,
      height: exportDesignSession.height,
      fileNameMode: 'higher',
      resolutionValue: `${exportDesignSession.width}x${exportDesignSession.height}`,
      restoreAfterSave: true,
    });
    return;
  }
  openExportDialog('png');
});
document.getElementById('btnGenerateJpg').addEventListener('click', () => {
  if (exportDesignSession) {
    generateImage('jpg', {
      width: exportDesignSession.width,
      height: exportDesignSession.height,
      fileNameMode: 'higher',
      resolutionValue: `${exportDesignSession.width}x${exportDesignSession.height}`,
      restoreAfterSave: true,
    });
    return;
  }
  openExportDialog('jpg');
});
document.getElementById('btnSaveLayout')?.addEventListener('click', () => {
  if (activeBrandName) {
    const saved = saveLayoutForActiveBrand();
    statusText.textContent = saved
      ? (
        exportDesignSession
          ? t().statusHigherResolutionLayoutSaved(getResolutionLabel(`${exportDesignSession.width}x${exportDesignSession.height}`))
          : t().statusBrandLayoutSaved(activeBrandName)
      )
      : (
        exportDesignSession
          ? t().statusHigherResolutionLayoutSaveFailed(getResolutionLabel(`${exportDesignSession.width}x${exportDesignSession.height}`))
          : t().statusBrandLayoutSaveFailed(activeBrandName)
      );
    return;
  }
  if (exportDesignSession) {
    const saved = saveCurrentExportDesignVariant({ persist: true });
    statusText.textContent = saved
      ? t().statusHigherResolutionLayoutSaved(getResolutionLabel(`${exportDesignSession.width}x${exportDesignSession.height}`))
      : t().statusHigherResolutionLayoutSaveFailed(getResolutionLabel(`${exportDesignSession.width}x${exportDesignSession.height}`));
    return;
  }
  const saved = persistSavedDefaultLayout() && persistSavedDefaultExportVariants();
  statusText.textContent = saved ? t().statusLayoutSaved : t().statusLayoutSaveFailed;
});

btnHigherResolution?.addEventListener('click', () => {
  const resolutionValue = getSelectedHigherResolutionValue();
  const { width, height } = getResolutionParts(resolutionValue);
  enterExportDesignMode(pendingExportExtension || 'png', width, height);
});

higherResolutionSelect?.addEventListener('change', () => {
  if (resolutionSelect) {
    resolutionSelect.value = higherResolutionSelect.value;
  }
});

resolutionSelect?.addEventListener('change', () => {
  if (higherResolutionSelect) {
    higherResolutionSelect.value = resolutionSelect.value;
  }
});

btnBrandsAddToggle?.addEventListener('click', () => {
  const isVisible = !brandsAddRow?.classList.contains('hidden');
  setBrandsAddRowVisible(!isVisible);
});

btnBrandsConfirmAdd?.addEventListener('click', () => {
  addBrandFromInput();
});

brandsNameInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addBrandFromInput();
  }
});

btnBrandsClose?.addEventListener('click', () => {
  closeBrandsDialog();
});

brandsDialog?.addEventListener('close', () => {
  setBrandsAddRowVisible(false);
  setUiLanguage();
});

if (exportDialog) {
  exportDialog.querySelectorAll('input[name="exportMode"]').forEach((input) => {
    input.addEventListener('change', updateResolutionGroupVisibility);
  });
  btnChooseExportFolder?.addEventListener('click', async () => {
    if (!window.desktopApi?.pickFolder) {
      statusText.textContent = 'Folder picker unavailable. Restart the app.';
      return;
    }
    const result = await window.desktopApi.pickFolder();
    if (result?.canceled || !result?.folderPath) {
      return;
    }
    exportBaseFolder = result.folderPath;
    persistExportBaseFolder(exportBaseFolder);
    const syncResult = await syncAllBrandFolders(exportBaseFolder);
    if (!syncResult?.ok) {
      statusText.textContent = syncResult?.error || t().statusLayoutSaveFailed;
      return;
    }
    if (exportFolderPathInput) {
      exportFolderPathInput.value = exportBaseFolder;
    }
    statusText.textContent = t().statusExportFolderSaved(exportBaseFolder);
  });
  document.getElementById('btnExportDialogCancel')?.addEventListener('click', () => {
    pendingExportExtension = null;
    closeExportDialog();
  });
  document.getElementById('btnExportDialogConfirm')?.addEventListener('click', async () => {
    const mode = exportDialog.querySelector('input[name="exportMode"]:checked')?.value || 'current';
    const extension = pendingExportExtension || 'png';
    const selectedResolutionValue = String(resolutionSelect?.value || getSelectedHigherResolutionValue());
    closeExportDialog();
    await generateExportSelection(extension, mode, selectedResolutionValue);
  });
}

btnDesignCancel?.addEventListener('click', () => {
  exitExportDesignMode();
});

btnDesignExport?.addEventListener('click', () => {
  if (!exportDesignSession) {
    return;
  }
  generateImage(pendingExportExtension || 'png', {
    width: exportDesignSession.width,
    height: exportDesignSession.height,
    fileNameMode: 'higher',
    resolutionValue: `${exportDesignSession.width}x${exportDesignSession.height}`,
    restoreAfterSave: true,
  });
});

resetLayoutToDefault();
appDefaultLayoutSnapshot = createSavedDefaultLayoutSnapshot();
applySavedDefaultLayout(readSavedDefaultLayout());
populateResolutionOptions();
updateCanvasViewport();
setUiLanguage();
renderBrandsDialog();
renderControls();
if (exportBaseFolder) {
  syncAllBrandFolders(exportBaseFolder).catch(() => {});
}
loadDefaultPcImage();
loadDefaultLaptopImage();
loadGeneratorPointsTextImage();
loadGeneratorReconditionedImage();
loadSelectedDiffGuaranteeImage();
loadGeneratorPriceTagImage();
loadGeneratorBackgroundImage();
drawPoster();



