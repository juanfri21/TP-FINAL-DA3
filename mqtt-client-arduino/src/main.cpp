/*==================[ file header ]==========================================*/
// File:    main.cpp
// Author:  Juan Francisco Tentor (https://github.com/juanfri21)
// Licence: GPLV3+
// Version: 1.0.0
// Date:    October 2020
/*==================[inclusions]=============================================*/

#include <WiFi.h>
#include <PubSubClient.h>

/*==================[macros and definitions]=================================*/

// APPLICATION SETTINGS
#define LED_ONBOARD 2
#define INIT_DELAY 3000
#define SERIAL_BAURDATE 115200
#define WIFI_CONNECTION_DELAY 500
#define MQTT_RETRY_CONNECTION_DELAY 5000
#define BLINK_TIME 100
#define DEFAULT_PUBLISH_TIME 30000
#define MIN_PUBLISH_TIME 1000
#define MAX_PUBLISH_TIME 10000

/*==================[internal data declaration]==============================*/

// Client to establish WiFi connection
WiFiClient WifiClient;
// Client MQTT, needs a WiFi connection
PubSubClient MqttClient(WifiClient);
// Variable to change report time
static uint32_t PublishTime = DEFAULT_PUBLISH_TIME;

/*==================[internal functions declaration]=========================*/

void Gpio_BlinkLed(uint8_t led, uint32_t milliseconds);
void Wifi_EstablishConnection(void);
void Mqtt_ConnectToBroker(void);
void Mqtt_PublishTopic(String topic, String payload);
void Mqtt_SubscribeCallback(char *topic, byte *payload, unsigned int length);
void App_Init(void);
void App_Loop(void);

/*==================[internal data definition]===============================*/

// Device indentification
const String DEVICE_ID = "dispositivo_2";
const String UUID = "SERIAL_2";
const String UUID_SENSOR_HUMEDAD = UUID + "_1";
const String UUID_SENSOR_TEMPERATURA = UUID + "_2";
const String UUID_SENSOR_ACTUADOR = UUID + "_3";

// Wifi settings
const String WIFI_SSID = "Fibertel WiFi870 2.4GHz";
const String WIFI_PASS = "r45b2fzgpd";
// Mqtt server settings
const String MQTT_SERVER = "192.168.0.125";
const int MQTT_PORT = 1884;
const String MQTT_USER = "";
const String MQTT_PASS = "";
// Mqtt message settings
const String MQTT_TOPIC_INIT = UUID + "/PublishTime";

const String MQTT_TOPIC_CONFIG = "config";
const String MQTT_TOPIC_MEDICIONES = "mediciones";
const String MQTT_TOPIC_ACTUADOR = UUID + "/actuador";
const String MQTT_TOPIC_ACTUADOR_ws_client = "ws/actuador";
const String MQTT_TOPIC_ACTUADOR_api_client = "actuadores_api";




/*==================[external data definition]===============================*/

/*==================[internal functions definition]==========================*/

void Gpio_BlinkLed(uint8_t led, uint32_t milliseconds)
{
    // Blink on board led when topic is sended
    digitalWrite(led, true);
    delay(milliseconds);
    digitalWrite(led, false);
}

void Wifi_EstablishConnection()
{
    // Print network SSID
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WIFI_SSID);
    // Try to connect
    WiFi.begin(WIFI_SSID.c_str(), WIFI_PASS.c_str());
    // Wait until connection is established
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(WIFI_CONNECTION_DELAY);
        Serial.print(".");
    }
    // Report IP address
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void Mqtt_ConnectToBroker()
{
    // Loop until we're reconnected
    while (!MqttClient.connected())
    {
        Serial.print("Attempting MQTT connection...");
        // Attempt to connect
        if (MqttClient.connect(DEVICE_ID.c_str()))
        {
            Serial.println("connected");
            // Subscribe to topic
            MqttClient.subscribe(MQTT_TOPIC_ACTUADOR.c_str());
        }
        else
        {
            Serial.print("failed, rc = ");
            Serial.print(MqttClient.state());
            Serial.println(". Try again in MQTT_RETRY_CONNECTION_TIME ms.");
            // Wait 5 seconds before retrying
            delay(MQTT_RETRY_CONNECTION_DELAY);
        }
    }
}

void Mqtt_PublishTopic(String topic, String payload)
{
    // Print in console the topic-payload that will be sent
    Serial.print("Sending MQTT Topic-Payload: ");
    Serial.print(topic);
    Serial.print(" -> ");
    Serial.println(payload);
    // Publish message
    MqttClient.publish(topic.c_str(), payload.c_str());
}

void Mqtt_SubscribeCallback(char *topic, byte *payload, unsigned int length)
{
    if (strcmp(topic, MQTT_TOPIC_CONFIG.c_str()) == 0)
    {
        // put null char to payload buffer
        payload[length] = '\0';
        // convert string value to int valie
        uint32_t publishTime = atoi((const char *)payload);
        // Check if value received is correct.
        if (publishTime >= MIN_PUBLISH_TIME && publishTime <= MAX_PUBLISH_TIME)
        {
            Serial.print("Publish time will change to ");
            Serial.print((const char *)payload);
            Serial.print(" ms");
            // Change publish time
            PublishTime = publishTime;
        }
        else
        {
            Serial.print("Invalid publish time, must be between MIN_REPORT_TIME and MAX_REPORT_TIME ms.");
        }
        Serial.println();
    }
    else if(strcmp(topic, MQTT_TOPIC_ACTUADOR.c_str()) == 0){
        int set_state = atoi((const char *)payload);
        Serial.println(set_state);
        if(set_state){
            digitalWrite(LED_ONBOARD, true);
        }
        else{
            digitalWrite(LED_ONBOARD, false);
        }
        char respuesta_ws_client[200];
        // //[{ "u": "SERIAL_1_1", "v": 45422 },{ "u": "SERIAL_1_2", "v": 555 }]
        snprintf(respuesta_ws_client, sizeof(respuesta_ws_client), "[{\"u\": \"%s\", \"v\": %d}]",UUID_SENSOR_ACTUADOR.c_str(), set_state);
        // String respuesta_ws_client = "[{\"u\": "+String(UUID_SENSOR_ACTUADOR)+", \"v\": "+String(set_state)+"}]";
       
        // // Send MQTT Topic
        Mqtt_PublishTopic(MQTT_TOPIC_ACTUADOR_ws_client, respuesta_ws_client);
        Mqtt_PublishTopic(MQTT_TOPIC_ACTUADOR_api_client, respuesta_ws_client);

    }
    else
    {
        Serial.println("Unknown topic received!");
    }
}

void App_Init()
{
    // wait a moment before start
    delay(INIT_DELAY);
    // Configure serial port at 115200 baudrios
    Serial.begin(SERIAL_BAURDATE);
    // Configure pins of buttons and leds
    pinMode(LED_ONBOARD, OUTPUT);
    // print to console Init message
    Serial.println("Welcome to MQTT connection test!");
    // Set MQTT Server
    MqttClient.setServer(MQTT_SERVER.c_str(), MQTT_PORT);
    // Configure a callback to receive topics
    MqttClient.setCallback(Mqtt_SubscribeCallback);
    // Connect to WiFi
    Wifi_EstablishConnection();
    // Leave built in led on
    digitalWrite(LED_ONBOARD, false);
}

void App_Loop()
{
    // Create a variable to publish topic
    static uint32_t tickCounter = 0;
    // Check if MQTT client is not connected to server.
    if (!MqttClient.connected())
    {
        // Try to connect with MQTT Server.
        Mqtt_ConnectToBroker();
    }
    // Loop for incoming messages.
    MqttClient.loop();
    // Use this variable to unblock the loop
    if (++tickCounter >= PublishTime)
    {
        // Reset counter
        tickCounter = 0;
       
        float humedad_random = random(10.0, 90.0);
        float temperatura_random = random(10.0, 25.0);

        char medicion_mentira[200];
        //[{ "u": "SERIAL_1_1", "v": 45422 },{ "u": "SERIAL_1_2", "v": 555 }]
        snprintf(medicion_mentira, sizeof(medicion_mentira), "[{\"u\": \"%s\", \"v\": %.2f}, {\"u\": \"%s\", \"v\": %.2f}]",UUID_SENSOR_HUMEDAD.c_str(), humedad_random, UUID_SENSOR_TEMPERATURA.c_str(), temperatura_random);
        // String medicion_mentira = "[{\"u\": "+String(UUID_SENSOR_HUMEDAD)+", \"v\": "+String(humedad_random)+"}, {\"u\": "+String(UUID_SENSOR_TEMPERATURA)+", \"v\": "+String(temperatura_random)+"}]";
        // Send MQTT Topic
        Mqtt_PublishTopic(MQTT_TOPIC_MEDICIONES, medicion_mentira);
        // Blink LED
        // Gpio_BlinkLed(LED_ONBOARD, BLINK_TIME);
    }
    // delay 1 MS to start loop again
    delay(1);
}

/*==================[external functions definition]==========================*/

void setup()
{
    App_Init();
}

void loop()
{
    App_Loop();
}

/*==================[end of file]============================================*/
