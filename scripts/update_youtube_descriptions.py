#!/usr/bin/env python3
"""
YouTube Video Description Updater
This script updates all video descriptions in your YouTube channel by appending
additional information about your recorder lessons and website.
"""

import os
import pickle
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.pickle
SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']

# The text you want to append to all video descriptions
DESCRIPTION_APPEND = """

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎵 LEARN RECORDER WITH TALI 🎵
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Online Lessons:
👉 https://talirecorderlessons.com/

🎓 Lesson Pages:
• Beginner Lessons: https://talirecorderlessons.com/lessons/beginner-recorder-lessons
• Advanced Lessons: https://talirecorderlessons.com/lessons/advanced-recorder-lessons
• Baroque Lessons: https://talirecorderlessons.com/lessons/baroque-recorder-lessons
• Kids Lessons: https://talirecorderlessons.com/lessons/kids-recorder-lessons

❓ Have Questions?
Check out our FAQ: https://talirecorderlessons.com/faq

🌐 Website: https://talirecorderlessons.com
📧 Contact: https://talirecorderlessons.com/contact

#RecorderLessons #MusicEducation #LearnRecorder
"""


def authenticate():
    """Authenticate with YouTube API using OAuth 2.0"""
    creds = None
    
    # The file token.pickle stores the user's access and refresh tokens
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    
    # If there are no (valid) credentials available, let the user log in
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists('client_secret.json'):
                print("ERROR: client_secret.json not found!")
                print("Please download it from Google Cloud Console and place it in this directory.")
                return None
            
            flow = InstalledAppFlow.from_client_secrets_file(
                'client_secret.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    
    return creds


def get_all_video_ids(youtube):
    """Fetch all video IDs from the authenticated user's channel"""
    video_ids = []
    
    try:
        # Get the user's channel
        channels_response = youtube.channels().list(
            mine=True,
            part='contentDetails'
        ).execute()
        
        if not channels_response['items']:
            print("No channel found for this account.")
            return []
        
        # Get the uploads playlist ID
        uploads_playlist_id = channels_response['items'][0]['contentDetails']['relatedPlaylists']['uploads']
        
        print(f"Fetching videos from uploads playlist: {uploads_playlist_id}")
        
        # Fetch all videos from the uploads playlist
        next_page_token = None
        
        while True:
            playlist_items_response = youtube.playlistItems().list(
                playlistId=uploads_playlist_id,
                part='contentDetails',
                maxResults=50,
                pageToken=next_page_token
            ).execute()
            
            for item in playlist_items_response['items']:
                video_ids.append(item['contentDetails']['videoId'])
            
            next_page_token = playlist_items_response.get('nextPageToken')
            
            if not next_page_token:
                break
        
        print(f"Found {len(video_ids)} videos in your channel.")
        return video_ids
    
    except HttpError as e:
        print(f"An HTTP error occurred: {e}")
        return []


def update_video_description(youtube, video_id, dry_run=False):
    """Update a single video's description"""
    try:
        # Get the current video details
        video_response = youtube.videos().list(
            part='snippet',
            id=video_id
        ).execute()
        
        if not video_response['items']:
            print(f"Video {video_id} not found.")
            return False
        
        video = video_response['items'][0]
        snippet = video['snippet']
        current_description = snippet.get('description', '')
        
        # Check if our content is already in the description
        if 'talirecorderlessons.com' in current_description.lower():
            print(f"  ✓ Video '{snippet['title'][:50]}...' already has the updated description. Skipping.")
            return True
        
        # Append the new content
        new_description = current_description + DESCRIPTION_APPEND
        
        # Ensure description doesn't exceed YouTube's 5000 character limit
        if len(new_description) > 5000:
            print(f"  ⚠ Video '{snippet['title'][:50]}...' description would exceed 5000 characters. Skipping.")
            return False
        
        if dry_run:
            print(f"  [DRY RUN] Would update: '{snippet['title'][:50]}...'")
            print(f"    Current length: {len(current_description)} chars")
            print(f"    New length: {len(new_description)} chars")
            return True
        
        # Update the video
        snippet['description'] = new_description
        
        youtube.videos().update(
            part='snippet',
            body={
                'id': video_id,
                'snippet': snippet
            }
        ).execute()
        
        print(f"  ✓ Updated: '{snippet['title'][:50]}...'")
        return True
    
    except HttpError as e:
        print(f"  ✗ Error updating video {video_id}: {e}")
        return False


def main():
    """Main function to update all video descriptions"""
    print("=" * 60)
    print("YouTube Video Description Updater")
    print("=" * 60)
    print()
    
    # Authenticate
    print("Authenticating with YouTube...")
    creds = authenticate()
    
    if not creds:
        print("Authentication failed. Exiting.")
        return
    
    youtube = build('youtube', 'v3', credentials=creds)
    print("✓ Authentication successful!")
    print()
    
    # Get all video IDs
    print("Fetching your videos...")
    video_ids = get_all_video_ids(youtube)
    
    if not video_ids:
        print("No videos found. Exiting.")
        return
    
    print()
    print("=" * 60)
    print("PREVIEW MODE - Checking what would be updated")
    print("=" * 60)
    print()
    
    # First, do a dry run
    for i, video_id in enumerate(video_ids, 1):
        print(f"[{i}/{len(video_ids)}]", end=" ")
        update_video_description(youtube, video_id, dry_run=True)
    
    print()
    print("=" * 60)
    
    # Ask for confirmation
    response = input(f"\nDo you want to update all {len(video_ids)} videos? (yes/no): ").lower()
    
    if response != 'yes':
        print("Update cancelled.")
        return
    
    print()
    print("=" * 60)
    print("Updating videos...")
    print("=" * 60)
    print()
    
    # Update all videos
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for i, video_id in enumerate(video_ids, 1):
        print(f"[{i}/{len(video_ids)}]", end=" ")
        result = update_video_description(youtube, video_id, dry_run=False)
        
        if result:
            success_count += 1
        else:
            error_count += 1
    
    print()
    print("=" * 60)
    print("Update Complete!")
    print("=" * 60)
    print(f"Successfully updated: {success_count}")
    print(f"Errors: {error_count}")
    print(f"Total videos: {len(video_ids)}")


if __name__ == '__main__':
    main()
