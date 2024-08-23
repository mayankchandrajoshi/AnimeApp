import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZE, SPACING } from '../themes/themes';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const { width } = Dimensions.get("screen");

const GenreCardSkeleton = () => {
    const cardWidth = width / 2;
    const cardHeight = cardWidth * 0.588;
    const smallerRectWidth = cardWidth * 0.6;
    const smallerRectHeight = FONTSIZE.size_12;
    const circleRadius = FONTSIZE.size_12; 
    const padding = SPACING.space_10;

    const innerCardWidth = cardWidth - (SPACING.space_15 + SPACING.space_10 / 2);
    const innerCardHeight = cardHeight - padding;

    // Calculate positions for centering
    const totalHeight = circleRadius * 2 + padding + smallerRectHeight;
    const startY = (innerCardHeight - totalHeight) / 2;

    const rectX = (innerCardWidth - smallerRectWidth) / 2;
    const rectY = startY + circleRadius * 2 + padding;
    const circleX = (innerCardWidth - circleRadius * 2) / 2;
    const circleY = startY;

    return (
        <ContentLoader
            speed={1}
            width={innerCardWidth}
            height={cardHeight}
            viewBox={`0 0 ${innerCardWidth} ${cardHeight}`}
            backgroundColor={COLORS.DullBlack}
            foregroundColor={COLORS.Grey}
        >
            <Rect x="0" y="0" rx="0" ry="0" width={innerCardWidth} height={innerCardHeight} />
            <Circle cx={circleX + circleRadius} cy={circleY + circleRadius} r={circleRadius} />
            <Rect 
                x={rectX} 
                y={rectY} 
                rx="0" ry="0" 
                width={smallerRectWidth} 
                height={smallerRectHeight} 
            />
        </ContentLoader>
    );
};

export default GenreCardSkeleton;

const styles = StyleSheet.create({});
