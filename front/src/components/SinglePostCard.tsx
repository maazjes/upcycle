import {
  StyleSheet, View, ImageStyle, ViewStyle, Image, Dimensions, ScrollView,
  Pressable
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import favoritesService from '../services/favorites';
import Carousel from './Carousel';
import Text from './Text';
import useError from '../hooks/useError';
import { TypedImage, PostBase } from '../types';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  titleAndPrice: {
    flexDirection: 'column'
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
    justifyContent: 'space-between'
  },
  container: {
  },
  favorite: {
    marginRight: 10
  }
});
interface GridPostProps {
  post: PostBase;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
}

const SinglePostCard = ({
  post, imageStyle = {}, containerStyle = {}
}: GridPostProps): JSX.Element => {
  const error = useError();
  const [favoriteId, setFavoriteId] = useState<undefined | number>(post.favoriteId);

  const addToFavorites = async (): Promise<void> => {
    try {
      const favorite = await favoritesService.addToFavorites(post.id);
      setFavoriteId(favorite.data.id);
    } catch (e) {
      error(e);
    }
  };

  const removeFromFavorites = async (): Promise<void> => {
    try {
      if (favoriteId) {
        await favoritesService.removeFromFavorites(favoriteId);
        setFavoriteId(undefined);
      }
    } catch (e) {
      error(e);
    }
  };

  const handleFavorite = favoriteId ? removeFromFavorites : addToFavorites;
  const favoriteIcon = favoriteId
    ? <AntDesign style={styles.favorite} name="heart" size={28} color="#fa2f3a" />
    : <AntDesign style={styles.favorite} name="hearto" size={28} color="#fa2f3a" />;

  return (
    <ScrollView contentContainerStyle={[{ paddingBottom: 500 }, containerStyle]}>
      <Carousel
        images={post.images}
      />
      <View style={styles.infoBox}>
        <View style={styles.titleAndPrice}>
          <Text fontWeight="bold" fontSize="subheading">{post.title}</Text>
          <Text fontSize="subheading" fontWeight="bold" color="blue">{post.price}</Text>
          <Text style={{ marginTop: 5 }}>{post.description}</Text>
        </View>
        <Pressable onPress={handleFavorite}>
          {favoriteIcon}
        </Pressable>
      </View>
    </ScrollView>
  );
};
export default SinglePostCard;
