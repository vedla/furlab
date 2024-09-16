import ImageResizer from 'react-native-image-resizer';

// Define the return type for the resized image URI
export async function resizeImage(uri: string): Promise<string | undefined> {
  try {
    const resizedImage = await ImageResizer.createResizedImage(
      uri, // Image URI from the user
      455, // New width
      256, // New height
      'PNG', // Export format
      100 // Quality
    );
    return resizedImage.uri; // Return the resized image URI
  } catch (error) {
    console.error('Error resizing the image: ', error);
    return undefined; // Return undefined if there is an error
  }
}
