import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../themes/themes';
import ContentLoader, { Rect } from 'react-content-loader/native';

const AnimeNameCardSkeleton = ({width}:{width:number}) => {
  const cardWidth = width;
  const cardHeight = cardWidth * 3/2 + FONTSIZE.size_14 + SPACING.space_8;

  return (
    <View style={{borderRadius : BORDERRADIUS.radius_4,overflow: 'hidden',}}>
      <ContentLoader
        speed={1}
        width={cardWidth}
        height={cardHeight}
        viewBox={`0 0 ${cardWidth} ${cardHeight}`}
        backgroundColor={COLORS.DullBlack}
        foregroundColor={COLORS.Grey}
      >
        <Rect x="0" y="0" rx="0" ry="0" width={cardWidth} height={cardWidth*3/2} />
        <Rect x="0" y={cardWidth * 3/2 + SPACING.space_4} rx="0" ry="0" width={cardWidth *.7} height={FONTSIZE.size_14} />
      </ContentLoader>
    </View>
  );
}

export default AnimeNameCardSkeleton

const styles = StyleSheet.create({})