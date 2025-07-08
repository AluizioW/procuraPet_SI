import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Post from '../../components/post/post';
import PostPreview from '../../components/post/postPreview';
import { getPostagem } from '../../../api/post';

export default function ViewPost() {
  
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      console.log("Carregando post...");
      try {
        const data = await getPostagem(1);
        //console.log("Resposta da API:", data);
        setPost(data);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, []);
  
  return (
    <ScrollView>
      <View style={styles.container}>
        
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <PostPreview post={post} />
        )}
        
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <Post post={post} />
        )}
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
