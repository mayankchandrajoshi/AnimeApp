interface Spacing {
    space_2: number;
    space_3: number;
    space_4: number;
    space_6:number,
    space_8: number;
    space_10: number;
    space_12: number;
    space_15: number;
    space_16: number;
    space_18: number;
    space_20: number;
    space_24: number;
    space_28: number;
    space_32: number;
    space_36: number;
    space_40: number;
    space_44: number;
    space_48: number;
    space_52: number;
}

export const SPACING: Spacing = {
    space_2: 2,
    space_3: 3,
    space_4: 4,
    space_6: 6,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_15: 15,
    space_16: 16,
    space_18: 18,
    space_20: 20,
    space_24: 24,
    space_28: 28,
    space_32: 32,
    space_36: 36,
    space_40: 40,
    space_44: 44,
    space_48: 48,
    space_52: 52,
};


interface Color {
    Black: string;
    BlackRGB90: string;
    BlackRGB85: string,
    BlackRGB60: string;
    BlackRGB30: string;
    BlackRGB10: string;
    DullBlack : string,
    DodgerBlue: string,
    DarkCyan: string,
    LightSeaGreen : string,
    Lime : string,
    Orange: string;
    DarkOrange: string;
    OrangeRed: string;
    Red : string,
    Tomato: string,
    Grey: string;
    DarkGrey: string;
    DarkGrey80 : string,
    DimGrey : string,
    Yellow: string;
    White: string;
    WhiteRGBA90: string;
    WhiteRGBA75: string;
    WhiteRGBA60: string;
    WhiteRGBA45: string;
    WhiteRGBA30: string;
    WhiteRGBA20: string;
    WhiteRGBA15: string;
  }
  
export const COLORS: Color = {
    Black: '#000000',
    BlackRGB90: 'rgba(0,0,0,0.90)',
    BlackRGB85: 'rgba(0,0,0,0.85)',
    BlackRGB60: 'rgba(0,0,0,0.60)',
    BlackRGB30: 'rgba(0,0,0,0.30)',
    BlackRGB10: 'rgba(0,0,0,0.1)',
    DullBlack : "#1F201F",
    DodgerBlue: '#1E90FF',
    DarkCyan : "#008B8B",
    LightSeaGreen : "#20B2AA",
    Lime : "#00FF00",
    Orange: '#FFA500',
    DarkOrange: '#FF8C00',
    OrangeRed: '#FF4500',
    Red : "#FF0000",
    Tomato: '#FF6347',
    Grey: "#808080",
    DarkGrey: '#A9A9A9',
    DarkGrey80 : "rgba(169,169,169,.8)",
    DimGrey : "#696969",
    Yellow: '#FFFF00',
    White: '#FFFFFF',
    WhiteRGBA90: 'rgba(255,255,255,0.90)',
    WhiteRGBA75: 'rgba(255,255,255,0.75)',
    WhiteRGBA60: 'rgba(255,255,255,0.60)',
    WhiteRGBA45: 'rgba(255,255,255,0.45)',
    WhiteRGBA30: 'rgba(255,255,255,0.30)',
    WhiteRGBA20: 'rgba(255,255,255,0.20)',
    WhiteRGBA15: 'rgba(255,255,255,0.15)',
  };
  
interface FontFamily {
    lato_black: string;
    lato_blackitalic: string;
    lato_bold: string;
    lato_bolditalic: string;
    lato_italic: string;
    lato_light: string;
    lato_lightitalic: string;
    lato_regular: string;
    lato_thin: string;
    lato_thinitalic: string;
}
  
export const FONTFAMILY: FontFamily = {
    lato_black: 'Lato-Black',
    lato_blackitalic: 'Lato-BlackItalic',
    lato_bold: 'Lato-Bold',
    lato_bolditalic: 'Lato-BoldItalic',
    lato_italic: 'Lato-Italic',
    lato_light: 'Lato-Light',
    lato_lightitalic: 'Lato-LightItalic',
    lato_regular: 'Lato-Regular',
    lato_thin: 'Lato-Thin',
    lato_thinitalic: 'Lato-ThinItalic',
};
  
interface FontSize {
    size_8: number;
    size_10: number;
    size_12: number;
    size_14: number;
    size_16: number;
    size_18: number;
    size_20: number;
    size_22: number;
    size_24: number;
    size_30: number;
}

export const FONTSIZE: FontSize = {
    size_8: 8,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_22: 22,
    size_24: 24,
    size_30: 30,
};

interface BorderRadius {
    radius_4: number;
    radius_8: number;
    radius_10: number;
    radius_15: number;
    radius_20: number;
    radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
    radius_4: 4,
    radius_8: 8,
    radius_10: 10,
    radius_15: 15,
    radius_20: 20,
    radius_25: 25,
};