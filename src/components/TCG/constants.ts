// TCG Card Base Dimensions (for large size)
export const TCG_CARD_BASE = {
    // Card dimensions
    WIDTH: 330,
    HEIGHT: 450,
    BORDER_RADIUS: 8,
    BORDER_WIDTH: 4,

    // Card layout spacing
    MARGIN_Y: 16, // 2 * 8px
    MARGIN_BOTTOM: 8, // 1 * 8px
    PADDING: 6.4, // 0.8 * 8px

    // Title
    FONT_SIZE: 18,

    // Character image
    IMAGE_WIDTH: 200,
    IMAGE_HEIGHT: 276,

    // Info bar (DOB/Height)
    INFO_LEFT: -10,
    INFO_BOTTOM: -5,
    INFO_FULL_ART_LEFT: -110,
    INFO_FULL_ART_BOTTOM: -340,
    INFO_WIDTH: 220,
    INFO_BORDER_RADIUS: 15,
    INFO_PADDING_X: 8, // 1 * 8px
    INFO_PADDING_Y: 0.8, // 0.1 * 8px
    INFO_FONT_SIZE: 10,

    // Star positioning
    STAR_LEFT: 17,
    STAR_SIZE: 10,
    STAR_STROKE_WIDTH: 1.5,

    // ID text
    ID_LEFT: 2,
    ID_BOTTOM: 0,
    ID_FONT_SIZE: 8,

    // Animation
    SLIDE_OUT_DISTANCE: -500,
} as const;

// CardInfoEntry Base Dimensions
export const CARD_INFO_ENTRY_BASE = {
    TOP: 125,
    LEFT_DEFAULT: -160,
    LEFT_FULL_ART: -250,
    BORDER_RADIUS: 14,
    HEIGHT: 50,
    WIDTH: 270,
    PADDING_Y: 0.5 * 8, // Convert to px
    PADDING_X: 2 * 8, // Convert to px
    FONT_SIZE_NORMAL: 18,
    FONT_SIZE_LONG: 14,
    LONG_TEXT_THRESHOLD: 35,
} as const;
