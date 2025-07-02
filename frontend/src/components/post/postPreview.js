import { Text, View, Image, ImageBackground } from 'react-native';
import { capitalizeWords, getLegendaCor} from '../../utils/post/postUtils';

import style from './styles';

const PostPreview =({post}) =>{
  if (!post) return null; 

  return (
    <View style={style.container}>
      <View style={style.post_container}>
        <ImageBackground style={[style.pet_picture, {position: 'relative', overflow: 'hidden', borderRadius: 14, height: 320}]} 
          source={{uri: post.fotoPet}}>

          <View style={[style.overlay]} />

          <View style={[style.user_container, {backgroundColor: 'transparent', position: 'absolute', paddingTop: 10, overflow: 'hidden'}]}>
            <Image style={[style.user_profile_picture, {width: 30, height: 30}]} 
              source={{uri: post.fotoUsuario}}/>
            <Text style={[style.user_name, {color: '#fff', fontSize: 12, paddingLeft: 10}]}>{capitalizeWords(post.nomeUsuario)}</Text>
          </View>
        </ImageBackground>

        <View style={style.status_info}>
          <Text style={[style.status_state, { marginBottom: 5, color: getLegendaCor(post.statusPetPostagem)}, {paddingLeft: 0}]}>{post.statusPetPostagem.toUpperCase()}</Text>
        </View>

        {post.descricaoPostagem && (
          <View style={[style.post_caption, {paddingTop:0, paddingBottom:25}]}>
              <Text>
                <Text style={style.caption_username}>{post.username}: </Text>
                <Text style={style.caption_content}>{post.descricaoPostagem}</Text>
              </Text>
          </View>
        )}

      </View>
    </View>
  );

}

export default PostPreview;