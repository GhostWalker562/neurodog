import time

from elevenlabs_actions import listen, speak
from openai_actions import get_audio_transcript, request_action
from spot_actions import bow, sit, stand_up
from spot_controller import SpotController

from dotenv import load_dotenv

load_dotenv()

ROBOT_IP = "10.0.0.3"  # os.environ['ROBOT_IP']
SPOT_USERNAME = "admin"  # os.environ['SPOT_USERNAME']
SPOT_PASSWORD = "2zqa8dgw7lor"  # os.environ['SPOT_PASSWORD']

last_time = 0
is_forward = False

controller = SpotController(
    username=SPOT_USERNAME, password=SPOT_PASSWORD, robot_ip=ROBOT_IP
)


def main():
    with controller as spot:
        time.sleep(2)

        # Move head to specified positions with intermediate time.sleep
        spot.move_head_in_points(
            yaws=[0.2, 0], pitches=[0.3, 0], rolls=[0.4, 0], sleep_after_point_reached=1
        )
        time.sleep(3)

        action_count = 0
        listening = True
        while listening:
            speak("I'm listening, talk now...")
            listen()

            # Get the transcription
            print("Getting audio transcript")
            user_prompt = get_audio_transcript()
            action_count += 1
            print(user_prompt)

            if action_count > 3:
                speak("I'm tired of listening to you, goodbye!")
                print("Stopping")
                listening = False
                break

            if "stop" in user_prompt.lower():
                speak("Goodbye!")
                print("Stopping")
                listening = False
                break

            if user_prompt == "":
                continue
            else:
                actionRequest = request_action(user_prompt)
                print(f"Action Request: {actionRequest}")

                command = actionRequest["action"]

                if command == "sit":
                    sit(spot)
                    continue
                elif command == "stand-up":
                    stand_up(spot)
                    continue
                elif command == "bow":
                    bow(spot)
                    continue
                elif command == "stop":
                    speak("Goodbye!")
                    print("Stopping")
                    listening = False
                    break
                else:
                    speak("I don't know that command! Try again.")
                    print("dont recognize this command")
                    continue


if __name__ == "__main__":
    main()
