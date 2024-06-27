// Skill data
const skills = [
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", percentage: 90, description: "Proficient in creating structured and semantic web pages using HTML5.", certificate: "certificate-html.jpg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", percentage: 85, description: "Skilled in designing responsive and visually appealing web pages using CSS3.", certificate: "certificate-css.jpg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", percentage: 80, description: "Experienced in writing dynamic and interactive web applications using JavaScript.", certificate: "certificate-javascript.jpg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", percentage: 85, description: "Experienced in writing clean and efficient code in Python for various applications.", certificate: "Coursera XAWUKETQZNLM.jpg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", percentage: 75, description: "Skilled in developing robust backend systems with Java.", certificate: "certificate-java.jpg" },
    { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", percentage: 70, description: "Proficient in system-level programming with C.", certificate: "certificate-c.jpg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", percentage: 70, description: "Experienced in object-oriented programming with C++.", certificate: "certificate-cplusplus.jpg" },
    { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", percentage: 75, description: "Skilled in building applications with C#.", certificate: "certificate-csharp.jpg" }
];

// Function to populate skills section
function populateSkills() {
    const skillsList = document.querySelector('.skills-list'); // Select the skills list container

    skills.forEach(skill => {
        const skillItem = document.createElement('li'); // Create a list item for each skill
        skillItem.className = 'skill'; // Assign the 'skill' class to the list item

        // Set the inner HTML of the skill item
        skillItem.innerHTML = `
            <img src="${skill.logo}" alt="${skill.name}">
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <p class="certificate-text" data-certificate-url="${skill.certificate}">View Certificate</p>
        `;

        skillsList.appendChild(skillItem); // Append the skill item to the skills list
    });
}

// Initialize the skills section on page load
document.addEventListener('DOMContentLoaded', populateSkills); // Call populateSkills when the DOM content is loaded

// Event listener for certificate text clicks
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('certificate-text')) {
        const certificateUrl = event.target.getAttribute('data-certificate-url');
        window.open(certificateUrl, '_blank'); // Open certificate in a new tab
    }
});

// JavaScript to toggle the burger menu and nav-links
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        // Toggle the 'toggle' class on burger
        burger.classList.toggle('toggle');

        // Toggle the active class on nav-links
        navLinks.classList.toggle('active');
    });

    // Handle clicks on nav-links (for smaller screens)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // Hide the nav-links after clicking a link (for smaller screens)
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
});

const userRole = 'user'; // Set to 'owner' for owner privileges
    const currentUserId = generateUserId();
    
    document.addEventListener('DOMContentLoaded', loadRecommendations);
    
    function submitRecommendation() {
        const recommendationInput = document.getElementById('recommendation-input');
        const recommendationText = recommendationInput.value.trim();
    
        if (recommendationText !== '') {
            addRecommendation(recommendationText, currentUserId);
            saveRecommendation(recommendationText, currentUserId);
            recommendationInput.value = '';
            showPopup();
        }
    }
    
    function addRecommendation(text, userId, index = null) {
        const recommendationsList = document.getElementById('recommendations-list');
        const newRecommendation = document.createElement('li');
        newRecommendation.textContent = text;
        newRecommendation.setAttribute('data-user-id', userId);
    
        // Add delete button to each recommendation if current user is owner or the recommendation owner
        if (userRole === 'owner' || userId === currentUserId) {
            const deleteButton = document.createElement('span');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => deleteRecommendation(index !== null ? index : newRecommendation.index, userId);
    
            newRecommendation.appendChild(deleteButton);
        }
    
        recommendationsList.appendChild(newRecommendation);
    }
    
    function saveRecommendation(text, userId) {
        let recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
        recommendations.push({ text, userId });
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
        updateIndices();
    }
    
    function loadRecommendations() {
        let recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
        recommendations.forEach((rec, index) => addRecommendation(rec.text, rec.userId, index));
    }
    
    function updateIndices() {
        const recommendationsList = document.getElementById('recommendations-list').children;
        Array.from(recommendationsList).forEach((item, index) => {
            item.index = index;
        });
    }
    
    function deleteRecommendation(index, userId) {
        if (userRole !== 'owner' && currentUserId !== userId) {
            alert("You can only delete your own recommendations!");
            return;
        }
        
        let recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
        recommendations.splice(index, 1);
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
        refreshRecommendations();
    }
    
    function refreshRecommendations() {
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = '';
        loadRecommendations();
    }
    
    function generateUserId() {
        return userRole === 'owner' ? 'owner' : 'user-' + Date.now();
    }
    
    function showPopup() {
        document.getElementById('popup-overlay').style.display = 'block';
        document.getElementById('popup-box').style.display = 'block';
    }
    
    function closePopup() {
        document.getElementById('popup-overlay').style.display = 'none';
        document.getElementById('popup-box').style.display = 'none';
    }
