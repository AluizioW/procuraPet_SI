import { Text, View, Image } from 'react-native';
import { capitalizeWords, formatarMoeda, getLegendaCor, camposPet, camposUsuario, rotulosColunasPet, rotulosColunasUsuario} from '../../utils/post/postUtils';

import style from './styles';

const Post =({post}) =>{
   console.log('usr:', post );
  if (!post) return null; 

  const campoUsuario = camposUsuario(post);
  const campoPet = camposPet(post);
 
  return (
    <View style={style.container}>
      <View style={style.post_container}>
        <View style={style.user_container}>
          <Image style={style.user_profile_picture} 
            source={{uri: post.fotoUsuario}}/>
          <Text style={style.user_name}>{capitalizeWords(post.nomeUsuario)}</Text>
        </View>

        {post.statusPetPostagem && (
          <View style={style.status_info}>
            <Text style={style.status_title}>Status:</Text>
            <Text style={[style.status_state, { color: getLegendaCor(post.statusPetPostagem)}]}>{capitalizeWords(post.statusPetPostagem)}</Text>
          </View>
        )}
        
        <Image style={style.pet_picture} 
          source={{uri: post.fotoPet}}/>

        {post.descricaoPostagem && (
          <View style={style.post_caption}>
              <Text>
                <Text style={style.caption_username}>{post.username}: </Text>
                <Text style={style.caption_content}>{post.descricaoPostagem}</Text>
              </Text>
          </View>
        )}

        <View>
          {Object.entries(post)
            .filter(([key, value]) => key === 'recompensa' && value != null)
            .map(([key, value]) => (
                <View key={key} style={style.recompensa_info}>
                  <Text style={style.recompensa_label}>{capitalizeWords(key)}:</Text>
                  <Text style={style.recompensa_content}>{formatarMoeda(value)}</Text>
                </View>
          ))}
        </View>

        <View style={style.additional_info}>
          <View style={style.post_info}>
            <Text style={style.post_info_title}>Informações do animal:</Text>
            <View>
              {Object.entries(campoPet).map(([key, value]) => {
                if (value === null || value === undefined || value === '') {
                  return null; // Não renderiza esse item
                }
                
                return (
                  <View key={key} style={style.row}>
                    <Text style={style.info_column_label}>{rotulosColunasPet[key]}:</Text>
                    <Text style={style.info_column_pet}>
                      {capitalizeWords(value)}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={style.post_info}>
            <Text style={style.post_info_title}>Informações do tutor:</Text>
            <View>
              {Object.entries(campoUsuario).map(([key, value]) => {
                  if (value === null || value === undefined || value === '') {
                    return null; // Não renderiza esse item
                  }
                  
                  return (
                    <View key={key} style={style.row}>
                      <Text style={style.info_column_label}>{rotulosColunasUsuario[key]}:</Text>
                      <Text style={style.info_column_owner}>{capitalizeWords(value)}</Text>
                    </View>
                  );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );

}

export default Post;