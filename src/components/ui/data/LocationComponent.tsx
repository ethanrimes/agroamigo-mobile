// src/components/ui/data/LocationComponent.tsx
import React from 'react';
import { View } from 'react-native';
import { Pin } from '../icons';
import { Typography } from '../typography';
import { useTheme } from '../../../theme/providers/ThemeProvider';

interface LocationComponentProps {
  location: string;
}

export const LocationComponent: React.FC<LocationComponentProps> = ({
  location
}) => {
  const { theme } = useTheme();
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Pin size={20} color={theme.colors.primary.default} />
      <Typography 
        variant="body2" 
        color={theme.colors.text.secondary}
      >
        {location}
      </Typography>
    </View>
  );
};

export default LocationComponent;