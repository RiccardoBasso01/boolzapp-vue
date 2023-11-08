import { reactive } from "vue";
import { DateTime } from "luxon";

const contacts = [
    {
        id: 1,
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                id: 1,
                date: '15:30',
                message: 'Ciao! Come stai oggi?',
                status: 'sent'
            },
            {
                id: 2,
                date: '15:50',
                message: 'Ciao! Sono abbastanza bene, grazie. Ho appena finito di allenarmi in palestra. E tu?',
                status: 'received'
            },
            {
                id: 3,
                date: '16:15',
                message: 'Anch\'io sto bene, grazie. Ho visto un film fantastico ieri sera. Dovresti vederlo.',
                status: 'sent'
            },
            {
                id: 4,
                date: '16:16',
                message: 'Oh, davvero? Qual è il nome del film?',
                status: 'received'
            },
            {
                id: 5,
                date: '16:16',
                message: 'Si chiama "L\'Incredibile Avventura Spaziale." È un mix perfetto di azione e commedia. Penso che ti piacerà.',
                status: 'sent'
            },
            {
                id: 6,
                date: '16:17',
                message: 'Ottimo, lo metterò nella mia lista dei film da guardare.',
                status: 'received'
            },
            {
                id: 7,
                date: '16:17',
                message: 'Hai piani per il fine settimana?',
                status: 'received'
            },
            {
                id: 8,
                date: '16:18',
                message: 'Sì, ho in programma di fare una gita fuori città con la famiglia. Andremo a fare escursioni in montagna. E tu?',
                status: 'sent'
            },
            {
                id: 9,
                date: '16:18',
                message: 'E tu?',
                status: 'sent'
            },
            {
                id: 10,
                date: '16:18',
                message: 'Niente di speciale per il fine settimana. Forse uscirò con alcuni amici per una cena fuori.',
                status: 'received'
            },
            {
                id: 11,
                date: '16:20',
                message: 'Ah ok, assicurati di ordinare qualcosa di buono per me. Scherzo! Divertiti.',
                status: 'sent'
            },
            {
                id: 12,
                date: '16:22',
                message: 'Lo farò, grazie! E tu divertiti in montagna. Parleremo dopo il fine settimana.',
                status: 'received'
            },
            {
                id: 13,
                date: '16:23',
                message: 'Certamente. Buon fine settimana!',
                status: 'sent'
            },
            {
                id: 14,
                date: '16:25',
                message: 'Buona giornata anche a te!',
                status: 'received'
            },
            {
                id: 15,
                date: '16:25',
                message: 'Grazie',
                status: 'sent'
            },
        ],
    },
    {
        id: 2,
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                id: 1,
                date: '16:30',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                id: 2,
                date: '16:30',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                id: 3,
                date: '16:35',
                message: 'Mi piacerebbe ma devo andare a fare la spesa. Questo weekend ho tanti ospiti a casa',
                status: 'sent'
            }
        ],
    },
    {
        id: 3,
        name: 'Marco',
        avatar: '_3',
        visible: true,
        messages: [
            {
                id: 1,
                date: '10:30',
                message: 'Ciao Marco, come va?',
                status: 'sent'
            },
            {
                id: 2,
                date: '11:45',
                message: 'Ciao, tutto bene, grazie! E tu?',
                status: 'received'
            },
            {
                id: 3,
                date: '11:56',
                message: 'Tutto bene. Hai piani per il fine settimana?',
                status: 'sent'
            },
            {
                id: 4,
                date: '11:57',
                message: 'Sì, sto andando in campeggio con gli amici. E tu?',
                status: 'received'
            },
            {
                id: 5,
                date: '11:59',
                message: 'Vado al cinema. Divertiti nel campeggio!',
                status: 'sent'
            },
            {
                id: 6,
                date: '11:59',
                message: 'Anche tu!',
                status: 'received'
            }
        ],
    },
    {
        id: 4,
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
            {
                id: 1,
                date: '15:30',
                message: 'Sai qual è il segreto per fare una buona marmellata?',
                status: 'received'
            },
            {
                id: 2,
                date: '15:50',
                message: 'No, dimmi!',
                status: 'sent'
            },
            {
                id: 3,
                date: '15:52',
                message: 'Bisogna stare in confettato!',
                status: 'received'
            },
            {
                id: 4,
                date: '15:52',
                message: 'Ahah, quella è davvero buona! Hai sentito quella sul formaggio?',
                status: 'sent'
            },
            {
                id: 5,
                date: '15:53',
                message: 'No, dimmi!',
                status: 'received'
            },
            {
                id: 6,
                date: '15:53',
                message: 'Perché il formaggio non può mai andare a una festa?',
                status: 'sent'
            },
            {
                id: 7,
                date: '15:54',
                message: 'Perché?',
                status: 'received'
            },
            {
                id: 8,
                date: '15:54',
                message: ' Perché è sempre troppo provolone!',
                status: 'sent'
            },
            {
                id: 9,
                date: '15:54',
                message: 'Ahah, ho capito! E sai cosa fa un\'ape nell\'ultimo anno di scuola?',
                status: 'received'
            },
            {
                id: 10,
                date: '15:54',
                message: 'Non lo so, cosa fa?',
                status: 'sent'
            },
            {
                id: 11,
                date: '15:55',
                message: 'Fa il matur-ape!',
                status: 'received'
            },
            {
                id: 12,
                date: '15:55',
                message: 'Questa è da ridere! Mi hai fatto sorridere. Grazie per le battute!',
                status: 'sent'
            },
            {
                id: 13,
                date: '15:55',
                message: 'Figurati, è un piacere condividere un sorriso. Hai qualche altra battuta da raccontare?',
                status: 'received'
            },
            {
                id: 14,
                date: '15:56',
                message: 'Certo, come fa il calciatore a pulire il pavimento?',
                status: 'sent'
            },
            {
                id: 15,
                date: '16:00',
                message: 'Boh, come?',
                status: 'received'
            },
            {
                id: 16,
                date: '16:02',
                message: 'Con il calcio d\'angolo!',
                status: 'sent'
            },
            {
                id: 17,
                date: '16:02',
                message: 'Ahah, troppo divertente!',
                status: 'received'
            }
        ],
    },
    {
        id: 5,
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
            {
                id: 1,
                date: '15:30',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                id: 2,
                date: '15:50',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        id: 6,
        name: 'Sara',
        avatar: '_6',
        visible: true,
        messages: [
            {
                id: 1,
                date: '20:30',
                message: 'Ciao, come stai oggi?',
                status: 'received'
            },
            {
                id: 2,
                date: '20:50',
                message: 'Ciao Sara! Sto bene, grazie. E tu? Come è stata la tua giornata?',
                status: 'sent'
            },
            {
                id: 3,
                date: '20:51',
                message: 'La mia giornata è stata piuttosto impegnativa al lavoro, ma ora sono finalmente a casa e rilassata. Hai programmi per stasera?',
                status: 'received'
            },
            {
                id: 4,
                date: '20:51',
                message: 'Capisco, il lavoro può essere stressante. Per stasera, stavo pensando di cucinare qualcosa di speciale per cena. Hai qualche preferenza culinaria?',
                status: 'sent'
            },
            {
                id: 5,
                date: '20:51',
                message: 'Che idea fantastica! Mi piacerebbe la pasta, se non ti dispiace. Cosa hai in mente?',
                status: 'received'
            },
            {
                id: 6,
                date: '20:52',
                message: 'Perfetto, adoro cucinare la pasta. Sto pensando di preparare una deliziosa pasta al pesto con pomodorini secchi e pinoli. Come ti suona?',
                status: 'sent'
            },
            {
                id: 7,
                date: '20:52',
                message: 'Suona delizioso! Sarà un piacere mangiare una cena preparata da te.',
                status: 'received'
            },
            {
                id: 8,
                date: '20:53',
                message: 'Sono contento che ti piaccia l\'idea. Che ne dici se iniziamo a preparare la cena insieme? Potrebbe essere divertente.',
                status: 'sent'
            },
            {
                id: 9,
                date: '20:55',
                message: 'Mi sembra un\'ottima idea. Sarà divertente cucinare insieme e condividere del tempo di qualità. Grazie',
                status: 'received'
            },
            {
                id: 10,
                date: '21:01',
                message: 'Di niente, Sara. Sono felice che tu sia entusiasta. Prenderò gli ingredienti e inizieremo tra poco.',
                status: 'sent'
            },
            {
                id: 11,
                date: '21:01',
                message: 'Non vedo l\'ora! Sarà una serata fantastica.',
                status: 'received'
            },
            {
                id: 12,
                date: '21:02',
                message: 'Sicuramente, anche io non vedo l\'ora',
                status: 'sent'
            }
        ],
    },
    {
        id: 7,
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
            {
                id: 1,
                date: '15:30',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                id: 2,
                date: '15:50',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        id: 8,
        name: 'Giulia',
        avatar: '_8',
        visible: true,
        messages: [
            {
                id: 1,
                date: '15:30',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                id: 2,
                date: '15:50',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                id: 3,
                date: '15:51',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
]
const user = {
    name: 'Riccardo Basso',
    avatar: '_io'
}

export const store = reactive({
    user,
    contacts,
    currentContact: {},

    sectionChat: null,
    sectionChatList: null,

    isWriting: false,
    showSearchMessage: false,
    
    dateTime: DateTime.now().toLocaleString(DateTime.TIME_SIMPLE),
});