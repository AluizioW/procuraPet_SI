import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API_CONFIG } from '../config';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // se quiser em português

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() { 
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HOME_FEED}`); // Use your API endpoint here
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } 
    
    loadData();
  }, []);

  const navigateToPostScreen = (postId) => {
    console.log('Navigating to PostScreen with post Id:', postId);
    navigation.navigate('PostScreen', { postId });
  };

  return (
    

    <ScrollView>
    <View style={styles.header}>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1, marginLeft: 10 }}>
        <Image
          source={require('../../assets/LOGO2.png')}
          style={{height: '72px', width:'120px'}}
          resizeMode="contain"
        />
      </View> 

      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent:'center', flex: .5, padding: 10}}>
        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold'}}>Bem-vindo!</Text>
        <Text style={{display:'content' ,color: 'black', fontSize: 16}}>Usuário</Text>
      </View>
    </View>

    <View style={styles.box}>
    
      {data.map(post => (
        <Pressable key={post.id} style={styles.postContainer} onPress={() => navigateToPostScreen(post.idPostagem)} >

          {/* Imagem do Post e textos os textos de cima dela*/}
          <View style={styles.frame}>

            {/* Foto e nome do usuario */}
            <View style={styles.userFrame}>
              <View style={{height: 30, width: 30, borderRadius: 25, overflow: 'hidden'}}>
                <Image 
                  source={{ uri: post.fotoUsuario }} 
                  style={styles.image}
                  resizeMode="cover"
                />  
              </View>
              <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold', textShadowColor: '#000', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 5}}>
                {post.username}  
              </Text>
            </View>

            {/* "idade" do post */}
            <View style={styles.postAge}>
                <Text style={{fontSize: 14, color: '#fff', fontWeight: '400', textShadowColor: '#000', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 5,}}>
                  {/* {post.dataCriacao} atrás */}
                  {formatDistanceToNow(new Date(post.dataCriacao), { addSuffix: true, locale: ptBR })}
                </Text>
            </View>

            {/* Foto do pet */}
            <Image 
              source={{ uri: post.fotoPet }} 
              style={styles.image}
              resizeMode="cover"
              borderRadius={10}
            />
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={[styles.title, post.statusPetPostagem === 'desaparecido' ? styles.missing : styles.adoption]}>
              {post.statusPetPostagem  === 'desaparecido' ? 'Desaparecido' : 'Adoção'}
            </Text>
          </View>
          <View style={styles.description}>
            <Text style={{ fontWeight: 'bold' }}>{post.username} </Text>
            <Text style={{paddingTop: 5}}>{post.descricaoPostagem}</Text>
          </View>
        </Pressable>
      ))}
      <StatusBar style="auto" />
    </View>
    
    </ScrollView>
  );
}



const styles = StyleSheet.create({

  header: {
    backgroundColor: '#A4CA8B',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },

  box: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: .5,
    elevation: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: 'column',
    gap: 10,

  },
  postContainer: {
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'column',
    gap: 10,
  },

  titleContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  missing: {
    textTransform: 'uppercase',
    color: '#E74C3C',
  },

  adoption: {
    text: 'Adoção',
    textTransform: 'uppercase',
    color: '#2ECC71',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    width: '100%',
    fontSize: 14,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },

  frame: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userFrame: {
    position: 'absolute', 
    top: 10, 
    left: 10, 
    zIndex: 1, 
    backgroundColor: 'transparent', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap:10 , 
    marginTop: 5},

  postAge: {
    width: '100%', 
    position: 'absolute', 
    bottom: 10, 
    left: 10, 
    zIndex: 1, 
    backgroundColor: 'transparent', 
    display: 'flex', 
    alignItems: 'flex-end', 
    justifyContent: 'flex-end',
    gap: 10, 
    paddingRight: 20}
});