import React, { useState, useCallback, useEffect,useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { db } from '../firebase';
// import { orderBy } from 'firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ChatScreen = ({ navigation, route }) => {
  
  const [messages, setMessages] = useState([]);
  let name=useState(route.params.userName);
  let id=useState(route.params.id);
 console.log(route.params.userName);
    // useEffect(()=>{
    //   getFromStorage();
    // })
       useLayoutEffect(()=>{
       //read from db
          const unsubscribe=db.collection('chats').orderBy('createdAt',
           'desc').onSnapshot(snapshot=>setMessages(
              snapshot.docs.map(doc=>({                                         //here we get the data from firebase
              _id:doc.data()._id,
              text:doc.data().text,
              createdAt:doc.data().createdAt.toDate(),
              user:doc.data().user,
             
            }))
           ))
           ////console.log(unsubscribe)
                return unsubscribe;
       },[])
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const{_id,text,createdAt,user}=messages[0] //we get the object
     db.collection('chats').add({_id,text,createdAt,user}) //store the object in fire
      }, [])
  // async function getFromStorage(){
  //   try {
  //     const value = await AsyncStorage.getItem('user')
  //     if(value !== null) {
  //       ////console.log(value)
  //      let user={
  //       token:value
  //      }
  //      await getOperation('getUser', 'POST', user)
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  // function getOperation(endPoint, method, data) {
  //   fetch(`http://192.168.1.8:3000/${endPoint}`, {
  //     method: method,
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       //JSON.stringify(data)
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       if (json.message=='welcome') {
  //         setFirstName(json.firstName)
  //         setUserId(json.id)
  //         //goToHome()
  //       }
  //       else {
  //         ////console.log(json.message)
  //       }
  //     });
  // }
  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    
    user={{
      _id: route.params.id,
      name:route.params.userName, 
      avatar:""
    }}
  />
  )
}

export default ChatScreen