import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme/fonts';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"    
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold', 
    },

    post_container: {
        borderColor:'#E6E6E6',
        borderWidth: 1,
        borderRadius: 18,
        margin:20,
        marginTop:10,
        width: "90%",
    },

    user_container: {
        flexDirection:"row",
        backgroundColor: '#66997B',
        borderRadius: 18,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'center',
        padding: 20,
        height: 80,
        width: '100%',  
    },

    user_profile_picture: {
        width: 40, 
        height: 40, 
        borderRadius: 50
    },

    user_name: {
        fontFamily: Fonts.UrbanistBold,
        fontSize: 14,
        paddingLeft: 20,
        flex: 1,
    },

    status_info: {
        flexDirection:"row", 
        fontFamily: Fonts.ArchivoBold,
        alignItems: 'baseline',
        paddingTop: 10,
        paddingLeft: 20,
    },

    status_title: {
        color: '#000000',
        fontSize: 14,
        fontFamily: Fonts.ArchivoSemiBold,
    },

    status_state: {
        color: '#5D896F',
        fontSize: 20,
        fontFamily: Fonts.ArchivoBold,
        paddingLeft: 5,
        flex: 1,
    },

    pet_picture: {
        width: "auto",
        height: 300,
        margin: 20,
        marginBottom: 5,
        borderRadius: 14
    },

    post_caption: {
        alignSelf: 'flex-start',
        flexDirection:"row",
        width: "100%",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },

    caption_username: {
        fontFamily: Fonts.UrbanistBold,
        fontSize: 12,
        marginRight: 5,
    },

    caption_content: {
        fontFamily: Fonts.ArchivoRegular,
        fontSize: 11,
        paddingLeft: 0,
        marginBottom: 10,
    },

    recompensa_info: {
        flexDirection: 'row',
        borderWidth:2,
        borderRadius: 50,
        borderColor: '#66997B',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 20,
        marginBottom: 15,
        alignContent: 'center',
        alignSelf: 'flex-end',
    },

    recompensa_label: {
        fontSize: 10,
        fontFamily: Fonts.UrbanistBold,
        color: '#66997B',
        alignSelf: 'center',
    },

    recompensa_content: {
        fontSize: 11,
        fontFamily: Fonts.UrbanistSemiBold,
        color: '#66997B',
        paddingLeft: 5,
    },

    additional_info: {
        flexDirection:"row", 
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },

    row: {
        flexDirection: 'row',
        marginBottom: 8,
  },

    post_info: {
        width: "50%",
        gap:10,
    },

    post_info_title: {
        fontSize: 10,
        fontFamily: Fonts.UrbanistRegular,
        color: '#777676',  
        marginBottom: 5,
    },

    info_column: {
        flexDirection:"row",
        marginBottom: 10,
    },

    info_column_label: {
        fontSize: 10,
        fontFamily: Fonts.UrbanistBold,
        color: '#263238',
        alignSelf: 'flex-start',
        width: "40%",
    },

    info_column_pet: {
        backgroundColor:"#fff",
        borderWidth:1,
        borderRadius:5,
        borderColor: '#CFD3CB',
        padding: 2,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 8,
        fontFamily: Fonts.ArchivoSemiBold,
        color: '#263238',
        width: "50%",
        textAlign: "center"
    },

    info_column_owner: {
        backgroundColor:"#EBEBEB",
        borderWidth:1,
        borderRadius:5,
        borderColor: '#CFD3CB',
        padding: 2,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 8,
        fontFamily: Fonts.ArchivoSemiBold,
        color: '#263238',
        width: "60%",
        textAlign: "center"
    },

    overlay: {
        ...StyleSheet.absoluteFillObject, // cobre a imagem toda
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // escurecimento
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 12,
    },

    status_picker: {
        backgroundColor: '#fff',
        borderWidth:1,
        borderRadius:5,
        borderColor: '#CFD3CB',
        marginLeft: 10,
        marginRight: 20,
        width: '80%',
    },
    
    status_dropdown: {
        backgroundColor: '#fff',
        borderWidth:1,
        borderRadius:5,
        borderColor: '#CFD3CB',
        marginLeft: 10,
        marginRight: 20,
        maxWidth: '80%',
        maxHeight: 120,
        zIndex: 1000,
    },

    recompensa_button: {
        borderWidth:2,
        borderRadius: 50,
        borderColor: '#66997B',
        backgroundColor: '#66997B',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 20,
        marginBottom: 15,
        alignContent: 'flex-end',
        alignSelf: 'flex-end',
        maxWidth: '100%'
       
    },

    button: {
        borderWidth:2,
        borderRadius: 50,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 20,
        alignContent: 'flex-start',
        alignSelf: 'center',
        maxWidth: '100%'
    },

    button_title: {
        fontSize: 10,
        fontFamily: Fonts.UrbanistSemiBold,
        color: '#fff',
        padding:0,
    },

    info_field: {
        marginBottom: 20,
        paddingLeft: 20,
    },

    

});
