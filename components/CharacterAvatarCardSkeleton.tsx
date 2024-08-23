import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContentLoader, { Circle, Rect }  from 'react-content-loader/native';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../themes/themes';

const { width } = Dimensions.get("screen")

const CharacterAvatarCardSkeleton = () => {
    const cardWidth = width / 3;
    const cardHeight = cardWidth * 1.3;
    const smallerRectWidth = cardWidth * 0.8;
    const smallerRectHeight = FONTSIZE.size_14;
    const circleRadius = (cardWidth-SPACING.space_10*4)/2; 

    const padding = SPACING.space_10;

    const innerCardWidth = cardWidth - (SPACING.space_10 + SPACING.space_20 / 3);
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
            <Rect x="0" y="0" rx={BORDERRADIUS.radius_10} ry={BORDERRADIUS.radius_10} width={innerCardWidth} height={innerCardHeight} />
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
}

export default CharacterAvatarCardSkeleton

const styles = StyleSheet.create({})