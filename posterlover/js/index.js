var DATA = (function() {
	var imgPath = 'img/posters/',
		catagries = {
			SwissStyle: 'Swiss Style',
			Creative: 'Creative',
			Classic: 'Classic',
			Fashion: 'Fashion',
			Music: 'Music',
			Movie: 'Movie',
			Typography: 'Typography',
			All: 'All',

		},
		catagriesCoverImg = {
			SwissStyle: imgPath + 'DasPlakat.jpg',
			Creative: imgPath + 'BandAid.jpg',
			Classic: imgPath + 'BenHur.jpg',
			Fashion: imgPath + 'WardrobeNo3.jpg',
			Music: imgPath + 'BobDylan.jpg',
			Movie: imgPath + 'TheFurious7.jpg',
			Typography: imgPath + 'Einstein.jpg',
			All: imgPath + 'All.jpg'
		};

	var posterData = [{
			posterName: 'Das  Plakat',
			imgPath: [imgPath + 'DasPlakat.jpg'],
			designedFor: 'Kunsthaus Zurich Museum of Switzerland',
			designedForUrl: 'http://www.kunsthaus.ch/en/',
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1953',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: 'Der  Film',
			imgPath: [imgPath + 'DerFilm.jpg'],
			designedFor: 'Kunsthaus Zurich Museum of Switzerland',
			designedForUrl: 'http://www.kunsthaus.ch/en/',
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1960',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: 'The Family  Of Man',
			imgPath: [imgPath + 'TheFamilyOfMan.jpg'],
			designedFor: 'Kunsthaus Zurich Museum of Switzerland',
			designedForUrl: 'http://www.kunsthaus.ch/en/',
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1958',
			catagries: [catagries.SwissStyle]
		},

		{
			posterName: "Giselle",
			imgPath: [imgPath + 'Giselle.jpg'],
			designedFor: 'the Municipal Theater in Basle',
			designedForUrl: 'http://www.theater-basel.ch/index.cfm/7DE69247-AEDD-EB66-36DE79715204C098/?&lang=en',
			designer: 'Armin Hofmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Armin_Hofmann',
			designTime: '1959',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: "Tristan +  Isolde",
			imgPath: [imgPath + 'Tristan+Isolde.jpg'],
			designedFor: 'the Municipal Theater in Basle',
			designedForUrl: 'http://www.theater-basel.ch/index.cfm/7DE69247-AEDD-EB66-36DE79715204C098/?&lang=en',
			designer: 'Armin Hofmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Armin_Hofmann',
			designTime: '1954',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: "Stadttheater  Basel",
			imgPath: [imgPath + 'StadttheaterBasel.jpg'],
			designedFor: 'the Municipal Theater in Basle',
			designedForUrl: 'http://www.theater-basel.ch/index.cfm/7DE69247-AEDD-EB66-36DE79715204C098/?&lang=en',
			designer: 'Armin Hofmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Armin_Hofmann',
			designTime: '1960',
			catagries: [catagries.SwissStyle]
		},

		{
			posterName: 'Musica  Viva',
			imgPath: [imgPath + 'MusicaViva.jpg'],
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1956',
			catagries: [catagries.SwissStyle]
		},

		{
			posterName: 'Henry  Van De  Velde',
			imgPath: [imgPath + 'HenryVanDeVelde.jpg'],
			designedFor: 'Henry van de Velde',
			designedForUrl: 'http://www.henry-van-de-velde.com/',
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1958',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: 'Weniger  Larm',
			imgPath: [imgPath + 'WenigerLarm.jpg'],
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1960',
			catagries: [catagries.SwissStyle]
		},


		{
			posterName: "SOS  Kinderdorf",
			imgPath: [imgPath + 'SOSKinderdorf.jpg'],
			designedFor: "SOS children's villages",
			designedForUrl: 'http://www.sos-childrensvillages.org/',
			designer: 'Armin Hofmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Armin_Hofmann',
			designTime: '1989',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: "Die Schweiz  Zur Roemer Zeit",
			imgPath: [imgPath + 'DieSchweizZurRoemerZeit.jpg'],
			designedFor: "Die Schweiz Zur Roemer Zeit",
			designedForUrl: 'http://de.wikipedia.org/wiki/Die_Schweiz_in_r%C3%B6mischer_Zeit',
			designer: 'Armin Hofmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Armin_Hofmann',
			designTime: '1989',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: "GM",
			imgPath: [imgPath + 'GM.jpg'],
			designedFor: "Ausstellungen Bibliotthek Sammlungen",
			designer: 'Armin Hofmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Armin_Hofmann',
			designTime: '1989',
			catagries: [catagries.SwissStyle]
		},


		{
			posterName: "Protégez  L'enfant",
			imgPath: [imgPath + "ProtegezLenfant.jpg"],
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1953',
			catagries: [catagries.SwissStyle]
		},

		{
			posterName: 'Juni-  Festwochen  Zürich',
			imgPath: [imgPath + 'Juni-FestwochenZurich.jpg'],
			designedFor: 'the Schauspielhaus Zuris of Switzerland',
			designedForUrl: 'http://www.schauspielhaus.ch/home',
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1959',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: 'Internationale  Juni-  Festwochen',
			imgPath: [imgPath + 'InternationaleJuni-Festwochen.jpg'],
			designedFor: 'the Schauspielhaus Zuris of Switzerland',
			designedForUrl: 'http://www.schauspielhaus.ch/home',
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1962',
			catagries: [catagries.SwissStyle]
		}, {
			posterName: 'Opernhaus  Zürich',
			imgPath: [imgPath + 'OpernhausZurich.jpg'],
			designedFor: 'Opernhaus  Zürich',
			designedForUrl: 'http://www.opernhaus.ch/',
			designer: 'Josef Müller-Brockmann',
			designerUrl: 'http://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
			designTime: '1968',
			catagries: [catagries.SwissStyle]
		},



		{
			posterName: 'The  Furious',
			imgPath: [imgPath + 'TheFurious7.jpg'],
			designedFor: 'the movie Furious 7 - "One Last Ride"',
			designedForUrl: 'http://www.fastandfurious7film.com/ww/',
			designTime: '2015',
			catagries: [catagries.Movie]
		}, {
			posterName: 'August:  Osage  County',
			imgPath: [imgPath + 'AugustOsageCounty.jpg'],
			designedFor: 'the movie August: Osage County',
			designedForUrl: 'http://www.imdb.com/title/tt1322269/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'The  Grand Budapest  Hotel',
			imgPath: [imgPath + 'TheGrandBudapestHotel.jpg'],
			designedFor: 'the movie The Grand Budapest Hotel',
			designedForUrl: 'http://www.imdb.com/title/tt2278388/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'The  Kings  Of Summer',
			imgPath: [imgPath + 'TheKingsOfSummer.jpg'],
			designedFor: 'the movie The Kings Of Summer',
			designedForUrl: 'http://thekingsofsummermovie.com/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Gravity',
			imgPath: [imgPath + 'Gravity.jpg', imgPath + 'Gravity2.jpg'],
			designedFor: 'the movie Gravity',
			designedForUrl: 'http://gravitymovie.warnerbros.com/#/home',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'The Fault  In Our Stars',
			imgPath: [imgPath + 'TheFaultinOurStars.jpg', imgPath + 'TheFaultinOurStars2.jpg'],
			designedFor: 'the movie The Fault in Our Stars',
			designedForUrl: 'http://thefaultinourstarsmovie.com/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'X-Men',
			imgPath: [imgPath + 'X-MenDaysofFuturePast1.jpg', imgPath + 'X-MenDaysofFuturePast2.jpg'],
			designedFor: 'the movie X-Men: Days Of Future Past',
			designedForUrl: 'http://www.x-menmovies.com/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'This Is  The End',
			imgPath: [imgPath + 'ThisIstheEnd.jpg'],
			designedFor: 'the movie This Is The End',
			designedForUrl: 'http://www.thisistheend.com/site/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Spider-Man',
			imgPath: [imgPath + 'TheAmazingSpider-Man2.jpg'],
			designedFor: 'the movie The Amazing Spider-Man 2',
			designedForUrl: 'http://www.sonypictures.com/movies/theamazingspiderman2/site/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Now You  See Me',
			imgPath: [imgPath + 'NowYouSeeMe.jpg'],
			designedFor: 'the movie Now You See Me',
			designedForUrl: 'http://www.nowyouseememovie.com/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'R.I.P.D.',
			imgPath: [imgPath + 'R.I.P.D..jpg'],
			designedFor: 'the movie R.I.P.D.',
			designedForUrl: 'http://www.imdb.com/title/tt0790736/',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'The  Conjuring',
			imgPath: [imgPath + 'TheConjuring.jpg'],
			designedFor: 'the movie The Conjuring',
			designedForUrl: 'http://theconjuring.warnerbros.com/index.html',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Sin  City',
			imgPath: [imgPath + 'SinCity.jpg'],
			designedFor: 'the movie Sin City.',
			designedForUrl: 'http://www.miramax.com/movie/frank-millers-sin-city/',
			designer: '',
			designTime: '',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Snow White  And  The Huntsman',
			imgPath: [imgPath + 'SnowWhiteandtheHuntsman.jpg'],
			designedFor: 'the movie Snow White And The Huntsman ',
			designedForUrl: 'http://www.snowwhiteandthehuntsman.com/',
			designer: '',
			designTime: '2012',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Battle Of  The Five Armies',
			imgPath: [imgPath + 'BattleOfTheFiveArmies.jpg'],
			designedFor: 'the movie Battle Of The Five Armies',
			designedForUrl: 'http://www.thehobbit.com/',
			designer: '',
			designTime: '',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Little  Miss  Sunshine',
			imgPath: [imgPath + 'LittleMissSunshine.jpg'],
			designedFor: 'the movie Little Miss Sunshine',
			designedForUrl: 'http://www.imdb.com/title/tt0449059/',
			designer: '',
			designTime: '2006',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Dallas  Buyers Club ',
			imgPath: [imgPath + 'DallasBuyersClub.jpg', imgPath + 'DallasBuyersClub2.jpg'],
			designedFor: 'the movie Dallas Buyers Club',
			designedForUrl: 'http://www.focusfeatures.com/dallas_buyers_club',
			designer: '',
			designTime: '2013',
			catagries: [catagries.Movie]
		}, {
			posterName: 'The  Blues Brothers',
			imgPath: [imgPath + 'TheBluesBrothers.jpg'],
			designedFor: 'the movie The Blues Brothers',
			designedForUrl: 'http://bluesbrothersofficialsite.com/',
			designer: '',
			designTime: '',
			catagries: [catagries.Movie]
		}, {
			posterName: '12 Years  A Slave',
			imgPath: [imgPath + '12YearsASlave.jpg'],
			designedFor: 'the movie 12 Years A Slave',
			designedForUrl: 'http://www.12yearsaslave.com/',
			designer: '',
			designTime: '2014',
			catagries: [catagries.Movie]
		}, {
			posterName: 'Kill  Bill',
			imgPath: [imgPath + 'KillBill.jpg'],
			designedFor: 'the movie Kill Bill Vol 1',
			designedForUrl: 'http://www.miramax.com/movie/kill-bill-volume-1/',
			designer: 'by Gianmarco Magnani',
			designTime: '',
			catagries: [catagries.Movie]
		},


		{
			posterName: 'Her',
			imgPath: [imgPath + 'Her.jpg'],
			designedFor: 'the movie Her',
			designedForUrl: 'http://www.herthemovie.com/#/home',
			designer: 'Spike Jonze',
			designTime: '',
			catagries: [catagries.Movie]
		},

		{
			posterName: 'Wardrobe  No. 3',
			imgPath: [imgPath + 'WardrobeNo3.jpg'],
			designedFor: 'the Yesterdayskin Wardrobe no. 3',
			designedForUrl: 'http://www.the-yesterdayskin.com/index.php?pg=pages-default-news',
			designer: 'Rraay Lai',
			designTime: '',
			catagries: [catagries.Fashion]
		}, {
			posterName: 'Node',
			imgPath: [imgPath + 'Node.jpg'],
			designedFor: 'Node | Magazine Cover',
			designedForUrl: 'https://nodemagazine.wordpress.com/',
			designer: 'Abby Chen',
			designerUrl: 'https://www.behance.net/abbychen',
			designTime: '',
			catagries: [catagries.Fashion]
		}, {
			posterName: 'Kentic  Fashion Brochure',
			imgPath: [imgPath + 'KenticFashionBrochure.jpg'],
			designedFor: '',
			designedForUrl: '',
			designer: 'Lewis Mclean',
			designerUrl: 'https://www.behance.net/LewisMclean',
			designTime: '',
			catagries: [catagries.Fashion]
		},

		{
			posterName: 'Ignored  Everyday',
			imgPath: [imgPath + 'IgnoredEveryday.jpg', imgPath + 'IgnoredEveryday2.jpg', imgPath + 'IgnoredEveryday3.jpg'],
			designedFor: 'Ignored Everyday',
			designedForUrl: '',
			designer: 'Melanie Scott Vincent',
			designerUrl: 'https://www.behance.net/Melaniescottvincent',
			designTime: '2013',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Parship',
			imgPath: [imgPath + 'Parship.jpg'],
			designedFor: 'PARSHIP website',
			designedForUrl: 'https://parship.com/',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'BAND-AID',
			imgPath: [imgPath + 'BandAid.jpg'],
			designedFor: 'BAND-AID products',
			designedForUrl: 'http://www.band-aid.com/',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Nivea Night',
			imgPath: [imgPath + 'Nivea.jpg'],
			designedFor: 'Nivea Night products',
			designedForUrl: 'http://www.niveausa.com/',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Canon',
			imgPath: [imgPath + 'Canon.jpg'],
			designedFor: 'Canon Company',
			designedForUrl: 'http://www.canon.com/',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Nescafe',
			imgPath: [imgPath + 'nescafe.jpg'],
			designedFor: 'NESCAFE',
			designedForUrl: 'https://www.nescafe.com/',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'More  Pull',
			imgPath: [imgPath + 'MorePull.jpg'],
			designedFor: 'LAND ROVER',
			designedForUrl: 'http://www.landroverusa.com/index.html',
			designer: '',
			designerUrl: '',
			designTime: '2007',
			catagries: [catagries.Creative]
		}, {
			posterName: "We're  Efficient",
			imgPath: [imgPath + 'WereEfficient.jpg'],
			designedFor: 'Volkswagen International',
			designedForUrl: 'http://en.volkswagen.com/en.html',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Transport  For London',
			imgPath: [imgPath + 'TransportForLondon.jpg'],
			designedFor: '150 years of London transport',
			designedForUrl: 'https://tfl.gob.uk/tube150',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Smoking  Unborn Baby',
			imgPath: [imgPath + 'SmokingUnBornBaby.jpg'],
			designedFor: '',
			designedForUrl: '',
			designer: 'Jonathon Brown',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Think Of  Both Sides',
			imgPath: [imgPath + 'ThinkOfBothSides.jpg'],
			designedFor: '',
			designedForUrl: '',
			designer: 'Red Pepper',
			designerUrl: 'http://redpr.ru/',
			designTime: '2013',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Criminal  Underworld',
			imgPath: [imgPath + 'CriminalUnderworld.jpg'],
			designedFor: 'the movie criminal underworld',
			designedForUrl: '',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Taxi  Driver',
			imgPath: [imgPath + 'TaxiDriver.jpg'],
			designedFor: 'the movie TAXI DRIVER',
			designedForUrl: 'http://www.imdb.com/title/tt0075314/',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'She & Him',
			imgPath: [imgPath + 'SheHim.jpg'],
			designedFor: 'music band She and Him',
			designedForUrl: 'http://www.sheandhim.com/',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Creative, catagries.Music]
		}, {
			posterName: 'Freedom  Of Speech',
			imgPath: [imgPath + 'FreedomOfSpeech.jpg'],
			designedFor: 'Shu-Te University',
			designedForUrl: 'http://www.vcd.stu.edu.tw/main.php',
			designer: 'Pei-Ling Ou',
			designerUrl: '',
			designTime: '2013',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Lego',
			imgPath: [imgPath + 'Lego.jpg', imgPath + 'Lego2.jpg'],
			designedFor: 'Lego Company',
			designedForUrl: '',
			designer: 'Red Pepper',
			designerUrl: 'http://www.lego.com/',
			designTime: '',
			catagries: [catagries.Creative]
		}, {
			posterName: 'Festival  Parallele',
			imgPath: [imgPath + 'FesticvalParallele.jpg'],
			designedFor: 'Festival Parallele',
			designedForUrl: 'http://www.festicvalparallele.com',
			designer: '',
			designTime: '2014',
			catagries: [catagries.Typography]
		}, {
			posterName: 'The Show',
			imgPath: [imgPath + 'TheShow.jpg'],
			designedFor: 'UW Design 2012',
			designedForUrl: 'http://www.uwdesign2012.com/',
			designer: '',
			designTime: '',
			catagries: [catagries.Typography]
		}, {
			posterName: 'Oktoberfast',
			imgPath: [imgPath + 'Oktoberfast.jpg'],
			designedFor: '',
			designedForUrl: '',
			designer: 'Jeff Harder',
			designTime: '2013',
			catagries: [catagries.Typography]
		}, {
			posterName: 'Einstein',
			imgPath: [imgPath + 'Einstein.jpg'],
			designedFor: 'Albert Einstein',
			designedForUrl: 'https://en.wikipedia.org/wiki/Albert_Einstein',
			designer: '',
			designTime: '',
			catagries: [catagries.Typography]
		}, {
			posterName: 'Superman',
			imgPath: [imgPath + 'Superman.jpg'],
			designedFor: 'super hero - Superman',
			designedForUrl: 'https://en.wikipedia.org/wiki/Superman',
			designer: '',
			designTime: '',
			catagries: [catagries.Typography]
		},

		{
			posterName: 'Joker',
			imgPath: [imgPath + 'Joker.jpg'],
			designedFor: 'Joker in the movie Batman',
			designedForUrl: '',
			designer: '',
			designTime: '',
			catagries: [catagries.Typography]
		}, {
			posterName: "Sing In  The Rain",
			imgPath: [imgPath + 'SingInTheRain.jpg'],
			designedFor: 'music film Sing In The Rain',
			designedForUrl: 'http://www.imdb.com/title/tt0045152/soundtrack',
			designer: '',
			designTime: '',
			catagries: [catagries.Music]
		}, {
			posterName: "It's  Midnight",
			imgPath: [imgPath + 'ItsMidnight.jpg'],
			designedFor: 'St. Paul And The Broken Bones Midpoint music festival',
			designedForUrl: '',
			designer: '',
			designTime: '',
			catagries: [catagries.Music]
		}, {
			posterName: "V - Festival",
			imgPath: [imgPath + 'VFestival.jpg', imgPath + 'VFestival2.jpg'],
			designedFor: 'V-Festival',
			designedForUrl: 'http://www.vfestival.com/',
			designer: 'Stahl R',
			designerUrl: 'http://stahl-r.com/',
			designTime: '2015',
			catagries: [catagries.Music]
		}, {
			posterName: "Bob  Dylan",
			imgPath: [imgPath + 'BobDylan.jpg'],
			designedFor: 'music start Bob Dylan',
			designedForUrl: 'http://www.bobdylan.com/us/home',
			designer: 'Adam Larson',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Music]
		}, {
			posterName: "Miles David",
			imgPath: [imgPath + 'MilesDavid.jpg'],
			designedFor: 'jass musician Miles David',
			designedForUrl: 'https://en.wikipedia.org/wiki/Miles_Davis',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Music]
		}, {
			posterName: "The  Beatles",
			imgPath: [imgPath + 'TheBeatles.jpg'],
			designedFor: 'music brand the Beatles',
			designedForUrl: 'http://www.thebeatles.com/',
			designer: 'WordsCouncil',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Music]
		}, {
			posterName: "Singer",
			imgPath: [imgPath + 'Singer.jpg'],
			designedFor: 'Singer Sewing Machine ',
			designedForUrl: 'http://www.thebeatles.com/',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Classic]
		}, {
			posterName: "Pin-Up  Wings",
			imgPath: [imgPath + 'PinUpWings.jpg'],
			designedFor: 'Pin-Up Wings',
			designedForUrl: '',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Classic]
		}, {
			posterName: "Coca  Cola",
			imgPath: [imgPath + 'CocaCola.jpg'],
			designedFor: 'Coca Cola Company',
			designedForUrl: '',
			designer: '',
			designerUrl: '',
			designTime: '1939',
			catagries: [catagries.Classic]
		}, {
			posterName: "BEN - HUR",
			imgPath: [imgPath + 'BenHur.jpg'],
			designedFor: 'the Movie BEN_HUR',
			designedForUrl: 'https://en.wikipedia.org/wiki/Ben-Hur_(1959_film)',
			designer: '',
			designerUrl: '',
			designTime: '1959',
			catagries: [catagries.Classic, catagries.Movie]
		}, {
			posterName: "Gone  With The Wind",
			imgPath: [imgPath + 'GoneWithTheWind.jpg'],
			designedFor: 'the Movie Gone with the wind',
			designedForUrl: 'https://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)',
			designer: '',
			designerUrl: '',
			designTime: '1939',
			catagries: [catagries.Classic, catagries.Movie]
		}, {
			posterName: "Roman  Holiday",
			imgPath: [imgPath + 'RomanHoliday.jpg'],
			designedFor: 'the movie Roman Holiday',
			designedForUrl: 'http://www.imdb.com/title/tt0046250/',
			designer: '',
			designerUrl: '',
			designTime: '1953',
			catagries: [catagries.Classic, catagries.Movie]
		}, {
			posterName: "King Kong",
			imgPath: [imgPath + 'KingKong.jpg', imgPath + "KingKong2.jpg"],
			designedFor: 'the Movie King kong',
			designedForUrl: 'http://www.imdb.com/title/tt0046250/',
			designer: '',
			designerUrl: '',
			designTime: '1933',
			catagries: [catagries.Classic, catagries.Movie]
		}, {
			posterName: "Kool  Cigarettes",
			imgPath: [imgPath + 'KoolCigarettes.jpg'],
			designedFor: 'mild menthol kool cigarettes',
			designedForUrl: '',
			designer: '',
			designerUrl: '',
			designTime: '',
			catagries: [catagries.Classic]
		}, {
			posterName: "Attack Of  The 50 Ft. Woman",
			imgPath: [imgPath + 'AttackOfThe50FtWoman.jpg'],
			designedFor: 'the movie Attack of the 50 ft. Woman',
			designedForUrl: 'http://www.imdb.com/title/tt0051380/',
			designer: '',
			designerUrl: '',
			designTime: '1958',
			catagries: [catagries.Classic, catagries.Movie]
		}, {
			posterName: "It's A  Wonderful Life",
			imgPath: [imgPath + 'ItsAWonderfulLife.jpg'],
			designedFor: 'the movie Attack of the 50 ft. Woman',
			designedForUrl: 'http://www.imdb.com/title/tt0038650/',
			designer: '',
			designerUrl: '',
			designTime: '1946',
			catagries: [catagries.Classic, catagries.Movie]
		}
	];
	return {
		posterData: posterData,
		catagries: catagries,
		catagriesCoverImg: catagriesCoverImg
	}

})();

var DATA_MAKER = (function() {

	var initPosterData = (function() {

		var getPosters = function(posterData, pageSize, catagry) {

			var countPage = function(posters, pageSize) {
				var pageSize = pageSize,
					length = posters.length,
					totalPage = Math.ceil(length / pageSize);

				var postersWithPage = [];

				for (var i = 0; i < totalPage; i++) {
					var thisPagePosters = [];
					for (var j = i * pageSize; j < i * pageSize + pageSize; j++) {
						if (posters[j]) {
							posters[j].page = i + 1;
							thisPagePosters.push(posters[j]);
						};
					};
					postersWithPage.push({
						page: i + 1,
						totalPage: totalPage,
						data: thisPagePosters
					});
				};
				return {
					totalLength: length,
					posters: postersWithPage
				};
			};

			var posters = [];

			if (catagry == 'All') {
				posters = posterData;
			} else {
				posterData.map(function(ele) {
					var belongsCatagry = false;

					ele.catagries.forEach(function(value) {
						if (value == catagry) {
							belongsCatagry = true;
							return false;
						};
					});
					if (belongsCatagry) {
						posters.push(ele);
					};

				});
			};
			return countPage(posters, pageSize);
		};



		return function(posterData, pageSize, catagries) {
			var exportData = {},
				posterLengths = [],
				fillContent = function(catagryName, catagry) {
					var postersData = getPosters(posterData, pageSize, catagry);
					exportData[catagryName] = postersData.posters;
					posterLengths.push(postersData.totalLength);
				};
			for (var i in catagries) {
				fillContent(i, catagries[i]);
			};

			return {
				posters: exportData,
				catagriesLengths: posterLengths
			};
		};

	})();

	var initCatagries = function(catagries, catagriesCoverImg, catagriesLengths) {
		var catagriesArr = [],
			catagriesImgArr = [];
		for (var i in catagries) {
			catagriesArr.push(catagries[i]);
			catagriesImgArr.push(catagriesCoverImg[i]);
		};
		var length = catagriesArr.length,
			halfLength = Math.floor(length / 2);
		var catagries_1 = [],
			catagries_2 = [];
		for (var i = 0; i < halfLength; i++) {
			catagries_1.push({
				catagry: catagriesArr[i],
				catagryImg: catagriesImgArr[i],
				length: catagriesLengths[i]
			});
		};
		for (var j = halfLength; j < length; j++) {
			catagries_2.push({
				catagry: catagriesArr[j],
				catagryImg: catagriesImgArr[j],
				length: catagriesLengths[j]
			});
		};
		return [catagries_1, catagries_2];
	};



	var posterData = initPosterData(DATA.posterData, 10, DATA.catagries),
		postersObj = posterData.posters,
		catagriesLengths = posterData.catagriesLengths,
		catagriesArr = initCatagries(DATA.catagries, DATA.catagriesCoverImg, catagriesLengths);


	return {
		catagries: catagriesArr,
		getPosters: function(query) {
			if (query.unique) {
				var unique = query.unique;

				var catagry = decodeURIComponent(unique.catagry).replace(/ /g, ''),
					page = parseInt(unique.page),
					name = decodeURIComponent(unique.name).replace(/\\/g, ''),
					catagryPosters = postersObj[catagry][parseInt(page) - 1],
					targetPoster = null;

				catagryPosters.data.forEach(function(value) {
					if (value.posterName == name) {
						targetPoster = value;
						return false;
					};
				});

				var commonPosters = postersObj[catagry][0],
					newPostersArr = commonPosters.data.map(function(ele) {
						return ele;
					});

				targetPoster ? newPostersArr.unshift(targetPoster) : '';

				return {
					page: commonPosters.page,
					totalPage: commonPosters.totalPage,
					data: newPostersArr
				};

			} else {
				var catagry = decodeURIComponent(query.catagry).replace(/ /g, ''),
					page = parseInt(query.page);
				return postersObj[catagry][page - 1];
			};
		}
	};
})();


var POSTERLOVER = (function() {
	var
		$win = $(window),
		$doc = $(document),
		$body = $('body'),
		$main = $('#main'),
		$form = $('#form'),
		getScrollLeft = function() {
			return $win.scrollLeft();
		},



		Data = (function() {
			var constant = {
					getPostersDataPath: '/getPosterData',
					postMessagePath: '/users/postMessage'
				},
				getPostersData = (function() {
					var ajaxMark = null,
						catagry = null,
						page = 1,
						totalPage = Infinity,
						loadData = function(data, isNewKind) {

							// ajaxMark ? ajaxMark.abort() : '';

							// ajaxMark=$.ajax({
							// 	url:constant.getPostersDataPath,
							// 	data:{catagry:catagry,page:page,unique:data.unique},
							// 	dataType:'json',
							// 	beforeSend:function(){
							// 		data.beforeLoading && data.beforeLoading(catagry);
							// 	}
							// })
							// .done(function(value){
							// 	totalPage=value.totalPage;
							// 	data.success && data.success(value.data);
							// 	if(page>=totalPage){
							// 		data.loadComplete && data.loadComplete(catagry);
							// 	};
							// })
							// .fail(function(value){
							// 	data.fail && data.fail(catagry);
							// })
							// .always(function(value){
							// 	data.always && data.always(value);
							// });

							ajaxMark ? clearTimeout(ajaxMark) : ''
							data.beforeLoading && data.beforeLoading(catagry)
							ajaxMark = setTimeout(function() {
								var value = DATA_MAKER.getPosters({
									catagry: catagry,
									page: page,
									unique: data.unique
								})
								totalPage = value.totalPage;
								data.success && data.success(value.data);
								if (page >= totalPage) {
									data.loadComplete && data.loadComplete(catagry);
								}
								data.always && data.always(value)
							}, 1000)
						},
						getData = function(data) {
							if (data.catagry) {
								catagry = data.catagry;
								page = 1;
								totalPage = Infinity;
								loadData(data);
							} else {
								if (page < totalPage) {
									page += 1;
									loadData(data, true);
								};
							};
						};
					return getData;
				})(),
				postMessage = function(data) {
					// $.ajax({
					// 	url:constant.postMessagePath,
					// 	data:data,
					// 	dataType:'json',
					// 	beforeSend:function(){
					// 		data.beforeSend && data.beforeSend();
					// 	}
					// })
					// .done(function(value){
					// 	data.success && data.success(value);
					// })
					// .fail(function(value){
					// 	data.fail && data.fail(value);
					// });
					setTimeout(function() {
						data.success && data.success()
					}, 500)
				};
			return {
				getPostersData: getPostersData,
				postMessage: postMessage
			};
		})(),

		Render = (function() {
			var
				$catagries = $('.catagries'),
				$posters = $('.posters'),
				$about = $('.about'),
				$info = $('#info'),

				template = (function() {
					var posterCatagries = (function() {
						return function(catagries) {
							return catagries.map(function(value) {
								return [
									'<ul>',
									value.map(function(catagry) {
										return [
											'<li catagry="' + catagry.catagry + '">',
											'<img src="' + catagry.catagryImg + '"  alt="' + catagry.catagry + ' posters cover image"/>',
											'<div class="article">',
											'<h1>' + catagry.catagry + '</h1>',
											'<p>' + catagry.length + ' posters</p>',
											'</div>',
											'</li>'
										].join('')
									}).join(''),
									'</ul>'
								].join('')
							}).join('')
						}
					})();
					var posterFigures = (function() {
						var figure = function(data) {
							var imgStr = '';
							for (var i = 0; i < data.imgPath.length; i++) {
								imgStr += '<img src="' + data.imgPath[i] + '" alt="' + data.posterName + '"/>';
							};
							return [
								'<div class="figure hide" page="' + data.page + '" name="' + data.posterName + '">',
								imgStr,
								'<div class="article">',
								'<h1>' + data.posterName.replace(/  /g, ' <br>') + '</h1>',
								'<p>Designed',
								data.designedFor ? ('<span> for ' + (data.designedForUrl ? '<a target="_blank" href="' + data.designedForUrl + '">' + data.designedFor + '</a>' : data.designedFor) + '</span>') : '',
								data.designer ? ('<span> by ' + (data.designerUrl ? '<a target="_blank" href="' + data.designerUrl + '">' + data.designer + '</a>' : data.designer) + '</span>') : '',
								data.designTime ? '<span> in ' + data.designTime + '.</span>' : '',
								'</p>',
								'<ul class="clear share">',
								'<li title="Share this poster on facebook">facebook</li>',
								'<li title="Share this poster on weibo">weibo</li>',
								'<li title="Share this poster on huaban">huaban</li>',
								'<li title="Share this poster on pinterest">pinterest</li>',
								'</ul>',
								'</div>',
								'</div>'
							].join('');
						};
						return function(dataArr) {
							var tempStr = '';
							for (var i = 0; i < dataArr.length; i++) {
								tempStr += figure(dataArr[i]);
							};
							return tempStr;
						};
					})();
					return {
						posterCatagries:posterCatagries,
						posterFigures: posterFigures
					};
				})(),

				dom = (function() {
					var $infoText = $info.find('h1'),
						$postInfo = $form.find('.submit'),
						$catagries=$('#main .catagries'),
						appendCatagries=function(data){
							$catagries.html(template.posterCatagries(data))
						},
						appendPosters = function(data) {
							$(template.posterFigures(data)).insertBefore($info);
						},
						removePosters = function() {
							$posters.children('.figure:not(#info)').remove();
						},
						loadingPosters = function(catagry) {
							$infoText.html('Loading<br>' + catagry.replace(/%20/g, ' ') + '<br>Posters');
						},
						loadingComplete = function(catagry) {
							$infoText.html(catagry.replace(/%20/g, ' ') + '</br>Posters</br>Loaded.</br>More Coming Soon!');
						},
						loadingFail = function(catagry) {
							$infoText.html('Loading<br>' + catagry.replace(/%20/g, ' ') + '<br>Posters<br>Failed');
						},
						postFail = function() {
							$postInfo.text('Woops! Post Failed! Try Again.');
						},
						postSuccess = function() {
							$postInfo.text('Post Successed!');
							setTimeout(function() {
								$form.text('Thanks For Your Message!');
							}, 1000);
						},
						posting = function() {
							$postInfo.text('...');
						},
						notValidName = function() {
							$postInfo.text('Please fill in name.');
						},
						notValidEmail = function() {
							$postInfo.text('Not valid email');
						},
						notValidMessage = function() {
							$postInfo.text('Please fill in message.');
						};
					return {
						appendCatagries: appendCatagries,
						appendPosters: appendPosters,
						removePosters: removePosters,
						loadingPosters: loadingPosters,
						loadingComplete: loadingComplete,
						loadingFail: loadingFail,
						postFail: postFail,
						postSuccess: postSuccess,
						posting: posting,
						notValidName: notValidName,
						notValidEmail: notValidEmail,
						notValidMessage: notValidMessage
					};
				})(),

				style = (function() {
					var
						prefixCss = function($selector, style, value) {
							var prefix = ['-webkit-', '-moz-', '-khtml-', '-ms-', '-o-', ''],
								prefixStyle = {};
							for (var i = 0; i < prefix.length; i++) {
								prefixStyle[prefix[i] + style] = value;
							};
							$selector.css(prefixStyle);
						},
						setScrollLeft = function(left) {
							$win.scrollLeft(left);
						},

						postersVisible = function() {
							return $main.hasClass('showPosters');
						},

						scrollPage = function(direction) {
							var distance = 100;
							direction < 0 ? setScrollLeft(getScrollLeft() + distance) : setScrollLeft(getScrollLeft() - distance);
						},

						changeView = (function() {
							var $catagriesTag = $('a[view="catagries"]'),
								$postersTag = $('a[view="posters"]'),
								$aboutTag = $('a[view="about"]'),
								postersScrollLeft = 0,
								showModule = function(data) {
									Trigger.offScrollLoad();
									var winScrollLeft = getScrollLeft();
									if (!data.showPosters && postersVisible()) {
										postersScrollLeft = winScrollLeft;
										data.$module.css('margin-left', winScrollLeft);
									} else {
										data.$module.siblings('.catagries,.about').css('margin-left', postersScrollLeft - getScrollLeft());
										setScrollLeft(postersScrollLeft);
									};

									data.$module.removeClass('overHidden');

									setTimeout(function() {
										if (!data.showPosters) {
											setScrollLeft(0);
											data.$module.css('margin-left', 0);
										} else {
											data.resetScroll ? setScrollLeft(0) : '';
											setTimeout(function() {
												Trigger.bindScrollLoad();
											}, data.timer);
										};
										data.$module.siblings('.catagries,.posters,.about').addClass('overHidden');
										data.$module.siblings('.catagries,.about').css('margin-left', 0);

									}, data.timer);
								},

								selectTag = function($tag) {
									$tag.addClass('selected').siblings('.viewControl').removeClass('selected');
								};

							return function(view, resetScroll) {
								var timer = 500;
								switch (view) {
									case 'catagries':
										selectTag($catagriesTag);
										showModule({
											$module: $catagries,
											timer: timer
										});
										$main.addClass('showCatagries').removeClass('showPosters').removeClass('showAbout');
										break;
									case 'about':
										selectTag($aboutTag);
										showModule({
											$module: $about,
											timer: timer
										});
										$main.addClass('showAbout').removeClass('showCatagries').removeClass('showPosters');
										break;
									default:
										selectTag($postersTag);
										showModule({
											$module: $posters,
											timer: timer,
											showPosters: true,
											resetScroll: resetScroll
										});
										$main.addClass('showPosters').removeClass('showCatagries').removeClass('showAbout');
								};
							};
						})(),
						setTransOrigin = function() {
							if (postersVisible()) {
								prefixCss($posters, 'transform-origin', getScrollLeft() + $win.width() / 2 + 'px 0');
							};
						},
						selectCatagry = function($selector) {
							$catagries.find('li').removeClass('selected');
							$selector.addClass('selected');
						},
						showInfo = function() {
							$info.addClass('show');
						},
						hideInfo = function() {
							$info.removeClass('show');
						},
						showPosterFigures = function() {
							$posters.find('.figure.hide').removeClass('hide');
						},
						posting = function() {
							$form.addClass('posting');
						},
						postFail = function() {
							$form.removeClass('posting').addClass('postFailed');
						},
						postSuccess = function() {
							$form.removeClass('posting').removeClass('postFailed').addClass('postSucced');
						},
						showForm = function() {
							$('html,body').animate({
								'scrollLeft': $form.offset().left
							}, 500);
						};

					return {
						scrollPage: scrollPage,
						changeView: changeView,
						setTransOrigin: setTransOrigin,
						selectCatagry: selectCatagry,
						showInfo: showInfo,
						hideInfo: hideInfo,
						showPosterFigures: showPosterFigures,
						posting: posting,
						postFail: postFail,
						postSuccess: postSuccess,
						showForm: showForm
					};
				})();

			return {
				scrollPage: style.scrollPage,
				changeView: style.changeView,
				setTransOrigin: style.setTransOrigin,
				appendCatagries:dom.appendCatagries,
				activeCatagry: function($selector) {
					style.selectCatagry($selector);
					dom.removePosters();
					style.changeView('posters', true);
				},
				loadingPosters: function(catagry) {
					style.showInfo();
					dom.loadingPosters(catagry);
				},
				loadingSuccess: function(data) {
					style.hideInfo();
					dom.appendPosters(data);
					setTimeout(function() {
						style.showPosterFigures();
					}, 1);
				},
				loadingFail: function(catagry) {
					style.showInfo();
					dom.loadingFail(catagry);
				},
				loadingComplete: function(catagry) {
					style.showInfo();
					dom.loadingComplete(catagry);
				},
				posting: function() {
					dom.posting();
					style.posting();
				},
				postFail: function() {
					dom.postFail();
					style.postFail();
				},
				postSuccess: function() {
					dom.postSuccess();
					style.postSuccess();
				},
				notValidName: dom.notValidName,
				notValidEmail: dom.notValidEmail,
				notValidMessage: dom.notValidMessage,
				showForm: style.showForm
			};
		})(),

		Trigger = (function() {
			var
				offScrollLoad = function() {
					$win.off('scroll.loadPosters');
				},
				loadPosters = function($catagry, catagry, unique) {
					Render.activeCatagry($catagry);
					Data.getPostersData({
						catagry: catagry,
						beforeLoading: Render.loadingPosters,
						success: Render.loadingSuccess,
						fail: Render.loadingFail,
						loadComplete: Render.loadingComplete,
						unique: unique
					});
				},
				bindScrollLoad = function() {
					var scrollLoadAble = true,
						loadDistance = 300;
					$win.on('scroll.loadPosters', function() {
						if (scrollLoadAble) {
							if ($doc.width() - getScrollLeft() - $win.width() <= loadDistance) {
								Data.getPostersData({
									beforeLoading: function(catagry) {
										Render.loadingPosters(catagry);
										scrollLoadAble = false;
									},
									success: Render.loadingSuccess,
									fail: Render.loadingFail,
									always: function() {
										scrollLoadAble = true;
									},
									loadComplete: Render.loadingComplete
								});
							};
						};
					});
				},
				bindClickLoad = function() {
					$body.on('click.loadPosters', 'li[catagry]', function() {
						var $this = $(this),
							catagry = $this.attr('catagry');
						loadPosters($this, catagry);
						history.pushState ? history.pushState({
							view: 'posters'
						}, '', 'posters.posterlover') : '';
					});
				},
				bindMouseWheel = function() {
					$body.on('mousewheel.scrollPage', function(event) {
						event.preventDefault();
						Render.scrollPage(event.deltaY);
					});
				},
				bindViewControl = function() {
					$body.on('click.changeView', '.viewControl', function() {
						var view = $(this).attr('view');
						Render.changeView(view);
						history.pushState ? history.pushState({
							view: view
						}, '', view + '.posterlover') : '';
					});
					if (history.pushState) {
						$win.on('popstate.changeView', function() {
							var view = history.state ? history.state.view : 'posters.posterlover';
							Render.changeView(view.replace('.posterlover', ''));
						});
					};
				},
				bindTransOriginSet = function() {
					$win.on('scroll.setTransOrigin', function() {
						Render.setTransOrigin();
					});
				},
				bindPostMessage = (function() {
					var $name = $form.find('.userName'),
						$email = $form.find('.userEmail'),
						$message = $form.find('textarea'),
						trimScript = function(str) {
							return str.replace(/</g, '').replace(/>/g, '');
						},
						trimBothSideSpace = function(str) {
							return str.replace(/(^\s*)|(\s*$)/g, "");
						},
						trimDoubleSpace = function(str) {
							return str.replace(/\s\s/g, '');
						},
						trimAllSpace = function(str) {
							return str.replace(/\s+/g, "");
						},
						trimEnter = function(str) {
							return str.replace(/<\/?.+?>/g, "").replace(/[\r\n]/g, "");
						},
						checkName = function(value) {
							var validValue = trimScript(trimDoubleSpace(trimBothSideSpace(value)));
							if (validValue) {
								return value;
							} else {
								return false;
							};
						},
						checkEmail = function(value) {
							var emailPatten = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
								value = trimAllSpace(value);
							if (emailPatten.test(value)) {
								return value;
							} else {
								return false;
							};
						},
						checkMessage = function(value) {
							var validValue = trimScript(trimDoubleSpace(trimBothSideSpace(trimEnter(value))));
							if (validValue) {
								return value;
							} else {
								return false;
							};
						};
					return function() {
						$body.on('click.postMessage', '#form .submit', function() {
							var name = $name.val(),
								email = $email.val(),
								message = $message.val(),
								validName = checkName(name),
								validEmail = checkEmail(email),
								validMessage = checkMessage(message);
							if (validName && validEmail && validMessage) {
								Data.postMessage({
									data: {
										name: validName,
										email: validEmail,
										message: validMessage
									},
									beforeSend: Render.posting,
									success: Render.postSuccess,
									fail: Render.postFail
								});
							} else if (!validName) {
								Render.notValidName();
							} else if (!validEmail) {
								Render.notValidEmail();
							} else if (!validMessage) {
								Render.notValidMessage();
							};
						});
					};
				})(),
				bindContact = function() {
					$body.on('click.contact', '.about .contact', function() {
						Render.showForm();
					});
				};
			return {
				offScrollLoad: offScrollLoad,
				bindScrollLoad: bindScrollLoad,
				loadPosters: loadPosters,
				bind: function() {
					// bindScrollLoad();
					bindClickLoad();
					bindMouseWheel();
					bindViewControl();
					bindTransOriginSet();
					bindPostMessage();
					bindContact();
				}
			};
		})();

	return {
		init: (function() {
			var getUrlPara = function() {
				var url = location.search,
					theRequest = new Object();

				if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					strs = str.split("__");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
					};
				};
				return theRequest;
			};

			return function() {
				Render.appendCatagries(DATA_MAKER.catagries)
				var para = getUrlPara();
				if (para.c) {
					var catagry = para.c,
						page = para.p,
						name = para.n;
					Trigger.loadPosters($('li[catagry="' + catagry + '"]'), catagry, {
						catagry: catagry,
						page: page,
						name: name
					});
				} else {
					Trigger.loadPosters($('li[catagry="All"]'), 'All');
				};
				history.pushState ? history.pushState({
					view: 'posters'
				}, '', '') : '';

				Trigger.bind();
			};
		})()
	};

})();

POSTERLOVER.init();



var SHARE = (function() {
	var $win = $(window),
		$body = $('body'),
		windowPara = (function() {
			var width = 800,
				height = 550,
				left = $win.width() / 2 - width / 2,
				top = $win.height() / 2 - height / 2,
				para = 'width=' + width + ',height=' + height + ',screenX=' + left + ',screenY=' + top + '';
			return para;
		})(),


		bindShare = (function() {
			var pinterestShare = (function() {
					var calcGuid = function() {
						var guid = '';
						for (var i = 0; i < 12; i++) {
							guid += "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz".substr(Math.floor(60 * Math.random()), 1);
						};
						guid += '-1';
						return guid;
					};
					return function(url, imgUrl, description) {
						var shareUrl = 'https://www.pinterest.com/pin/create/button/?guid=' + calcGuid() + '&url=' + url + '&media=' + imgUrl + '&description=' + description,
							windowName = '';
						window.open(shareUrl, windowName, windowPara);
					};
				})(),
				facebookShare = (function() {
					var calcId = function() {
						// return 114545895322903;
					};
					return function(url) {
						var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url + '&display=popup&ref=plugin',
							windowName = '';
						window.open(shareUrl, windowName, windowPara);
					};
				})(),
				huabanShare = function(url, imgUrl, description, imgWidth, imgHeight) {
					var shareUrl = 'http://huaban.com/bookmarklet/?media=' + imgUrl + '&w=' + imgWidth + '&h=' + imgHeight + '&description=' + description + '&url=' + url + '&via=3&md=' + url,
						windowName = '';
					window.open(shareUrl, windowName, windowPara);
				},
				weiboShare = function(url, imgUrl, description) {
					var shareUrl = 'http://service.weibo.com/share/share.php?url=' + url + '&appkey=2499394483&pic=' + imgUrl + '&title=' + description,
						windowName = '';
					window.open(shareUrl, windowName, windowPara);
				};

			return function() {
				$body.on('click', '.share li', function() {
					var $this = $(this),
						$parent = $this.parent('ul'),
						$parents = $this.parents('.figure'),
						$img = $parents.children('img:first'),
						catagry = $('li[catagry].selected').attr('catagry'),
						page = $parents.attr('page'),
						posterName = $parents.attr('name'),
						url = location.origin + '/posterlover?c=' + catagry + '__p=' + page + '__n=' + posterName,
						description = posterName.replace(/  /g, ' ') + '-' + $parent.siblings('p').text(),
						imgUrl = location.origin+'/posterlover/'+$img.attr('src'),
						imgWidth = $img.width(),
						imgHeight = $img.height();
					switch ($this.text()) {
						case 'pinterest':
							pinterestShare(url, imgUrl, description);
							break;
						case 'facebook':
							facebookShare(url, imgUrl, description);
							break;
						case 'huaban':
							huabanShare(url, imgUrl, description, imgWidth, imgHeight);
							break;
						case 'weibo':
							weiboShare(url, imgUrl, description);
					};
				});
			};

		})();

	return {
		init: function() {
			bindShare();
		}
	};
})();

SHARE.init();