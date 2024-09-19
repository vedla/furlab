import axios, { AxiosResponse } from 'axios';
import ImageResizer from 'react-native-image-resizer';
import { Platform } from 'react-native';
import { resizeImage } from '@utils/imageResizer';
import { FluffleResult } from '@customTypes/interfaces';
import { SupportedPlatform } from '@customTypes/types';
import Constants from 'expo-constants';

// Get the app version

// Function to reverse search the image
async function reverseSearchImage(
  imageUri: string,
  platforms: SupportedPlatform[]
): Promise<AxiosResponse<FluffleResult> | void> {
  try {
    // Resize the image
    const resizedImageUri: string = (await resizeImage(imageUri)) as string;

    // Create a FormData object
    const formData = new FormData();
    formData.append('file', {
      uri: resizedImageUri,
      name: 'image.png',
      type: 'image/png',
    } as unknown as Blob);

    // append query settings
    formData.append('platforms', JSON.stringify(platforms));
    formData.append('includeNsfw', 'false');
    formData.append('limit', '8');

    // Fallback to '1.0.0' if undefined
    const appVersion = Constants.expoConfig?.version || '1.0.0';

    // User-Agent
    const userAgent = `Furlab/${appVersion} (by Codi on ${Platform.OS} GH: CodiAsFox e: codi@vedla.io)`;

    // console.log(userAgent);

    // Send the request
    const response: AxiosResponse<FluffleResult> = await axios.post(
      'https://api.fluffle.xyz/v1/search',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-Agent': userAgent,
        },
      }
    );

    // console.log(response.data);

    // Return the response
    return response;
  } catch (error) {
    console.error('Error during reverse image search: ', error);
    return;
  }
}
