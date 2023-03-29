import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import useChats from 'hooks/useChats';
import Container from 'components/Container';
import Text from 'components/Text';
import { dph, dpw, formatDate } from 'util/helpers';
import Line from 'components/Line';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Button from 'components/Button';
import MenuModal from 'components/MenuModal';
import React, { useMemo, useState } from 'react';
import { updateChat } from 'services/chats';
import { Chat } from '@shared/types';
import { MenuModalProps, UserStackScreen } from '../types';
import Loading from '../components/Loading';
import UserBar from '../components/UserBar';

const styles = StyleSheet.create({
  noFavorites: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  noFavoritesText: {
    marginVertical: dph(0.015),
    textAlign: 'center'
  }
});

const ItemSeparator = (): JSX.Element => <Line style={{ marginVertical: 11 }} />;

const Chats = ({ navigation }: UserStackScreen<'StackChat'>): JSX.Element => {
  const { navigate } = navigation;
  const [chats, setChats, fetchChats] = useChats();
  const [archived, setArchived] = useState(false);
  const [modalItems, setModalItems] = useState<Pick<MenuModalProps, 'items'> | undefined>();

  const archivedChats = useMemo<Chat[] | null>(
    (): Chat[] | null => (chats ? chats.data.filter((chat): boolean => chat.archived) : null),
    [chats]
  );

  const unArchivedChats = useMemo<Chat[] | null>(
    (): Chat[] | null => (chats ? chats.data.filter((chat): boolean => !chat.archived) : null),
    [chats]
  );

  if (!chats) {
    return <Loading />;
  }

  if (chats.data.length === 0) {
    return (
      <Container style={styles.noFavorites}>
        <FontAwesome5 name="sad-cry" size={dpw(0.15)} color="black" />
        <Text style={styles.noFavoritesText} weight="bold" size="subheading">
          No chats to show
        </Text>
        <Button
          text="Find new items"
          onPress={(): void => {
            navigation.replace('StackSearch');
          }}
        />
      </Container>
    );
  }

  const archiveOrUnarchive = async (chatId: number): Promise<void> => {
    await updateChat(chatId, { archived: !archived });
    const newChats = [...chats.data].map(
      (chat): Chat => (chat.id !== chatId ? chat : { ...chat, archived: !archived })
    );
    const newChatPage = { ...chats, data: newChats };
    setChats(newChatPage);
    setModalItems(undefined);
  };

  return (
    <Container>
      <FlatList
        keyExtractor={(item): string => String(item.id)}
        data={chats.data.filter((chat): boolean => (archived ? chat.archived : !chat.archived))}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }): JSX.Element => (
          <UserBar
            onLongPress={(): void =>
              setModalItems(
                archived
                  ? { 'Unarchive chat': (): void => archiveOrUnarchive(item.id) }
                  : { 'Archive chat': (): void => archiveOrUnarchive(item.id) }
              )
            }
            displayNameStyle={{ marginBottom: dph(0.007), fontFamily: 'OpenSans_700Bold' }}
            profilePhotoSize={50}
            onPress={(): void => navigate('SingleChat', { userId: item.user.id })}
            user={item.user}
            extra={
              <Text>{item.lastMessage.images?.length > 0 ? 'Photo' : item.lastMessage.text}</Text>
            }
            textRight={formatDate(item.lastMessage.createdAt)}
          />
        )}
        onEndReached={fetchChats}
        onEndReachedThreshold={0.2}
      />
      {modalItems && (
        <MenuModal
          visible={!!modalItems}
          items={modalItems}
          onDismiss={(): void => setModalItems(undefined)}
        />
      )}
      <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={(): void => setArchived(!archived)}
      >
        <View style={{ flexDirection: 'row' }}>
          {!archived && (
            <>
              <Text size="subheading">Archived</Text>
              <Ionicons name="md-chevron-forward-sharp" size={24} color="black" />
            </>
          )}
          {archived && (
            <>
              <Ionicons name="md-chevron-back-sharp" size={24} color="black" />
              <Text size="subheading">Unarchived</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Container>
  );
};

export default Chats;
