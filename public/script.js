document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', handleLikeClick);
        }
    });
});

async function handleLikeClick(event) {
    const button = event.currentTarget; 
    const postId = button.dataset.postId; 

    if (!postId) {
        console.error("Post ID missing from like button");
        return;
    }

    console.log(`Liking/unliking post ${postId}`);

    try {
        const response = await fetch(`/posts/${postId}/like`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json', 
            },
        });

        if (!response.ok) {
            console.error(`Server error liking post: ${response.status} ${response.statusText}`);
            alert('Could not update like status. Please try again.');
            return;
        }

        const result = await response.json(); 

        if (result.success) {
            const likesCountSpan = document.getElementById(`likes-count-${postId}`);
            const likeIcon = button.querySelector('svg'); // Find the SVG icon within the button

            if (likesCountSpan) {
                likesCountSpan.textContent = `${result.likesCount} ${result.likesCount === 1 ? 'like' : 'likes'}`;
            }

            if (likeIcon) {
                if (result.userLiked) {
                    button.classList.add('liked'); 
                     button.title = "Unlike";
                } else {
                    button.classList.remove('liked'); 
                     button.title = "Like";
                }
            }
        } else {
            console.error("Server reported failure:", result.message);
            alert(result.message || 'Failed to update like status.');
        }

    } catch (error) {
        console.error("Error sending like request:", error);
        alert('An error occurred. Please check your connection and try again.');
    }
}


if (!window.factScriptLoaded) { 
     window.factScriptLoaded = true;

     const factList = [
       "Israel systematically denies Palestinians in the occupied territories and parts of Israel access to clean and safe drinking water. Israel steals more than 80% of water in the occupied West Bank and expropriates it for use in illegal settlements, denying Palestinians access to water while supplying Israeli settlers with enough water to fill swimming pools, irrigate crops, and wash vehicles.",
       "During its establishment in 1948, the new state of Israel expropriated more than four million acres of land belonging to the approximately 750,000 Palestinians who were driven from their homes and made refugees, denying their internationally recognized legal right to return along with the thousands of others internally displaced inside Israel.",
       "In the occupied territories, the Israeli government and its settlers target Palestinian olive groves as a way to force Palestinians off their land. Since 1967, Israel has uprooted at least 2.5 million trees in the occupied territories, including nearly one million olive trees, which are a primary source of food and income for many Palestinians.",
       "During and after the 1948 war, which resulted in the establishment of Israel and the ethnic cleansing of Palestine (known in Arabic as the Nakba, or “catastrophe” in English), the Israeli military exiled many Palestinians to the Gaza Strip and denied them their right of return to their homes afterward.",
       "All Israeli settlements–whether located in East Jerusalem or other parts of the West Bank, or whether officially sanctioned by the government or not authorized–are illegal under international law.",
       "Israeli settlers, often backed by the army and state, frequently engage in violence against Palestinians by injuring and killing them, destroying their houses and uprooting their trees, and in general threatening and harassing them.",
     ];

     const factDisplay = document.getElementById("fact");
     const factButton = document.getElementById("factButton");
     let currentFactIndex = 0;

     if (factButton && factDisplay) {
         function displayFact() {
             factDisplay.textContent = factList[currentFactIndex];
             currentFactIndex = (currentFactIndex + 1) % factList.length; 
         }
         factButton.addEventListener("click", displayFact);
         if(factList.length > 0) {
              factDisplay.textContent = factList[0];
              currentFactIndex = 1 % factList.length; 
         }
     }
} 