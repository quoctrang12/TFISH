create database qlfish character set = "utf8";
use qlfish;

create table accounts(
    email char(50) PRIMARY KEY,
    password char(20) not null,
    permision char 
);
create table users(
    id int PRIMARY KEY auto_increment,
    name varchar(50) not null,
    phone_number char(10),
    email char(50),
    foreign key (email) references accounts(email)
);
create table type_products(
    id int PRIMARY KEY auto_increment,
    name_type varchar(50) not null
);
create table products(
    id int PRIMARY KEY auto_increment,
    name_product varchar(50) not null,
    price int,
    size char(10) not null,
    linkimg varchar(50) not null,
    des text,
    id_type int,
    FOREIGN key (id_type) REFERENCES type_products(id)
);
create table carts(
	id int primary key auto_increment,
    id_product int,
    id_user int ,
    count int,
    FOREIGN key (id_product) REFERENCES products(id),
    FOREIGN key (id_user) REFERENCES users(id)
);

create table bills(
    id int PRIMARY KEY auto_increment,
    id_user int,
    create_at datetime,
    address text,
    total int,
	payment varchar(50),
    status varchar(50),
    foreign key (id_user) REFERENCES users(id)
);
create table bill_detail(
    id_bill int,
    id_product int,
    count int,
    PRIMARY KEY (id_product, id_bill),
    foreign key (id_product) REFERENCES products(id),
    foreign key (id_bill) REFERENCES bills(id)
);


create table khuyenmai(
    iduyenmai char(10) PRIMARY KEY,
    nameuyenmai varchar(50) not null
);

insert into accounts value ("TrangB1910467@student.ctu.edu.vn","123456",0);
insert into users(name,phone_number,email) value ("Nguyễn Quốc Trạng","0912321347","TrangB1910467@student.ctu.edu.vn");

insert into type_products value (1, "Cá betta");
insert into type_products value (2, "Cá vàng");
insert into type_products value (3, "Cá rồng");
insert into type_products value (4, "Cá guppy");
insert into type_products value (5, "Cá nước ngọt");
insert into type_products value (6, "Các loại cá nước mặn");
insert into type_products value (7, "Crayfish");
insert into type_products value (8,"Trang trí");
insert into type_products value (9,"Thức ăn");
insert into products value (1, "Betta Fancy Yellow",150000,"3-4cm","/images/betta-fc-2.jpg","
Cá betta fancy yellow có đặc điểm là thân hình nhỏ gọn. Vây đuôi ngắn và màu sắc chủ đạo là màu vàng...", 1);
insert into products value (2, "Betta Fancy Red",140000,"3-4cm","/images/betta-fc-3.jpg","
Cá betta fancy red có đặc điểm là thân hình nhỏ gọn. Vây đuôi ngắn và màu sắc chủ đạo là màu đỏ...", 1);
insert into products value (3, "Betta Koi Galaxy",150000,"3-4cm","/images/betta-koi-glx-3.jpg","
Cá betta koi galaxy có đặc điểm là thân hình nhỏ gọn. Vây đuôi ngắn và màu sắc bắt mắt...", 1);
insert into products value (4, "Betta Dumbo Dứa",150000,"3-4cm","/images/betta-dumbo-3.jpg","
Cá betta dumbo dứa có đặc điểm là thân hình nhỏ gọn. Vây đuôi dài và màu sắc chủ đạo là màu dứa...", 1);
insert into products value (5,"Betta Halfmoon Yellow",100000,"3-4cm","/images/betta-5.jpg","
Cá betta halfmoon yellow có đặc điểm là đuôi xòe được đến 180 độ hoặc hơn. Vây đuôi dài và màu sắc chủ đạo là màu vàng...",1);
insert into products value (6,"Betta Halfmoon Red",100000,"3-4cm","/images/betta-4.jpg","
Cá betta halfmoon red có đặc điểm là đuôi xòe được đến 180 độ hoặc hơn. Vây đuôi dài và màu sắc chủ đạo là màu đỏ...",1);
insert into products value (7,"Betta Halfmoon Đuôi Tưa",120000,"3-4cm","/images/betta-2.jpg","
Cá betta halfmoon đuôi tưa có đặc điểm là đuôi xòe được đến 180 độ hoặc hơn và đuôi tưa. Vây đuôi dài và màu sắc chủ đạo là màu xanh...",1);
insert into products value (8,"Betta Dragon White",110000,"3-4cm","/images/betta-dragon-1.jpg","
Cá betta dragon white có đặc điểm là phần thân màu trắng, vây dày và đều nhau. Vây đuôi có màu trong suốt khác với cơ thể...",1);
insert into products value (9,"Betta Dragon Black",110000,"3-4cm","/images/betta-dragon-2.jpg","
Cá betta dragon black có đặc điểm là phần thân màu trắng, vây dày và đều nhau. Vây đuôi có màu đen khác với cơ thể...",1);
insert into products value (10,"Betta Dragon Red",110000,"3-4cm","/images/betta-dragon-3.jpg","
Cá betta dragon red có đặc điểm là phần thân màu trắng, vây dày và đều nhau. Vây đuôi có màu đỏ khác với cơ thể...",1);
insert into products value (11,"Betta Dragon Yellow",110000,"3-4cm","/images/betta-dragon-4.jpg","
Cá betta dragon yellow có đặc điểm là phần thân màu trắng, vây dày và đều nhau. Vây đuôi có màu vàng khác với cơ thể...",1);
insert into products value (12,"Betta Dumbo Halfmoon Red",120000,"3-4cm","/images/betta-dumbo-1.jpg","
Cá betta dumbo halfmoon red có đặc điểm là vây bơi to hơn bình thường và mang đầy đủ đặc điểm của dòng halfmoon . Vây và đuôi to màu chủ đạo là red...",1);
insert into products value (13,"Betta Dumbo Nemo",320000,"3-4cm","/images/betta-dumbo-2.jpg","
Cá betta dumbo nemo là dòng được lai tạo giữa dumbo và nemo, tay bơi to kết hợp cùng bộ màu Nemo nửa đẹp hết sẩy",1);
insert into products value (14,"Betta Fancy Copper Red ",120000,"3-4cm","/images/betta-fc.jpg","
Cá betta fancy copper red là dòng fancy lai với copper, có bộ màu chủ yếu là đỏ...",1);
insert into products value (15,"Betta Fancy Dragon Copper Yellow",120000,"3-4cm","/images/betta-fc-2.jpg","
Cá betta fancy dragon copper yellow là dòng fancy copper lai vs dragon yellow, mang bộ vảy dày của dòng dragon và màu sắc của dòng fancy, có bộ màu chủ yếu là vàng...",1);
insert into products value (16,"Betta Fancy Green ",130000,"3-4cm","/images/betta-fc-4.jpg","
Cá betta fancy green là dòng fancy mới, với bộ màu chủ yếu là xanh lục...",1);
insert into products value (17,"Betta Koi Galaxy Red ",100000,"3-4cm","/images/betta-koi-glx-1.jpg","
Cá betta fancy koi galaxy red là dòng được phát triển từ fancy dựa theo phong cách của cá koi, có bộ màu đa dạng và chủ yếu là đỏ...",1);
insert into products value (18,"Betta Black Blue Galaxy",150000,"3-4cm","/images/betta-koi-glx-4.jpg","
Cá Betta Black Blue Galaxy lấy ý tưởng từ dòng koi của Nhật Bản, có màu sắc đan xen giữa blue và black.",1);
insert into products value (19,"Betta Black Samurai",250000,"3-4cm","/images/betta-samurai-1.jpg","
“Black Samurai” được Pichet Plaisanguan (Interfish) giới thiệu vào năm 2013. Ở cá betta, đấy là một con rồng đen mà vảy rồng chỉ giới hạn ở đầu và nắp mang",1);
insert into products value (20,"Cá vàng Lưu Kim",50000,"10-15cm","/images/ca-ba-duoi-1.jpg","
Cá vàng Lưu Kim có xương sống cong, vây bụng và vây lưng dài. Với miệng nhọn nhỏ, và thân hình tam giác, nếu để ý, bạn sẽ thấy chúng có một cái bướu nhỏ ngay phía sau đầu",2);
insert into products value (21,"Cá vàng Ranchu",150000,"10-15cm","/images/ca-ba-duoi-2.jpg","
Với người Nhật, đây được coi là “Vua của các loài cá vàng” do vẻ đẹp ấn tượng của nó. Và trong các loại cá vàng ở Việt Nam. Đương nhiên chúng cũng được ưa chuộng rồi.
Lưng của Ranchu phải rộng, và không có vây lưng. Đầu nên có dạng chữ nhật, với khoảng cách giữa 2 mắt càng dài càng tốt. Mắt nhỏ, và phải nằm đúng vị trí, không quá cao cũng không quá nằm ra sau.",2);
insert into products value (22,"Cá vàng đuôi bướm",140000,"10-15cm","/images/ca-ba-duoi-1.jpg","
Đặc điểm nổi bật là chiếc nuôi có dạng hình chữ X. Và cơ thể có màu trắng, với điểm nhấn ấn tượng là đôi môi và những chiếc vây màu đỏ.",2);

insert into products value (23,"Cá Dĩa Xanh Chỉ Đỏ Tiger",500000,"10-12cm","/images/ca-dia-2.jpg","
Cá Dĩa Xanh Chỉ Đỏ Tiger có thân hình cao và đẹp, chúng được hầu hết dân chơi cá dĩa đều thích và chọn làm đứa con cưng trong hồ cá cảnh.",6);
insert into products value (24,"Cá Emperor Angelfish – Hoàng Đế",1500000,"30-38cm","/images/ca-dia-3.jpg","
Cá hoàng đế, còn được biết ở một vài nơi trên thế giới với cái tên Imperator hay Imperial Angelfish, là một trong những loài cá biển đắt nhất.",6);
insert into products value (25,"Cá Hề Nemo",200000,"10-18cm","/images/ca-he-2.jpg","
Cá hề nemo là loài cá nhỏ, có màu sắc sặc sỡ, là loài cá cảnh biển nổi tiếng,...",6);
insert into products value (26,"1 Cặp Cá Hề Nemo",350000,"10-18cm","/images/ca-he-4.jpg","
Cá hề nemo là loài cá nhỏ, có màu sắc sặc sỡ, là loài cá cảnh biển nổi tiếng,...",6);

insert into products value (27,"Cá Hồng Long",1000000,"10-15cm","/images/ca-hong-long-1.jpg","
Cá rồng Hồng Long (Osteoglossidae) là một trong những dòng cá rồng được nuôi phổ biến ở Việt Nam vì độ duyên dáng và giá cả của chúng.
 Tuy không thuộc dạng đẳng cấp như Huyết Long hay Kim Long Quá Bổi nhưng chúng cũng có những đặc điểm riêng của mình. Điểm dễ nhận dạng nhất là lớp vảy của chúng, 
 thường có màu hồng tươi, phần rìa vây và đuôi thường có màu đỏ hoặc cùng màu với thân. Khi di chuyển cũng nhẹ nhàng, quý phái không kém những loài cá rồng khác.",3);
insert into products value (28,"Cá Huyết Long",12000000,"10-15cm","/images/ca-hong-long-2.jpg","
Cá rồng huyết có tên tiếng anh là Scleropages formosus, dòng cá này có kích thước tương đối lớn, trung mình một chú cá rồng đỏ có chiều dài khoảng 90cm.
Trọng lượng cá dao động từ 7 tới 9kg, chúng sống chủ yếu ở điều kiện nước ngọt.",3);
insert into products value (29,"Cá Kim Long Quá Bối",15000000,"10-15cm","/images/ca-kim-long.jpg","
Kim long quá bối có màu vàng óng giống thỏi vàng 24k, tượng trưng cho sự may mắn và phú quý. Để có thể đánh giá được chất lượng của loại cá này cần căn cứ vào màu sắc của vẩy, nắp mang cùng những vùng mắt xung quanh nhất là vây lưng của cá.",3);

insert into products value (30,"Cá Koi Nhật Bản",900000,"28-35cm","/images/ca-koi-3.jpg","
Cá Koi được cho là loại cá mang lại may mắn, thể hiện triển vọng tương lai và cơ hội về tài chính. Hồ cá Koi đòi hỏi những tiêu chuẩn nghiêm ngặt về nguồn nước để cá được sinh trưởng, duy trì tốt, cá càng nhiều thì may mắn tiền tài càng sinh sôi,...",5);
insert into products value (31,"Cá La Hán King Lai",500000,"10-15cm","/images/ca-la-han-2.jpg","
Cá La Hán sở hữu thân hình nhiều vẩy lấp lánh cùng nhiều màu sắc rực rỡ. Cùng chiếc đầu gù rất to và dị dạng được coi là đủ tiêu chuẩn. Những con cá có ngoại hình như vậy thường có giá rất đắt đỏ. Lí do là dù sinh sản dễ nhưng cá trưởng thành có màu sắc đẹp và đầu gù lại rất hạn chế.",5);
insert into products value (32,"Cá La Hán Kim Cương",600000,"10-15cm","/images/ca-la-han-1.jpg","
Cá La Hán sở hữu thân hình nhiều vẩy lấp lánh cùng nhiều màu sắc rực rỡ. Cùng chiếc đầu gù rất to và dị dạng được coi là đủ tiêu chuẩn. Những con cá có ngoại hình như vậy thường có giá rất đắt đỏ. Lí do là dù sinh sản dễ nhưng cá trưởng thành có màu sắc đẹp và đầu gù lại rất hạn chế.",5);
insert into products value (33,"Cá Lóc Nữ Hoàng",900000,"23-25cm","/images/ca-loc-nu-hoang-1.jpg","
Cá Lóc Nữ Hoàng tên khoa học là channa aurantimaculata. Cá có nguồn gốc từ các khu vực của Ấn Độ. Chúng có khả năng thích nghi cực tốt với môi trường sống. Em cá Lóc Nữ Hoàng cũng được biết đến với biệt danh nữ hoàng của các loài cá lóc. Nhờ sở hữu màu sắc và hoa văn đẹp khỏi chê. Rất nổi bật và có tính thẩm mỹ cao. 
Hiện đang được các anh em nhà giàu yêu thích nhất.",5);

insert into products value (34,"Cá Thù Lù",150000,"7-8cm","/images/ca-thu-lu-2.jpg","
Cá thù lù (Danh pháp khoa học: Zanclus cornutus) là một loài cá còn sinh tồn duy nhất trong chi Zanclus và Zanclidae. Hiện nay các cá thể của loài này được nuôi làm cá cảnh, sự phổ biến của chúng tăng lên một phần nhờ bộ phim Finding Nemo.",6);
insert into products value (35,"Cá Bướm",100000,"7-10cm","/images/ca-thu-lu-3.jpg","
Cá Bướm từ lâu đã rất nổi tiếng với những hoa văn và màu sắc rực rỡ trên cơ thể, chũng cũng là một trong những nét độc đáo nổi bật nhất quanh các rạn san hô trên khắp thế giới.",6);
insert into products value (36,"Cá Tỳ Bà",10000,"5-8cm","/images/ca-ti-ba-2.jpg","
Cá Tỳ Bà sống chủ yếu ở những nơi nước tĩnh nhưng cũng có thể thích nghi rất tốt ở nhiều môi trường nước khác nhau. ",5);
insert into products value (37,"Cá Tỳ Bà Bướm",15000,"5-8cm","/images/ca-ti-ba-1.jpg","
Đây là một trong những loại cá dọn bể được nhiều người ưa thích nhất với vẻ ngoài độc đáo và bắt mắt. Chúng có hình dáng như một con cá sam thu nhỏ, 
phần bụng bám sát lấy mặt kính hoặc lá cây để cọ sát và hút rêu bẩn.",5);
insert into products value (38,"Cá Blue Grass Guppy",70000,"3-4cm","/images/guppy-1.jpg","
Sở hữu màu xanh dương đẹp mắt ở phần vây và phần đuôi cá nên giống cá Blue Grass nhận được rất nhiều sự yêu thích từ phía người chơi cá cảnh.
 Phần lưng của chúng có thêm các hoa văn chấm bi đẹp mắt nên cái tên Blue Grass cũng vì thế mà có. ",4);
insert into products value (39,"Cá Guppy Rồng Xanh Indo",80000,"3-4cm","/images/guppy.jpg","
Cá Guppy Rồng Xanh Indo là giống cá mới du nhập vào Việt Nam chưa lâu. Nhưng nó đã nhận được rất nhiều sự yêu thích từ phía người chơi. Bởi giống cá  này có màu xanh nổi bật. Khi nuôi chúng trong bể cá sẽ rất đẹp mắt.
 Chưa kể phần thân của nó có thêm vảy platinum nên khi nuôi sẽ càng tăng thêm vẻ đẹp cuốn hút cho bể cá. ",4);
insert into products value (40,"Cá Guppy Full Red",60000,"3-4cm","/images/guppy-2.jpg","
Cá Guppy Full Red có một đặc điểm để bạn có thể dễ dàng nhận biết ra. Đó chính là phần thân của nó có màu đỏ rực. Ngay cả phần vây cá cũng màu đỏ tươi. Giống cá này có nguồn gốc xuất xứ Đài Loan và Thái Lan.
 Hiện nay cá bảy màu Full Red được nuôi khá phổ biến tại Việt Nam.",4);
insert into products value (41,"Cá Guppy HB White",100000,"3-4cm","/images/guppy-3.jpg","
Tuy là dòng cá bảy màu mới nhưng Guppy HB White đã nhanh chóng chiếm được thiện cảm của người chơi. Giống cá này có màu sắc đen, trắng nổi bật. Phần thân sẽ có màu đen và phần vây có màu trắng. Ngoài ra, so với các giống cá guppy khác thì Guppy HB White dễ nuôi hơn. Chúng được nhận xét là rất khỏe và khả năng sinh sản của nó cũng rất nhanh. Thời gian chăm sóc cũng ít hơn các giống cá cảnh khác.
 Chính vì vậy nhiều người thường lựa chọn Guppy HB White để nuôi. ",4);
insert into products value (42,"Cá Guppy Full Black",110000,"3-4cm","/images/guppy-4.jpg","
Khác với các giống cá guppy bảy màu khác, Full Black sở hữu ngoại hình mới lạ và ưa nhìn. Bất kỳ ai khi nhìn ngắm giống cá cảnh này sẽ đều cảm thấy yêu thích. Bởi hình dáng và màu sắc của chúng rất đặc biệt. 
Đây là giống cá guppy có nguồn gốc xuất xứ từ Thái Lan.
 Hiện nay, tại Việt Nam có rất nhiều người săn lùng giống cá cảnh này để nuôi. ",4);
insert into products value (43,"Cá Guppy Full Gold",130000,"3-4cm","/images/guppy-5.jpg","
Đặc điểm nhận dạng của dòng này cũng giống như tên gọi của chúng. Full Gold toàn thân màu vàng Gold. Màu vàng của kim loại vàng. Các bạn đừng nhầm lẫn với màu vàng yellow.
 Màu vàng Gold sẽ ánh sáng lên khi gặp ánh sáng chiếu vào",4);
insert into products value (44,"Cá Dumbo Red Tail Guppy",120000,"3-4cm","/images/guppy-6.jpg","
Nhắc tới giống cá bảy màu được yêu thích nhất hiện nay không thể không kể tới giống cá Guppy Dumbo Red Tail. Đây là giống cá có vẻ đẹp vô cùng độc đáo và có nét cuốn hút rất riêng. Nó khiến cho những người chơi cá cảnh bị mê mẩn. 
Bởi màu đỏ rực xuyên xuất từ phần vây cá cho tới phần đuôi cá. ",4);
insert into products value (45,"Cá Blue Topaz Guppy ",115000,"3-4cm","/images/guppy-8.jpg","
Mang trên mình bộ đuôi màu xanh của viên ngọc blue topaz . Màu sắc khá hiếm ở các dòng cá. 
Đặc biệt dòng này còn sợ hữu thêm bộ vây lưng Big Dorsal.",4);
insert into products value (46,"Cá Blue Topaz Guppy",100000,"3-4cm","/images/guppy-9.jpg","
Đặc điểm của dòng này là bộ vây đuôi và vây lưng rất đặc biệt. Sỡ dĩ được gọi là HB Red Rose . Red ý nói đuôi cá màu đỏ. 
Rose là hoa hồng ý nối bộ đuôi của dòng này được xếp ly độ nhúng phùng như hoa hồng.",4);
insert into products value (47,"Ốc Táo Vàng",10000,"0.5-1cm","/images/oc-tao-3.jpg","
Ốc táo vàng lần đầu được phát hiện bởi những công nhân tại cảng biển của Đức. Tên tiếng Anh ban đầu của chúng là Planorbarius corneus. Ốc táo vàng sinh sống phổ biến từ châu Âu đến Trung Á. Ban đầu loài vật này có màu đen xám, sau đó do tác động của môi trường, tiến hóa vỏ chúng chuyển thành màu vàng đẹp mắt. 
Từ đây, chúng trở thành loài sinh vật được ưa chuộng nuôi kèm trong bể thủy sinh",7);
insert into products value (48,"Crayfish Đỏ",10000,"1-2cm","/images/tom-canh-3.jpg","
Tôm crayfish có nguồn gốc ngoài tự nhiên, chúng sinh trưởng ngoài tự nhiên thì thông số môi trường sống khác rất xa với môi trường nuôi nhốt trong bể kính hoặc thùng xốp, nồng độ chất độc hại loãng và môi trường sống của tôm crayfish ngoài tự nhiên rất rộng rãi, không gò bó chật hẹp như hồ kính trong phòng. Bởi vậy, để nuôi và giữ được tôm crayfish sống trong môi trường 
nuôi nhốt thì bắt buộc chúng ta phải có một số phương pháp để thuần dưỡng từ từ",7);
insert into products value (49,"Crayfish Xanh",10000,"1-2cm","/images/tom-canh-2.jpg","
Tôm crayfish có nguồn gốc ngoài tự nhiên, chúng sinh trưởng ngoài tự nhiên thì thông số môi trường sống khác rất xa với môi trường nuôi nhốt trong bể kính hoặc thùng xốp, nồng độ chất độc hại loãng và môi trường sống của tôm crayfish ngoài tự nhiên rất rộng rãi, không gò bó chật hẹp như hồ kính trong phòng. Bởi vậy, để nuôi và giữ được tôm crayfish sống trong môi trường 
nuôi nhốt thì bắt buộc chúng ta phải có một số phương pháp để thuần dưỡng từ từ",7);
insert into products value (50,"Crayfish Cam",10000,"1-2cm","/images/tom-canh-1.jpg","
Tôm crayfish có nguồn gốc ngoài tự nhiên, chúng sinh trưởng ngoài tự nhiên thì thông số môi trường sống khác rất xa với môi trường nuôi nhốt trong bể kính hoặc thùng xốp, nồng độ chất độc hại loãng và môi trường sống của tôm crayfish ngoài tự nhiên rất rộng rãi, không gò bó chật hẹp như hồ kính trong phòng. Bởi vậy, để nuôi và giữ được tôm crayfish sống trong môi trường 
nuôi nhốt thì bắt buộc chúng ta phải có một số phương pháp để thuần dưỡng từ từ",7);

insert into products value (51,"Thức Ăn Inve 2/3",15000,"50g","/images/thuc-an-3.jpg","",9);
insert into products value (52,"Thức Ăn Inve 3/5",17000,"50g","/images/thuc-an-2.jpg","",9);
insert into products value (53,"Thức Ăn Inve 5/8",18000,"50g","/images/thuc-an-1.jpg","",9);

 
insert into products value (54,"Đấu trường trang trí",300000,"Large","/images/Trangtri/NPT181_medium.jpg","",8);
insert into products value (55,"Mái vòm trang trí",200000,"Large","/images/Trangtri/NPT180_medium.jpg","",8);
insert into products value (56,"Lâu đài trang trí",250000,"Large","/images/Trangtri/NPT182_medium.jpg","",8);
insert into products value (57,"Vòng trang trí",200000,"Large","/images/Trangtri/NPT185_medium.jpg","",8);
insert into products value (58,"Lạc đà trang trí",200000,"Large","/images/Trangtri/NPT122_medium.jpg","",8);
