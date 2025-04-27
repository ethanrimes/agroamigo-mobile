import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

export interface RankedListItemProps {
  rank: number;
  name: string;
  value: string;
  date: string;
}

const RankedListItem: React.FC<RankedListItemProps> = ({
  rank,
  name,
  value,
  date,
}) => {
  const { typography, colors, spacing } = useTheme();
  
  return (
    <View style={{
      paddingVertical: spacing.spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    }}>
      {/* Left section with rank and name */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'flex-start',
        flex: 1,
        marginRight: spacing.spacing.md,
      }}>
        {/* Rank number */}
        <Text style={[
          typography.textStyles.body2Medium as any,
          {
            color: colors.text.secondary,
            marginRight: spacing.spacing.md,
          }
        ]}>
          {rank}.
        </Text>
        
        {/* Market name - using flexWrap to handle long text */}
        <Text style={[
          typography.textStyles.body2Medium as any,
          { 
            color: colors.text.primary,
            flexShrink: 1,
            flexWrap: 'wrap',
          }
        ]}
        numberOfLines={3}>
          {name}
        </Text>
      </View>
      
      {/* Right section with value and date */}
      <View style={{ 
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
      }}>
        {/* Price value */}
        <Text style={[
          typography.textStyles.body2Medium as any,
          {
            color: colors.text.primary,
            marginBottom: spacing.spacing.xs,
          }
        ]}>
          {value}
        </Text>
        
        {/* Date */}
        <Text style={[
          typography.textStyles.body3 as any,
          { color: colors.text.tertiary }
        ]}>
          {date}
        </Text>
      </View>
    </View>
  );
};

export default RankedListItem;