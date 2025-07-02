import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function PostScreen() {
  const route = useRoute();
  const { postId } = route.params;
  const [post, setPost] = React.useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3210/post/${postId}`);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [postId]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: post.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.statusText,
            post.status === 'DESAPARECIDO' ? styles.missing : styles.adoption
          ]}>
            {post.status}
          </Text>
          <Text style={styles.timeText}>• {post.tempo}</Text>
        </View>
        
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.description}</Text>
        
        <View style={styles.userContainer}>
          <Text style={styles.userLabel}>Postado por:</Text>
          <Text style={styles.userName}>{post.usuario}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  missing: {
    color: '#E74C3C',
  },
  adoption: {
    color: '#2ECC71',
  },
  timeText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#444',
  },
  userContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  userLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});