# iot-security-system
# IoT Security System for Security Companies

A comprehensive IoT-based security management system that integrates hardware sensors (PIR, door/window sensors) with ESP32/Arduino devices, SIM800L SMS modules, and a modern web dashboard. Designed for security companies to monitor multiple client locations in real-time.

## 🚀 Features

### Web Dashboard
- **Real-time Monitoring**: Live sensor data and device status
- **Alert Management**: Instant notifications and incident tracking
- **Client Management**: Multiple client support with contact management
- **SMS Integration**: Automated SMS alerts via SIM800L or cloud services
- **Device Health**: Monitor ESP32 devices, WiFi signals, and system status
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Hardware Integration
- **ESP32/Arduino Support**: Full integration with ESP32 development boards
- **PIR Motion Sensors**: Passive infrared motion detection
- **Door/Window Sensors**: Magnetic switches for entry point monitoring
- **SIM800L SMS Module**: GSM communication for SMS alerts
- **WiFi Communication**: Real-time data transmission to web dashboard
- **Local Alarms**: Buzzer and LED indicators for immediate local response

### Security Features
- **Multi-sensor Support**: PIR, door, window, glass break, smoke detectors
- **Real-time Alerts**: Instant notifications to clients and security company
- **Emergency Contacts**: Automated escalation to multiple contacts
- **Incident Logging**: Complete audit trail of all security events
- **Response Tracking**: Monitor security team response times

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons
- **Sonner** for notifications

### Hardware
- **ESP32** development boards
- **Arduino IDE** or **PlatformIO**
- **PIR Sensors** (HC-SR501 or similar)
- **SIM800L** GSM module
- **Magnetic door/window switches**
- **Buzzer and LED indicators**

### Communication
- **WiFi** for primary communication
- **GSM/SMS** via SIM800L for backup and alerts
- **HTTP/HTTPS** REST API
- **WebSocket** for real-time updates

## 📋 Prerequisites

### Software Requirements
- Node.js 18+ and Bun
- Arduino IDE or PlatformIO
- Git

### Hardware Requirements
- ESP32 development board
- PIR motion sensor (HC-SR501)
- SIM800L GSM module
- Magnetic door/window sensors
- Buzzer and status LED
- Jumper wires and breadboard
- Power supply (5V/3.3V)

## 🔧 Installation & Setup

### 1. Web Dashboard Setup

```bash
# Clone the repository
git clone https://github.com/your-username/iot-security-system.git
cd iot-security-system

# Install dependencies
bun install

# Start development server
bun run dev
```

### 2. Hardware Setup

#### Wiring Diagram
```
ESP32 Pin Configuration:
- PIR Sensor Data → GPIO 2
- Door Sensor → GPIO 4 (with pullup)
- Window Sensor → GPIO 5 (with pullup)
- Buzzer → GPIO 18
- Status LED → GPIO 19
- SIM800L TX → GPIO 16
- SIM800L RX → GPIO 17
- VCC → 3.3V/5V (depending on sensor)
- GND → GND
```

#### ESP32 Code Setup
1. Install required libraries in Arduino IDE:
   ```
   WiFi library (built-in)
   HTTPClient library (built-in)
   ArduinoJson by Benoit Blanchon
   SoftwareSerial library
   WebServer library (built-in)
   ESPmDNS library (built-in)
   ```

2. Upload the code from `hardware/ESP32_SecuritySystem.cpp`
3. Configure WiFi credentials and server URL
4. Set up SIM800L with your SIM card and APN settings

### 3. SIM800L Configuration

```cpp
// Update these settings in the ESP32 code
const String apn = "your-network-apn";  // e.g., "safaricom" for Safaricom
const String emergencyNumber = "+254XXXXXXXXX";  // Client's phone number
```

## 🔗 Hardware Integration Examples

### PIR Sensor Connection
```cpp
// PIR sensor triggered when motion detected
void readSensors() {
  bool newPirState = digitalRead(PIR_PIN);
  if (newPirState != pirState) {
    pirState = newPirState;
    if (pirState) {
      handleIntrusionAlert("PIR", "Motion detected at front door");
    }
  }
}
```

### SMS Alert via SIM800L
```cpp
// Send SMS using AT commands
bool sendSMS(String phoneNumber, String message) {
  sim800l.println("AT+CMGS=\"" + phoneNumber + "\"");
  delay(1000);
  sim800l.print(message);
  delay(100);
  sim800l.println((char)26);  // Ctrl+Z to send
  delay(5000);
  return true;
}
```

### Web Dashboard Communication
```cpp
// Send real-time data to dashboard
void sendHeartbeat() {
  HTTPClient http;
  http.begin(serverURL + "/heartbeat");

  DynamicJsonDocument doc(512);
  doc["deviceId"] = deviceId;
  doc["sensors"]["pir"] = pirState;
  doc["sensors"]["door"] = doorState;
  doc["systemInfo"]["wifiSignal"] = WiFi.RSSI();

  String payload;
  serializeJson(doc, payload);

  http.POST(payload);
  http.end();
}
```

## 📡 API Integration

### ESP32 Endpoints
The ESP32 creates a web server with these endpoints:

- `GET /status` - Get current sensor readings and system info
- `POST /command` - Send commands (SMS, alarm, etc.)
- `POST /config` - Update device configuration

### Dashboard API
The web dashboard expects these data formats:

```typescript
// Sensor reading format
interface SensorReading {
  id: string;
  sensorId: string;
  type: 'PIR' | 'DOOR' | 'WINDOW';
  value: number;
  status: 'NORMAL' | 'TRIGGERED';
  timestamp: Date;
  location: string;
}

// Device status format
interface IoTDevice {
  id: string;
  type: 'ESP32' | 'ARDUINO_UNO';
  status: 'ONLINE' | 'OFFLINE';
  ipAddress: string;
  sensors: HardwareSensor[];
  simCardNumber?: string;
}
```

## 🚨 Security Alert Flow

1. **Sensor Triggered**: PIR/door/window sensor detects activity
2. **Local Response**: ESP32 triggers buzzer and flashes LED
3. **SMS Alert**: SIM800L sends SMS to client and emergency contacts
4. **Dashboard Alert**: Real-time notification appears on web dashboard
5. **Incident Logging**: Event recorded with timestamp and details
6. **Response Tracking**: Security team response time monitored

## 🔧 Configuration

### Client Management
```typescript
// Add new client through dashboard
const newClient = {
  name: "TechCorp Ltd",
  contactPerson: "John Doe",
  phoneNumber: "+254712345678",
  address: "123 Business Street, Nairobi",
  emergencyContacts: [
    {
      name: "Security Manager",
      phoneNumber: "+254712345679",
      priority: 1
    }
  ]
};
```

### Device Configuration
```cpp
// ESP32 device configuration
struct DeviceConfig {
  String deviceId = "ESP32-DEV-001";
  String wifiSSID = "YourWiFiNetwork";
  String serverURL = "http://your-dashboard.com/api";
  int heartbeatInterval = 30000;  // 30 seconds
  String emergencyNumber = "+254712345678";
};
```

## 📱 SMS Integration

### SIM800L Setup
1. Insert SIM card with data plan
2. Connect to ESP32 via serial pins
3. Configure APN settings for your network
4. Test SMS functionality

### SMS Commands
The system supports various SMS alert formats:
- **Security Alert**: `SECURITY ALERT: Motion detected at Front Door - [timestamp]`
- **Emergency**: `EMERGENCY: Security breach detected at [client name]`
- **System Status**: `SYSTEM ONLINE: All sensors operational`

## 🎯 Use Cases

### For Security Companies
- Monitor multiple client locations from single dashboard
- Receive instant alerts via SMS and web notifications
- Track response times and incident history
- Manage client contact information and preferences
- Scale to hundreds of client locations

### For Business Owners
- Real-time security monitoring of premises
- Immediate SMS alerts during security breaches
- Remote monitoring via web dashboard
- Integration with existing security systems
- Cost-effective alternative to traditional security systems

## 🚀 Deployment

### Production Deployment
1. Set up cloud hosting (AWS, DigitalOcean, etc.)
2. Configure domain name and SSL certificate
3. Set up database for client and incident data
4. Configure SMS gateway (Twilio, AWS SNS as backup)
5. Deploy ESP32 devices at client locations

### Scaling Considerations
- Use load balancers for multiple dashboard instances
- Implement database clustering for high availability
- Set up monitoring and alerting for system health
- Plan for firmware updates via OTA (Over-The-Air)

## 🤝 Contributing

This is an educational project demonstrating IoT security systems. Feel free to:
- Fork the repository
- Submit bug reports and feature requests
- Contribute improvements and optimizations
- Share your hardware setup variations

## 📄 License

This project is for educational purposes. Please ensure compliance with local regulations when implementing security systems.

## 🔗 Related Resources

- [ESP32 Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/)
- [Arduino IDE Setup](https://docs.arduino.cc/software/ide-v2/)
- [SIM800L AT Commands](https://www.elecrow.com/wiki/index.php?title=SIM800L_GSM/GPRS_Module)
- [PIR Sensor Guide](https://lastminuteengineers.com/pir-sensor-arduino-tutorial/)
- [React Documentation](https://reactjs.org/)

---

**Built for Electronics and Computer Engineering Students**
Demonstrates real-world IoT applications, embedded systems programming, web development, and security system architecture.
