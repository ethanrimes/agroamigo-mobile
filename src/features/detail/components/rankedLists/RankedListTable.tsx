import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import Divider from '@/src/components/ui/layout/Separator';
import RankedListItem, { RankedListItemProps } from './RankedListItem';

export interface RankedListTableProps {
    title: string;
    subtitle: string;
    items: RankedListItemProps[];
    onOrderPress?: () => void;
  }
  
  const RankedListTable: React.FC<RankedListTableProps> = ({
    title,
    subtitle,
    items,
    onOrderPress,
  }) => {
    const { typography, colors, spacing } = useTheme();
  
    return (
      <View style={{ paddingHorizontal: spacing.spacing.md }}>
        {/* Header Section */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.spacing.md
        }}>
          <View>
            <Text style={[
              typography.textStyles.headline4 as any,
              { 
                color: colors.text.primary,
                marginBottom: spacing.spacing.xs
              }
            ]}>
              {title}
            </Text>
            <Text style={[
              typography.textStyles.body3 as any,
              { color: colors.text.tertiary }
            ]}>
              {subtitle}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={onOrderPress}
            style={{
              backgroundColor: colors.background.secondary,
              paddingVertical: spacing.spacing.sm,
              paddingHorizontal: spacing.spacing.md,
              borderRadius: 4,
            }}
          >
            <Text style={[
              typography.textStyles.body3Medium as any,
              { color: colors.text.secondary }
            ]}>
              Ordenar
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Items List */}
        <View>
          {items.map((item, index) => (
            <React.Fragment key={`${item.rank}-${item.name}`}>
              <RankedListItem {...item} />
              {index < items.length - 1 && (
                <Divider orientation="horizontal" />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  };
  
  export default RankedListTable;