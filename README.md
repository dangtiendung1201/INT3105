# **<p style="text-align:center;">Health Endpoint Monitoring</p>**

## 🕵️ Mục lục
1. [Case study](#issue)
2. [Giới thiệu công cụ sử dụng](#tool)
3. [Kiến trúc](#architecture)
4. [Các metrics](#metrics)
5. [So sánh các giải pháp](#comparison)
6. [Cài đặt](#setting)
7. [Thực nghiệm](#testing)
8. [Slide](#slide)

## Case study <a name="issue"></a>
Một đơn vị cần xây dựng hệ thống giám sát "sức khoẻ" của các services trong hạ tầng của họ. Sử dụng những kiến thức về Health Endpoint Monitoring để xây dựng cho mình một trang web quản lý nhưng thông tin sau:

* Tình trạng (up/down) của các container
* Tình trạng (up/down) của các endpoint
* Hiển thị realtime các tài nguyên như RAM/Bộ nhớ/Băng thông mạng của máy chủ
* Xây dựng biểu đồ lưu lượng truy cập.

Đối với hệ thống cần giám sát cần xây dựng:

* Ít nhất 2 container docker
* Container thứ nhất gồm 1 API endpoint cập nhật thông tin giá vàng tại Việt Nam
* Container thứ nhất gồm 1 API endpoint cập nhật thông tin giá ngoại tệ so với VNĐ.

Tham khảo uptime.com.

## Giới thiệu công cụ sử dụng <a name="tool"></a>
### InfluxDB
Cơ sở dữ liệu chuỗi thời gian (time-series)
Mã nguồn mở
Truy xuất dữ liệu thời gian thực như giám sát dữ liệu cảm biến IoT, chỉ số hoạt động hệ thống
Hỗ trợ nền tảng Cloud influxDB Cloud
### Grafana
Grafana là một công cụ mã nguồn mở đa nền tảng dùng để trực quan hóa các số liệu dưới dạng các biểu đồ hoặc đồ thị. Với giao diện web hiện đại, Grafana cho phép người dùng dễ dàng tạo biểu đồ, đồ thị, cũng như thiết lập cảnh báo, khi được kết nối với các nguồn dữ liệu được hỗ trợ.

## Kiến trúc <a name="architecture"></a>
![image](https://github.com/user-attachments/assets/a66ddff1-dd6e-49d8-adb2-376370397301)

![image](https://github.com/user-attachments/assets/eab142b5-7ff7-4e91-9c3a-c1c8fc191d7d)

* Agent gửi yêu cầu kiểm tra sức khỏe đến ứng dụng thông qua kết nối socket, thu thập các chỉ số và thông tin về tình trạng hoạt động của hệ thống.
* Sau khi thu thập xong dữ liệu, Agent tiến hành định dạng lại thông tin và đẩy nó lên InfluxDB để lưu trữ và quản lý.
* InfluxDB sau đó cung cấp dữ liệu cho Grafana, cho phép trực quan hóa các chỉ số sức khỏe của hệ thống qua những biểu đồ sinh động, giúp người quản trị dễ dàng theo dõi và phân tích.
* Quá trình kiểm tra sức khỏe này được Agent thực hiện mỗi **5 giây** một lần, đảm bảo việc giám sát luôn liên tục và kịp thời phát hiện mọi vấn đề phát sinh trong hệ thống. Khoảng thời gian **5 giây** được lựa chọn dựa trên cơ sở để đảm bảo SLA 99.99% giống như các dịch vụ cloud như Azure, Amazon Web Services. Các hệ thống này đảm bảo downtime ít hơn 8.64 giây/ngày. Như vậy cần phải chọn 1 khoảng thời gian bé hơn 8.64 giây.


## Các metrics <a name="metrics"></a>
### API
* **Thời gian phản hồi**: Thời gian tính bắt đầu từ lúc gửi lệnh HEAD lên API và đến khi nhận phản hồi. (Đơn vị: ms)
* **Lượng sử dụng CPU**: Phần trăm sử dụng CPU của tiến trình tương ứng với API so với tổng tài nguyên trên hệ thống. (Đơn vị: Phần trăm)
* **Lượng sử dụng RAM**: Lượng RAM của tiến trình (API) sử dụng (Đơn vị: MB)
![image](https://github.com/user-attachments/assets/16db3da8-47fd-46b3-9583-0a0a6f41a6c8)
![image](https://github.com/user-attachments/assets/828690eb-df1e-4d72-bd79-4819dcadcb89)

### Container
Tất cả các thông tin có thể lấy được nhờ lệnh “docker stats”, “docker ps”:
* **CPU Usage**: Lượng phần trăm CPU được container sử dụng so với toàn bộ tài nguyên hệ thống. (Đơn vị: Phần trăm)
* **Memory Usage**: Lượng RAM mà container sử dụng (Đơn vị: MB)
* **Network I/O**: Tổng lượng data gửi nhận bởi container (Đơn vị: byte)
* **Block I/O**: Tổng lượng data được đọc, ghi trong container (Đơn vị: byte)
* **Tình trạng container**: Trạng thái hiện tại của container (0/1)
![image](https://github.com/user-attachments/assets/a5f21e2b-a6f2-4421-8644-a11e145d7df7)

### Server
* **CPU Usage**: Lượng phần trăm CPU trung bình được sử dụng trong 1 phút so với toàn bộ tài nguyên hệ thống. (Đơn vị: Phần trăm)
* **RAM Usage**: Tổng lượng RAM mà server sử dụng (Đơn vị: GB)
* **Bandwidth**: Tổng lượng data gửi nhận bởi server (Đơn vị: MB)
* **ROM Usage**: Tổng dung lượng ổ cứng đã sử dụng (Đơn vị: TB)
![image](https://github.com/user-attachments/assets/f680d3f6-2da4-4eec-866a-b276915c9a23)

### Traffic
Sử dụng 1 middleware để đếm số lượng request vào website:
![image](https://github.com/user-attachments/assets/5dcc65aa-a589-4802-b468-503175c7c4fa)


## So sánh các giải pháp <a name="comparison"></a>
| **Prometheus**                         | **InfluxDB**                                |
|----------------------------------------|--------------------------------------------|
| Lưu dữ liệu tối đa 15 ngày             | Có thể lưu dữ liệu bao lâu tùy ý miễn bộ nhớ đủ |
| Cần sử dụng thêm công cụ nếu muốn phân tán và lưu dữ liệu lâu dài (Thanos.io) | Hỗ trợ việc phân tán                      |
| Sử dụng pull model (hỏi định kỳ)       | Hỗ trợ push, pull dữ liệu realtime         |
| Lấy data chủ yếu qua HTTP từ endpoint  | Hỗ trợ lấy thông tin từ API RESTful, Kafka, |

=> **InfluxDB có nhiều ưu điểm hơn trong việc monitoring thời gian thực**



| **GET**                      | **HEAD**                 |
|------------------------------|------------------------------|
|Requests cả header và body    | Chỉ requests header, không có body.|
|Trả về nội dung của tài nguyên| Không trả về bất kỳ nội dung nào|
|Chậm hơn và tốn tài nguyên hơn| Nhanh hơn và hiệu quả hơn|
|Để xem hoặc tải tài nguyên    | Để kiểm tra hoặc xác nhận tài nguyên|

=> **HEAD method tối ưu hơn vì nó tiết kiệm tài nguyên và thời gian**

## Cài đặt <a name="setting"></a>
 ```
 git clone https://github.com/dangtiendung1201/INT3105.git
 ```
Tại branch MayBiMonitor:
```
git checkout MayBiMonitor

# Cài đặt dependencies
cd container-health
npm install

cd ../gold-price-service
npm install

cd ../forex-price-service
npm install

# Quay trở lại root directory
cd ../

# Khởi chạy các container được định nghĩa trong file docker-compose.yml
docker-compose up --build
 ```

Tại branch MayMonitor:
```
git checkout MayMonitor

# Cài đặt dependencies
cd api-health
npm install

cd ../container-health
npm install

cd ../server-health
npm install

cd ../traffic
npm install

# Quay trở lại root directory
cd ../

# Khởi chạy các container được định nghĩa trong file docker-compose.yml
docker-compose up --build
 ```
 **Chú ý:** Điền các file `.env` theo ví dụ trong `.env.example`.
 
## Thực nghiệm <a name="testing"></a>
Sử dụng công cụ Jmeter để kiểm tra tính hiệu quả của giải pháp với cài đặt: **Số người dùng =  10; Thời gian ramp-up: 0s; Vòng lặp: 1000**. Tổng: 10000 request. Tiến hành đo thời gian từ lúc **Agent gửi yêu cầu kiểm tra sức khỏe** đến khi **kết quả được hiển thị trên Grafana** (tức 1 quy trình hoàn chỉnh).


| Chức năng | Nhỏ nhất | Lớn nhất | Trung bình |
| -------- | -------- |----------|------------|
| Theo dõi API     | 120 ms     |402 ms|172 ms|
| Theo dõi container     | 231 ms     |517 ms|254  ms|
| Theo dõi server     | 193 ms     |377 ms|214  ms|
| Theo dõi traffic     | 95 ms     |176 ms|134  ms|

## 🖼️ Slide và frontend của giải pháp <a name="slide"></a>
Theo dõi API tại [đây](https://dangtiendung1201.grafana.net/public-dashboards/a130da9bc1c242d28e800552d6decc37)
Theo dõi container tại [đây](https://dangtiendung1201.grafana.net/public-dashboards/2191be5a8026486180ab67b2c397f2e4)
Theo dõi server tại [đây](https://dangtiendung1201.grafana.net/public-dashboards/047e1ef22f6d4717a0aceb9ba7880443)
Theo dõi traffic tại [đây](https://dangtiendung1201.grafana.net/public-dashboards/863c9cb97c8d4516ac8829f2a74a7c8a)
Truy cập slide tại [đây](https://www.canva.com/design/DAGYCIPXa_c/YPJCcOwgxDEk8Fcuh2_RcA/edit)
