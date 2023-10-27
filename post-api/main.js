import './style.css';
/* 
const posts = [
    {
        id: 1,
        title: 'Super Post',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae blanditiis voluptas voluptatem provident porro explicabo earum facere culpa recusandae neque ipsum ut, distinctio consectetur minus, rerum, consequatur maxime. Accusamus, recusandae.',
        author: 'Peter'
    },
    {
        id: 2,
        title: 'Mega Post',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae blanditiis voluptas voluptatem provident porro explicabo earum facere culpa recusandae neque ipsum ut, distinctio consectetur minus, rerum, consequatur maxime. Accusamus, recusandae.',
        author: 'Marianne'
    },
    {
        id: 3,
        title: 'Ultra Post',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae blanditiis voluptas voluptatem provident porro explicabo earum facere culpa recusandae neque ipsum ut, distinctio consectetur minus, rerum, consequatur maxime. Accusamus, recusandae.',
        author: 'Peter'
    },
];
 */

// Globale Variablen zum Steuern der Pagination
let actualPage = 1;
let pageSize = 10;

// Globale Referenz auf Post-Container
const postsContainer = document.querySelector('.blog-posts-container');


// Hole inital Blogdaten
const posts = await fetchBlogData();


// Render alle Posts
renderBlogPosts(posts, postsContainer);

/* 
    Hilfsfunktion zum Holen der BlogPost Daten von der API.
    ACHTUNG: Ist asynchron, sollte also als Promise verwendet werden.
*/
async function fetchBlogData() {
    try {
        // Frage BlogPost Daten an
        // const response = await fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_size=10');
        
        /* 
            Um die Ladezeiten etwas zu verkürzen, kann man mit Hilfe von
            query-Parametern, die die API zur Verfügung stellt, Pagination nutzen
            und die Ergebnisse auf 10 Einträge limitieren.
            Idealerweise lädt man nach Bedarf die nächsten 10 Einträge.
        */
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${actualPage}&_size=${pageSize}`);

        // Parse zurückgelieferten Body
        // Und gebe die geholten BlogPost-Daten zurück
        const posts = await response.json();

        // Hole für jeden Post den Usernamen zum Anzeigen
        const postsWithAuthor = posts.map(async post => {
            const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
            const user = await resp.json();

            return {
                ...post,
                // Füge Usernamen als Author-Feld zum Datensatz hinzu
                author: user.username
            };
        });

        /* 
            Da postsWithAuthor ein Array von Promises ist (async Callback),
            kann hier mit Hilfe der statischen Methode Promise.all(),
            aus einer Liste von Promises ein einziges gemacht werden,
            so dass man nun mit nur einem Promise auf die Fertigstellung
            aller Promises warten kann.
            So ist sichergestellt, dass die Authordaten bereits geladen wurden
            wenn die Posts gerendert werden.
         */
        return await Promise.all(postsWithAuthor);

    } catch (error) {
        // Fehler!
        console.error(error);

        // Gebe leeres Array zurück
        return [];
    }
}


/* 
    Funktion zum Rendern aller BlogPosts.
    Erhält die zu rendernden Daten sowie den Container
    als Parameter.
*/
function renderBlogPosts(postsData, container) {
    // Befülle den Post-Container mit Posts
    // anhand der Posts im Array
    // postsData.forEach(post => {
    //     // Erstelle neues Post-Element
    //     const blogArticle = createBlogArticle(post.title, post.body, post.author);

    //     // Füge neues Post-Element in Post-Container ein
    //     container.appendChild(blogArticle);
    // });

    /* 
        Alternativ:
        Erstelle ein Array der BlogPosts mittels Hilfsfunktion
        und füge diese alle auf einmal ein.
    */
    const blogPosts = createBlogPosts(postsData);

    // Lade-Indikator verstecken
    // const loadingIndicator = document.querySelector('.loading-indicator');
    // loadingIndicator.hidden = true;

    // Prüfe, ob es Daten zum Anzeigen gibt und rendere entsprechend
    if (blogPosts.length > 0) 
        // Vorhandene Kind-Elemente durch Blog Einträge ersetzen
        container.replaceChildren(...blogPosts);
    else {
        // Erstelle Leer-Indikator
        const nothingToShow = document.createElement('h3');
        nothingToShow.textContent = 'No data to show...';
        // Vorhandene Kind-Elemente durch Leer-Indikator ersetzen
        container.replaceChildren(nothingToShow);
    }
}

/* 
    Hilfsfunktion zum Erstellen eines Arrays von BlogPost-Elementen.
    Erhält die BlogPost Daten als Parameter.
*/
function createBlogPosts(postsData) {
    const blogPosts = postsData.map(post => {
        // Erstelle neues Post-Element
        return createBlogArticle(post.title, post.body, post.author);
    });

    return blogPosts;
}

/* 
    Hilfsfunktion zum Erstellen eines einzelnen BlogPost-Elements.
    Erhält den Titel, den Body und den Autor als Parameter.
*/
function createBlogArticle(title, body, author) {
    // Erstelle DOM-Element für den Article des Posts
    const blogPost = document.createElement('article');
    blogPost.className = 'blog-post';

    // Erstelle DOM-Element für den Titel
    const blogTitle = document.createElement('h3');
    blogTitle.className = 'blog-title';
    blogTitle.textContent = title;

    // Erstelle DOM-Element für den Body
    const blogBody = document.createElement('p');
    blogBody.className = 'blog-body';
    blogBody.textContent = body;

    // Erstelle DOM-Element für den Author
    const blogAuthor = document.createElement('p');
    blogAuthor.className = 'blog-author';
    blogAuthor.textContent = author;

    // Füge Kind-Element in den Article ein
    blogPost.append(blogTitle, blogBody, blogAuthor);

    // Gebe erstelltes Blog-Element als Rückgabewert zurück
    return blogPost;
}
