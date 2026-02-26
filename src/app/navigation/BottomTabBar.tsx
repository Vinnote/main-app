import React from 'react';
import { TouchableOpacity, View, Text as RNText, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Search, Compass, User, Plus } from 'lucide-react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TAB_ICONS: Record<string, typeof Home> = {
  feed: Home,
  search: Search,
  new: Plus,
  discover: Compass,
  profile: User,
};

const TAB_LABELS: Record<string, string> = {
  feed: 'Início',
  search: 'Busca',
  new: '',
  discover: 'Descobrir',
  profile: 'Perfil',
};

const ACTIVE_COLOR = '#7B2D3B';
const INACTIVE_COLOR = '#9CA3AF';
const ACCENT_COLOR = '#8B1A2B';

export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const visibleTabNames = ['feed', 'search', 'new', 'discover', 'profile'];
  const visibleRoutes = state.routes.filter((r) => visibleTabNames.includes(r.name));

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.bar}>
        {visibleRoutes.map((route) => {
          const routeIndex = state.routes.findIndex((r) => r.key === route.key);
          const isFocused = state.index === routeIndex;
          const isCenter = route.name === 'new';
          const Icon = TAB_ICONS[route.name];
          const label = TAB_LABELS[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (isCenter) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                activeOpacity={0.8}
                style={styles.centerButtonWrapper}
              >
                <View style={styles.centerButton}>
                  <Plus color="#FFFFFF" size={28} strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
              style={styles.tab}
            >
              {Icon && (
                <Icon
                  color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
                  size={22}
                  strokeWidth={isFocused ? 2.2 : 1.8}
                />
              )}
              {label ? (
                <View style={styles.labelContainer}>
                  <RNText
                    style={[
                      styles.label,
                      { color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR },
                      isFocused && styles.labelActive,
                    ]}
                  >
                    {label}
                  </RNText>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 56,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  labelContainer: {
    height: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  labelActive: {
    fontWeight: '600',
  },
  centerButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
  },
  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: ACCENT_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: ACCENT_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
