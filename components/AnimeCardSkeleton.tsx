import { StyleSheet, View,Dimensions } from 'react-native';
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';

const { width } = Dimensions.get("screen")

const AnimeCardSkeleton = () => {
  const cardWidth = width/2;
  const cardHeight = cardWidth * 1.8;

  return (
    <ContentLoader
      speed={1}
      width={cardWidth - (SPACING.space_15+SPACING.space_10/2)}
      height={cardHeight}
      viewBox={`0 0 ${cardWidth - (SPACING.space_15+SPACING.space_10/2)} ${cardHeight}`}
      backgroundColor={COLORS.DullBlack}
      foregroundColor={COLORS.Grey}
    >
      <Rect x="0" y="0" rx="0" ry="0" width={cardWidth} height={cardHeight * 0.75} />
      <Rect x="0" y={cardHeight * 0.75 + 10} rx="0" ry="0" width={cardWidth *.7} height={FONTSIZE.size_14} />
      <Rect x="0" y={cardHeight * 0.75 + 34} rx="0" ry="0" width={cardWidth *.5} height={FONTSIZE.size_14} />
    </ContentLoader>
  );
};

export default AnimeCardSkeleton;

const styles = StyleSheet.create({});
