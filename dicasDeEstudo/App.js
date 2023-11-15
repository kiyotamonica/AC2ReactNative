import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { React, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import moment from 'moment/moment';
import ImagePicker from 'react-native-image-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function DicasDeEstudo() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Home" component={HomeScreen}
            options={{headerShown: false,
            tabBarIcon: () => (
              <Image style={{width: 30, height: 30}} source={require('./assets/Home/iconeNavigationBarHome.png')} /> )}} />
        <Tab.Screen name="Dicas Diárias" component={DicasDoDia} 
            options={{headerShown: false, 
            tabBarIcon: () => (
              <Image style={{width: 30, height: 30}} source={require('./assets/iconesDicas/iconeNavigationBarDicas.png')} /> )}} />
        <Tab.Screen name="Recursos" component={RecursosDeEstudo} 
            options={{headerShown: false,
            tabBarIcon: () => (
              <Image style={{width: 30, height: 30}} source={require('./assets/iconesRecursos/iconeNavigationBarRecursos.png')} /> )}} />
        <Tab.Screen name="Perfil" component={PerfilDoAluno} 
            options={{headerShown: false,
            tabBarIcon: () => (
              <Image style={{width: 30, height: 30}} source={require('./assets/imagensPerfil/iconeNavigationBarPerfil.png')} /> )}} />
        <Tab.Screen name="MaterialDeApoio" component={MaterialDeApoio} options={{headerShown:false, tabBarIcon: () => null, tabBarButton: () => null }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = () => (
  <View style={styles.container}>
    <ImageBackground style={styles.containerBackgroundHome} source={require('./assets/Home/home.png')} resizeMode='stretch' />
    <Text style={styles.containerTextoHome}> Olá ! Essa é a página Home :) </Text>
  </View>
);

const DicasDoDia = () => {
  const [mensagemDiaria, setMensagemDiaria] = useState('');
  const [imagemDiaria, setImagemDiaria] = useState('');

  useEffect( () => {
    const diaAtualDaSemana = moment().format('dddd');
    const informacaoDiaria = {
      Monday: {
        mensagem: 'Tenha uma ótima segundNão desista dos estudos! Lembre-se, quanto mais você aprende, mais você pode corrigir as pessoas nas redes sociais. É uma competição saudável! ',
        imagem: require('./assets/iconesDicas/imagemDica1.png'),
      },
      Tuesday: {
        mensagem: 'Persista nos estudos! Um dia você vai olhar para trás e se perguntar por que se preocupou tanto, mas, ei, pelo menos terá boas histórias para contar aos robôs no futuro.',
        imagem: require('./assets/iconesDicas/imagemDica2.png'),
      },
      Wednesday: {
        mensagem: 'Estudar é como fazer exercícios. Dói, você pode suar e, ocasionalmente, sentir vontade de chorar. Mas, no final, as pessoas te parabenizam por isso.',
        imagem: require('./assets/iconesDicas/imagemDica3.png'),
      },
      Thursday: {
        mensagem: 'Não desista dos estudos! Seja a pessoa que sabe a diferença entre "a gente" e "agente" e aproveite para corrigir seus amigos enquanto eles ainda são seus amigos.',
        imagem: require('./assets/iconesDicas/imagemDica4.png'),
      },
      Friday: {
        mensagem: 'A vida é curta, mas os livros são longos. Não desista dos estudos, porque, quem sabe, você pode ser a única pessoa que entende a última temporada de Black Mirror.',
        imagem: require('./assets/iconesDicas/imagemDica5.png'),
      },
      Saturday: {
        mensagem: 'Estudar é como escalar uma montanha. Não desista, porque no topo você terá uma visão incrível da sua pilha de livros.',
        imagem: require('./assets/iconesDicas/imagemDica6.png'),
      },
      Sunday: {
        mensagem: 'Não se esqueça: NUNCA é tarde para virar UBER :)',
        imagem: require('./assets/iconesDicas/imagemDica7.png'),
      },
    };

    const { mensagem, imagem } = informacaoDiaria[diaAtualDaSemana];

    setMensagemDiaria(mensagem);
    setImagemDiaria(imagem);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.mensagemDica}>{mensagemDiaria}</Text>
      <Image style={styles.imagemDica} source={imagemDiaria} />
    </View>
  );
};

const RecursosDeEstudo = () => {
  const navigation = useNavigation();

  const recursos = [
    { id: 1, nome: 'Recurso 1', icone: require('./assets/iconesRecursos/icone1.png') },
    { id: 2, nome: 'Recurso 2', icone: require('./assets/iconesRecursos/icone2.png') },
    { id: 3, nome: 'Recurso 3', icone: require('./assets/iconesRecursos/icone3.png') },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recursoContainer}
      onPress={() => navigation.navigate('MaterialDeApoio')}
    >
      <Image source={item.icone} style={styles.recursoIcone} />
      <Text style={styles.recursoNome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.containerAreaLista}>
      <FlatList
        data={recursos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const MaterialDeApoio = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/iconesRecursos/recursosBackground.png')} />
      <Text style={styles.mensagemDica}>Olá! Teoricamente, este seria o recurso. </Text>
    </View>
  );
};

const PerfilDoAluno = () => {
  const [informacoesUsuario, setInformacoesUsuario] = useState({nome: '', escola: '', anoLetivo: ''});
  const [informacoesSalvas, setInformacoesSalvas] = useState({nome: '', escola: '', anoLetivo: ''});
  const [fotoPerfil, setFotoPerfil] = useState(require('./assets/imagensPerfil/fotoPerfilPadrao.png'));

  const escolherFoto = () => {
    ImagePicker.showImagePicker((response) => {
      if (!response.didCancel && !response.error) {
        setInformacoesUsuario.fotoPerfil({uri: response.uri });
      }
    });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('user_info', JSON.stringify(informacoesUsuario));
      alert('Informações armazenadas com sucesso!');
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_info');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setInformacoesSalvas(parsedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.containerPerfil}>
      <Text style={styles.tituloPerfil}>Perfil do Aluno</Text>

      <Image source={fotoPerfil} style={styles.fotoPerfil} />

      <View style={styles.textoPerfil}>
        <Text>Nome:</Text>
        <TextInput
          style={styles.inputPerfil}
          placeholder="Digite o seu nome aqui :)"
          value={informacoesUsuario.nome}
          onChangeText={(text) => setInformacoesUsuario({ ...informacoesUsuario, nome: text })}
        />
      </View>

      <View style={styles.textoPerfil}>
        <Text>Escola:</Text>
        <TextInput
          style={styles.inputPerfil}
          placeholder="Digite o nome da escola aqui"
          value={informacoesUsuario.escola}
          onChangeText={(text) => setInformacoesUsuario({ ...informacoesUsuario, escola: text })}
        />
      </View>

      <View style={styles.textoPerfil}>
        <Text>Ano Letivo:</Text>
        <TextInput
          style={styles.inputPerfil}
          placeholder="Digite o seu ano letivo"
          value={informacoesUsuario.anoLetivo}
          onChangeText={(text) => setInformacoesUsuario({ ...informacoesUsuario, anoLetivo: text })}
        />
      </View>

      <View style={styles.textoPerfil}>
        <Text>Inserir outra imagem: </Text>
        <Button style={styles.containerBotao} title='Escolher foto da galeria' onPress={escolherFoto} />
      </View>
      
      <Button style={styles.containerBotao} title="Salvar Informações" onPress={storeData} />
      <View style={styles.containerInformacoesAluno}>
        <Text style={styles.containerTextoInformacoes}>Informações do Aluno :</Text>
        <Text style={styles.containerTextoInformacoes}>Nome: {informacoesSalvas.nome}</Text>
        <Text style={styles.containerTextoInformacoes}>Escola: {informacoesSalvas.escola}</Text>
        <Text style={styles.containerTextoInformacoes}>Ano Letivo: {informacoesSalvas.anoLetivo}</Text>
      </View>
    </View>
  );
};

export { RecursosDeEstudo, MaterialDeApoio, PerfilDoAluno };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerBackgroundHome: {
    flex: 2,
    height: '60%',
    width: '100%',
  },
  containerTextoHome: {
    flex: 1,
    fontSize: 20
  },
  mensagemDica: {
    textAlign:'center',
    justifyContent: 'center',
    fontSize: 20,
    marginLeft: '5%',
    marginRight: '5%'
  },
  imagemDica: {
    alignItems: 'center'
  },
  recursoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recursoIcone: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  recursoNome: {
    fontSize: 40,
  },
  containerAreaLista: {
    flex: 1,
    alignContent:'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '60%'
  },
  containerPerfil: {
    alignItems:'center',
    justifyContent: 'center',
    flex: 1
  },
  tituloPerfil: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textoPerfil: {
    fontSize: 25,
    marginTop: 15,
    fontWeight: '600'
  },
  inputPerfil: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 10,
    fontSize: 15
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  containerBotao: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerInformacoesAluno: {
    marginTop: 20,
  },
  containerTextoInformacoes: {
    textAlign: 'center',
    fontSize: 20
  }
});
