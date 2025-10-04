// Theme Management
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggle = document.getElementById('themeToggle');
            const html = document.documentElement;
            const sunIcon = document.getElementById('sunIcon');
            const moonIcon = document.getElementById('moonIcon');

            // Update icons based on current theme
            const currentTheme = localStorage.getItem('theme') || 'light';
            
            if (currentTheme === 'dark') {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }

            themeToggle.addEventListener('click', () => {
                html.classList.toggle('dark');
                
                if (html.classList.contains('dark')) {
                    localStorage.setItem('theme', 'dark');
                    sunIcon.classList.remove('hidden');
                    moonIcon.classList.add('hidden');
                } else {
                    localStorage.setItem('theme', 'light');
                    sunIcon.classList.add('hidden');
                    moonIcon.classList.remove('hidden');
                }
            });
        })

        // Name Management with Session Storage
        document.addEventListener('DOMContentLoaded', () => {
            const nameModal = document.getElementById('nameModal');
            const nameModalBtn = document.getElementById('nameModalBtn');
            const nameInput = document.getElementById('nameInput');
            const saveName = document.getElementById('saveName');
            const closeModal = document.getElementById('closeModal');
            const welcomeText = document.getElementById('welcomeText');

            // Check if name exists in session storage
            const savedName = sessionStorage.getItem('userName');
            
            if (savedName) {
                welcomeText.textContent = `Welcome back, ${savedName}! 👋`;
            }

            // Show modal
            nameModalBtn.addEventListener('click', () => {
                nameModal.classList.remove('hidden');
                if (savedName) {
                    nameInput.value = savedName;
                }
            });

            // Close modal
            closeModal.addEventListener('click', () => {
                nameModal.classList.add('hidden');
            });

            // Save name
            saveName.addEventListener('click', () => {
                const name = nameInput.value.trim();
                if (name) {
                    sessionStorage.setItem('userName', name);
                    welcomeText.textContent = `Welcome, ${name}! 👋`;
                    nameModal.classList.add('hidden');
                    
                    // Show success message
                    showNotification('Name saved successfully!');
                } else {
                    showNotification('Please enter your name', 'error');
                }
            });

            // Close modal when clicking outside
            nameModal.addEventListener('click', (e) => {
                if (e.target === nameModal) {
                    nameModal.classList.add('hidden');
                }
            });

            // Enter key to save name
            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveName.click();
                }
            });
        })

        // Notification function
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `fixed top-20 right-6 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
                type === 'success' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
            }`;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Smooth scroll for any future anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            observer.observe(section);
        });