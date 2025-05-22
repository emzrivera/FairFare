import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Stay Updated,\nRide Smart',
    description: 'Get real-time fare updates and avoid unexpected charges.',
    image: require('../assets/biker.png'),
  },
  {
    title: 'Welcome to\nFair Fare',
    description: 'The best app to get the right fare easily and fairly!',
    image: require('../assets/road.png'),
  }
];

export default function Onboarding() {
  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollRef.current.scrollTo({ x: width * (currentIndex + 1), animated: true });
    } else {
      navigation.replace('MainTab');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={styles.screen}>
            <Image
              source={item.image}
              style={styles.backgroundImage}
              resizeMode="cover"
            />

           
            <LinearGradient
            colors={['#FFA502', '#FFA502', 'transparent']}
            locations={[0, 0.04, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradientOverlay}
            />

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{item.description}</Text>
              </View>

              {index === 1 && (
                <TouchableOpacity
                  style={styles.adminButton}
                  // onPress={() => navigation.navigate('AdminLogin')}
                >
                  <Text style={styles.adminButtonText}>Login as Admin</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.indicatorWrapper}>
          {onboardingData.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
  screen: {
    width,
    height,
    justifyContent: 'center',
    padding: 24,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 1, 
  },
  gradientOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1,
    opacity: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 80,
    zIndex: 2, // make sure content is above gradient
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#34260E',
    textAlign: 'left',
    marginBottom: 10,
  },
  descriptionContainer: {
    maxWidth: '75%', // shorter container width for description
  },
  description: {
    fontSize: 18,
    color: '#34260E',
    textAlign: 'left',
    marginBottom: 20,
  },
  adminButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorWrapper: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#000',
    borderRadius: 4,
  },
  nextButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 50,
  },
});
