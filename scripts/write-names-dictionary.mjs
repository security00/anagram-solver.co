import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const given = `
aaron abbey abbie abby abdul abe abel abigail abraham ada adah adaline adam adan addie
addison adele aden adolfo adolph adonis adrian adriana adrienne agnes aida aileen aimee
ajay al alan alana alanna albert alberta alberto alden alec alecia alejandro alejandro
alessandra alex alexa alexander alexandra alexandre alexandria alexis alfred alfreda
alfredo ali alice alicia alina alisa alisha alison alissa aliyah allan allen allie allison
allyn allyson alma alonzo alphonso alta alton alvaro alvin alyce alyson alyssa amalia amanda
amari amaya amber amelia america amie amir amira amit amos amy ana anastasia anderson andre
andrea andreas andres andrew andy angel angela angelia angelica angelina angeline angelique
angelo angie anika anisa anita ann anna annabelle anne annemarie annetta annette annie
annika ansel anson anthony antoine anton antonia antonio antony anya april arabella aram
archie ariel ariana arianna aries arjun arlene arlie arlo armand armando armin arnold aron
arthur arturo aryana asha ashanti asher ashlee ashleigh ashley ashton asia aubrey audra
audrey august augustine augustus aurora austin autumn ava avery axel aya ayah ayla
bailey barbara barney barry bart barton bea beatrice beatrix beau becky belinda bella
ben benedict benjamin bennett bennie benny benson bentley bernard bernardo bernice bert
bertha beryl bess bessie beth bethany betsy bette bettie betty beulah beverly bianca bill
billie billy blair blake blanche blossom bob bobbi bobbie bobby bonita bonnie booker
boston boyd brad braden bradford bradley brady brandi brandie brandon brandy branson
braxton brenda brendan brenden brendon brenna brent bret brett brian briana brianna
brice bridget bridgette brielle britany britney britt britta brittaney brittany brittney
brock broderick brodie brody bronson brooke brooklyn bruce bruno bryant bryce brynn bryon
buck bud buddy buford bunny burl burt burton buster butch byron
cade caden caesar caitlin caitlyn cal caleb callie calvin cameron camila camilla camille
campbell candace candice candida candy cara carey carina carissa carl carla carlene carlo
carlos carlton carly carmela carmen carmine carol carole carolina caroline carolyn
carrie carroll carson carter cary caryl casey casper cassandra cassie catalina catherine
cathleen cathryn cathy cayden cecelia cecil cecile cecilia cedric celeste celia cesar
chad chance chandler chandra chanel chantal charlene charles charley charlie charlotte
charmaine chase chasity chauncey chelsea chelsie cheri cherice cherish cherry cheryl
chester chet cheyenne chiara chip chris christa christen christian christie christina
christine christopher christy chuck ciara cindy claire clara clare clarence clarice
clarissa clark claude claudia clay clayton clement cleo cliff clifford clifton clint
clinton clive clyde cody colby cole coleman colette colin collin colton columbus conner
connie connor conor conrad constance consuelo cooper cora coral corbin cordelia corey
corina corine corinne cornelia cornelius corrine cortney cory courtney coy craig crystal
curtis cynthia cyril cyrus
daisy dakota dale dallas dalton damian damien damion damon dan dana dane danial daniel
daniela danielle danny dante daphne darby darcy daren darian darie darien darlene darnell
darrel darrell darren darrin darryl darwin daryl dave david davin davis dawn dawson dax
dayton dean deana deandre deangelo deann deanna deanne deb debbie debora deborah debra
declan dee deena deidre deirdre dejan dela delbert delia della delores deloris delta
delvin demarco demetrius dena denis denise dennis denver deon derek derick derrick
deshawn desirae desiree desmond devan deven devin devon dewayne dewey dewitt dexter
diana diane diann dianna dianne diego dillon dina dinah dion dirk dixie dollie dolly
dolores domenic domingo dominic dominick dominique don donald donavan donna donnie donny
donovan dora doreen dorian doris dorothea dorothy dorthy doug douglas doyle drake drew
duane duncan dustin dusty dwain dwaine dwayne dwight dylan
earl earle eileen elaine elbert elena eli elias elijah elinor elisa elisabeth elise
elisha eliza elizabeth ella ellen ellie elliot elliott ellis elma elmer elmo eloise
elsa elsie elton elva elvin elvis elwood ely elyse emerson emery emil emile emilia
emilie emilio emily emma emmanuel emmett emory enrique eric erica erich erick ericka
erik erika erin erma ernest ernestine ernesto ernie errol ervin erwin esme esmeralda
esperanza essie esteban esther estrella ethan ethel etta eugene eugenia eunice eva
evan evangelina evangeline eve evelyn everett ezekiel ezra
fabian faith fallon fannie fanny farah farrah fatima fay faye federico felicia felipe
felix fern fernando fidel finley finn fiona fletcher flora florence florencio flossie
floyd flynn forrest foster fran frances francesca francine francis francisco frank
frankie franklin franklyn franz fred freda freddie freddy frederick fredrick freeman
freya frieda
gabriel gabriela gabriele gabriella gabrielle gail gale galen gareth garland garrett
garry garth gary gavin gayle gene geneva genevieve geoffrey george georgia georgina
gerald geraldine gerard gerardo gerry gertie gertrude gideon gilbert gilda gill gillian
gina ginger giovanni giselle gladys glen glenda glenn glennon gloria glyn glynis goldie
gordon grace gracie graciela grady graham grant granville greg gregg gregorio gregory
gretchen gretta griffin grover guadalupe guillermo gunnar gunter gus gustavo guy gwen
gwendolyn
hailey hal hale halee haleigh haley hallie hamish hank hannah hans harlan harley harmoni
harmony harold harper harriet harrison harry harvey hasan hassan hattie hayden haylee
hayley hazel heath heather hector heidi helen helena helene henrietta henry herb herbert
herman hermione hernando hilario hilda hillard hillary hiram holden hollie holly homer
hope horace hosea houston howard hoyt hubert huey hugh hugo humberto hunter hyman
ian ida ignacio ike imani imelda imogene ina india iones irene iris irma irvin irving
irwin isaac isabel isabela isabella isabelle isador isadora isai isaiah isaias ishmael
isidro isla ismael israel issac iva ivan ivey ivette ivory ivy izabella izzie
jacinda jack jackie jackson jacob jacoby jacque jacquelin jacqueline jacquelyn jada
jade jaiden jaime jaimie jake jakob jamaica james jameson jamie jamison jan jana jane
janelle janet janette janice janie janine janis jared jarred jarrett jarrod jarvis
jasmine jason jasper javier jax jaxson jay jaye jayden jayla jaylen jaylin jaylon
jayme jayne jayson jazmin jazmine jean jeanette jeanie jeanine jeanne jeannette
jeannie jed jefferson jeff jefferey jeffrey jeffry jenna jennifer jenny jensen
jeremiah jeremy jerome jerry jesse jessica jessie jesus jewel jewell jill jillian
jim jimmie jimmy jo joan joann joanna joanne joaquin jocelyn jodi jodie jody joe
joel joelle joesph joey johanna john johnathan johnathon johnnie johnny jon jonah
jonas jonathan jonathon joni jordan jordyn jorge jose josef josefa josefina joseph
josephine josh joshua josiah josie josue joy joyce juan juana juanita judah judd jude
judge judi judith judy jules julia julian juliana julianna julianne julie juliet
juliette julio julius june junior justin justine justus
kade kaden kaiden kaila kailee kailey kaitlin kaitlyn kaleb kali kameron kane
kara karen kari karin karina karissa karl karla karson karyn kasey kassandra kassie
kate katelin katelyn katelynn katharine katherine katheryn kathie kathleen kathrine
kathryn kathy katie katlyn katrina katy kay kaya kayla kaylee kayleigh kayley kaylie
kaylin keaton keegan keelan keely keenan keira keith kelley kelli kellie kelly kelsey
kelvin ken kendall kendra kenji kenna kenneth kenny kent kenya kenyon keri kerri kerry
kevin kiara kiera kieran kim kimberlee kimberley kimberly king kingston kira kirk
kirsten kirstin kitty kody kolby kole konner konnor korbin kory kris krishna krista
kristen kristi kristie kristin kristina kristine kristopher kristy krystal kurt
kurtis kyle kylee kylie kyra
lacey lacy ladonna lafayette lamar lamont lance landon lane laney lani larry lars
latasha latisha latonya latoya laura laurel lauren laurence lauri laurie laverne
lawrence layla layne layton lea leah leann leanna leanne lee leif leila leilani
leland lelia lemuel lena lenny leo leon leona leonard leonardo leonel leroy les
lesa lesley leslie lester leticia levi lewis lexie leyla lia liam lian liana
libby lidia lilah lilia lilian liliana lillian lillie lilly lily lincoln linda
lindsay lindsey lindy linwood lionel lisa lise liza lizbeth lizzie logan lois lola
lolita lon lonnie lora loraine lorena lorene lorenzo loretta lori lorie lorna
lorraine lotte lottie lou louella louie louis louisa louise lourdes luann lucas
lucia lucian luciana luciano lucien lucile lucille lucinda lucky lucy luella luigi
luis luisa luke lula lulu luther lydia lyla lyle lyman lynda lynette lynn lynne
lynton lynwood lyric
mable mac mack mackenzie maddie maddox madeleine madeline madelyn madison mae maeve
magda magdalena maggie mai maia maire maisie major makayla makenna malachi malcolm
maleah mali malik mallory malorie mamie mandi mandy manny manuel mara marcel marcela
marcelino marcellus marcia marco marcos marcus marcy margaret margarita margie margo
margot marguerite mari maria mariah marian mariana marianne maribel maricela marie
mariel mariela marilyn marilynn marina mario marion marisa marisol marissa maritza
marjorie mark markus marla marlene marlon marquis marquise marshall martha martin
martina marty marva marvin mary maryann maryanne maryellen maryjane mason mathew
matilda matt matthew mattie maura maureen maurice mavis max maxim maximilian maxine
maxwell may maya maynard mckayla mckenna mckenzie meagan meaghan megan meghan mekhi
melanie melinda melissa mellissa melody melvin mercedes mercy meredith merle merlin
mervin mia micah michael michaela micheal michel michele michelle mickey miguel
miguelangel mike milagros milan mildred miles miller millicent millie milo milton
mindy minh minnie miracle miranda mireya miriam mitch mitchell mitzi moe mohamed
mohammad mohammed moira mollie molly mona monica monique monroe monroe monroe
monserrat montana monte monty morgan morris morton moses moshe mossie mya myles
myra myrna myron myrtle
nadia nadine nancy nanette naomi natalia natalie nataly natasha nate nathalie nathan
nathanael nathaniel neal ned nehemiah neil nelda nell nelle nellie nelson nena nestor
nettie neva neverly nia nicholas nichole nick nickolas nicky nicolas nicole nigel
nikita nikki nikko niko nikos nina nita noah noel noelle nola nolan nona nora norah
norbert nora norene norma norris norton nova nowell numbers nydia
oakley ocean ocie octavia octavio odell odessa odis ofelia ok okie ola olaf olen olga
olin oliver olivia ollie omar omega omer ona ondrea oneida onie opal ophelia ora oral
oren orlando orrin orval orville oscar osvaldo oswald otis ottis otto owen
pablo paige palmer pam pamela pang pansy paola paris pasquale pat patience patrica
patrice patricia patrick patsy patti pattie patty paul paula paulette paulina pauline
payton pearl pearlie pearline pedro peg peggie peggy penelope pennie penny percival
percy perry pete peter petra phil philip phillip phoebe phoenix pierce pierre pink
pinkie piper polly porter precious preston price prince princess priscilla
queen quentin quincy quinn quintin quinton
rachael rachel rachelle rae raegan raheem rafael rafaela raina ralph ramiro ramon
ramona randal randall randi randolph randy raoul raphael raquel raul raven ray
rayford raymon raymond raymundo reagan reba rebecca rebekah reed reese regan
reggie regina reginald reid reilly reina rene renee reuben rex reyes reyna
rhea rhett rhiannon rhoda rhonda ricardo rich richard richelle richie rick
rickey ricky rico riley rita river rob robbie robby robert roberta roberto
robin robyn rocco rochelle rocky rod roderick rodger rodney rodolfo rodrigo
rogelio roger roland rolando rolland roman romeo ron ronald ronda roni ronnie
roosevelt rory rosa rosalia rosalie rosalind rosalinda rosalyn roanna rosanna
rosanne rosario rose roseann roseanne rosella rosemary rosetta rosie roslyn ross
rowan rowena roxana roxane roxanne roxie roy royal royce ruben rubin ruby rudolph
rudy rufus russell rusty ruth ruthie ryan ryder rylan rylee ryleigh riley
sadie sage salvador salvatore sam samantha samara sammie sammy samson samuel
sandra sandy sanford santiago santino santo santos sara sarah sarai sasha saul
savanna savannah sawyer scarlett schuyler scot scott scotty sean sebastian selena
selma serena sergio seth shana shane shania shanna shannon shanon shantel shaquille
shara shari sharon shaun shauna shawn shawna shay shayla shayne shea sheena sheila
shelby sheldon shelia shelly shelton sheree sheri sherman sherrie sherry sherwin
sherwood shirley shon shonda sid sidney sierra silas silver silvia simeon simon
simone siobhan sky skye skylar skyler sloan sloane socorro sofia solomon sonia
sonja sonny sony sonya sophia sophie spencer spring stacey staci stacie stacy
stan stanford stanley stanton starla stefan stefanie stella stephan stephanie
stephen sterling steve steven stevie stewart stone storm stormy stuart sue
summer sun sunny susan susana susanna susanne susie suzanne suzette suzie
sybil sydney sylvester sylvia
tabatha tania tanner tanya tara taryn tasha tate tatiana taurean tavares tavia
tavon taylor ted teddy teena tera terrance terrell terrence terri terrie terry
tess tessa thad thaddeus thamara thea thelma theo theodore theresa therese
theron thomas thornton tia tiana tiara tiffani tiffanie tiffany tillie tim
timmy timothy tina tisha titus tobias toby todd tom tomas tommie tommy toni
tonia tony tonya tory trace tracey traci tracie tracy travis trent trenton
tressa trevor trey tricia trina trinity troy trudy truman tucker tuesday twila
twyla tyler tyson
ula ulises ulysses una uriah uriel ursula
val valarie valencia valentin valentine valentino valeria valerie vallie van vance
vanessa vaughn velma vera vern verna verne vernon veronica vicki vickie vicky
victor victoria vida vince vincent vincenzo viola violet virgie virgil virginia
vita vito vivian viviana vivien
wade walker wallace wally walter walton wanda ward warner warren wayne wendell
wendy werner wesley weston whitney wilbert wilbur wiley wilford wilfred wilfredo
will willa willard william williams willie willis wilma wilson wilton winfred
winnie winnifred winona winston winter wm wonda woodrow woody wyatt
xander xavier ximena xiomara
yael yahir yesenia yessica yolanda yosef yoshio yousef ysabel yuliana yvette yvonne
zach zachariah zachary zachery zack zackary zahra zain zander zane zara zaria zavier
zelda zelma zena zion zoe zoey zola zona zora
`.trim().split(/\s+/);

const surnames = `
abbott acevedo acosta adams adkins aguilar aguirrre alexander ali allen allison alvarado
alvarez anderson andrade andrews anthony armstrong arnold arroyo asher atkins atkinson
austin avila ayala ayers bailey baird baker baldwin ball ballard banks barber barker
barnes barnett barr barraza barrett barron barry bartlett barton bass bates bauer
bautista baxter bean beasley beck becker bell bender benjamin bennett benson bentley
benton berg berger bernard berry best bird bishop black blackburn blackwell blair
blake blanc blanco bland blankenship blanchard bloom bobo bolton bond bonneau
booker boone booth bowen bowers bowman boyd boyer boyle bradford bradley bradshaw
brady branch brandt braun bray brennan brewer bridges briggs bright britt brock brooks
brown browning bruce bryan bryant buchanan buck buckley buckner bullock burch burgess
burke burnett burns burton bush butler byrd cabrera cain calderon caldwell calhoun
callahan camacho cameron campbell campos cannon cantu capps cardenas carey carlson
carpenter carr carrillo carroll carson carter case casey castaneda castillo castro
cervantes chambers chan chandler chaney chang chapman charles chase chavez chen
cherry christensen christian chung church cisneros clark clarke clay clayton clements
cline cobb cochran coffey cohen cole coleman collier collins colon combs compton
conley conner connor conrad contreras conway cook cooke cooley cooper copeland
cortez costa cowan cox craig crane crawford crosby cross cruz cuevas cummings
cunningham curry curtis dale dalton daniel daniels daugherty davenport david
davidson davies davila davis dawson day dean decker delacruz delacruz deleon
delgado dennis diaz dickerson dickson dillon dixon dodson dominguez donaldson
donovan dorsey dougherty douglas downs doyle drake duarte dudley duffy duke duncan
dunlap dunn duran durham dyer eaton edwards elliott ellis ellison erickson
escobar esparza espaillat espinosa espinoza estes estrada evans everett ewing
farley farmer farrell faulkner ferguson fernandez ferrell fields figueroa finch
finley fischer fisher fitzgerald fitzpatrick fleming fletcher flores flowers
floyd flynn foley forbes ford foster fowler fox francis franco frank franklin
frazier frederick freeman french frost fry frye fuentes fuller gaines gallagher
gallegos galloway gamble garcia gardner garner garrett garrison garza gates gavin
gay gentry george gibbs gibson giles gill gillespie gilliam gilmore glass glenn
glover goldberg golden gomez gonzales gonzalez goodman goodwin gordon gould
graham grant graves gray green greene greer gregory griffin griffith grimes
gross guerra guerrero gutierrez guzman haas hackett hagan hahn hale hale hall
hamilton hammond hampton haney hanna hansen hanson hardin harding hardy harmon
harper harrell harrington harris harrison hart hartman harvey hawkins hayden
hayes haynes hays heath hebert henderson hendricks hendrix henry hensley henson
herman hernandez herrera herring hess hester hickman hicks higgins hill hines
hinton ho hoover hopkins hopper horn horne horton house houston howard howe
howell huang hubbard huber hudson huerta huey huff hughes hull humphrey hunt
hunter hurley hurst hussein huston hutchinson hyde ingram irwin jackson jacobs
jacobson james jaquez jarvis jefferson jenkins jennings jensen jessup jimenez
johns johnson johnston jones jordan joseph joyce juarez justice kane kaufman
keith kelley kelly kemp kennedy kent kerr key khan kidd kim king kirby kirk
kirkland klein kline knox knox koch kramer lamb lambert lancaster landry lane
lang lange langley lara larsen larson lawrence lawson le leach leblanc lee
leon leonard lester levin levy lewis li lim lin lindsey little liu livingston
lloyd logan long lopez love lowe lowery lucas lucero luna lynch lynn lyons
macdonald macias mack madden maddox maldonado malone mann manning marks marquez
marsh marshall martin martinez mason massey mata mathews mathis matthews maxwell
may mayer maynard mayo mays mcbride mccall mccarthy mccarty mcclain mcclure
mcconnell mccormick mccoy mccray mccullough mcdaniel mcdonald mcdowell mcfarland
mcgee mcguire mcintosh mckenzie mckinney mclaughlin mclean mcmahon mcmillan mcneil
meadows medina mejia melendez melton mendez mendoza mercado mercer merritt meyer
meyers meza michael middleton miles miller mills miranda mitchell molina monroe
montgomery moon mooney moore morales moran moreno morgan morin morris morrison
morrow morse morton moses mosley moss mueller mullen mullins munoz murphy murray
myers nash navarro neal nelson newman newton nguyen nichols nicholson nielsen
nieves nixon noble nolan norman norris norton nunez obrien oconnell oconnor
odonnell odom oliver olsen olson oneal oneill orozco orr ortega ortiz osborne
owen owens pace pacheco padilla page palmer parker parkes parks parrish parsons
pate patel patrick patterson patton paul payne pearson peck pena peng pennington
perez perkins perry person peters peterson petty phelps phillips pickett pierce
pike pineda pittman pitts pitt pittman pollard poole pope porter potter potts
powell powers pratt preston price prince pruitt pugh quinn ramirez ramos ramsey
randall randolph rangel rasmussen ray raymond reed reese reeves reid reilly reyes
reynolds rhodes rice rich richard richards richardson richmond riddle riggs riley
rios rivas rivera rivers roach robbins roberson roberts robertson robinson robles
rocha rodgers rodriguez rodriquez rogers rojas rollins roman romero rosa rosales
rosario rose ross roth rowe rowland roy rubio ruiz rush russell russo ryan salazar
salinas salvador sampson sanchez sanders sandoval sanford santana santiago santos
sargent saunders savage sawyer schaefer schmidt schneider schroeder schultz
schwartz scott sellers serrano seth sexton shaffer shah shannon sharp shaw
sheldon shelton shepard shepherd sheppard sherman shields short siegel silva
simmons simon simpson sims singh singleton skinner slater sloan small smith
snow snyder solis solomon sosa soto sparks spears spence spencer stafford
stanley stanton stark steele stein stephens stephenson stevens stevenson
stewart stokes stone stout strickland strong stuart suarez sullivan summers
sumner sutton swanson sweeney sweet sykes talley tanner tate taylor terrell
terry thomas thompson thornton tillman todd torres townsend tran travis trevino
trujillo tucker turner tyler tyson underwood valdez valencia valentine valenzuela
valerie vance vang vaughan vaughn vazquez vega velasquez velazquez velez villarreal
villanueva vincent vines vincent vincent wade wagner walker wall wallace waller
walls walsh walter walters walton wang ward ware warner warren washington waters
watkins watson watts weaver webb weber webster weeks weiss welch wells west wheeler
whitaker white whitehead whitfield whitley whitney wiggins wilcox wilder wiley
wilkerson wilkins wilkinson william williams williamson willis wilson winters
wise witt wolf wolfe wong wood woodard woods woodward wooten workman wright
wu wyatt wynn yang yates yeager york young yu zamora zapata zarate zhang zimmerman
zhao zhou
`.trim().split(/\s+/);

const extra = `
shakespeare lincoln washington jefferson franklin napoleon einstein newton darwin
tesla edison picasso monet van gogh beethoven mozart chopin bach
`.trim().split(/\s+/).filter((word) => /^[a-z]+$/.test(word));

const words = [...new Set([...given, ...surnames, ...extra])]
  .map((word) => word.toLowerCase())
  .filter((word) => /^[a-z]+$/.test(word) && word.length >= 2)
  .sort();

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'dictionaries', 'names.txt');
writeFileSync(out, `${words.join('\n')}\n`, 'utf8');
console.log(`wrote ${words.length} names to ${out}`);
