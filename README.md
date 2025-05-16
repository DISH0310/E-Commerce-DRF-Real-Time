
This is a NextJS starter.

To get started, take a look at src/app/page.tsx.

JWT-based authentication with SimpleJWT

User registration, login, profile management, and order history



Steps for setting up and running the project:

1. Clone the Repository
Clone the project and navigate into the directory:
git clone https://github.com/DISH0310/E-Commerce-DRF-Real-Time.git
cd E-Commerce-DRF-Real-Time

2.Create and Activate a Virtual Environment
Create a virtual environment and activate it:
python -m venv env
source env/bin/activate        # On Windows: env\Scripts\activate

3. Install Dependencies
Install all required Python packages:
pip install -r requirements.txt

4. Configure PostgreSQL
Create a PostgreSQL database and user.

5. Run Redis Server
Ensure Redis is installed and running:
redis-server

6. Run Migrations
Apply migrations to set up the database schema:
python manage.py makemigrations
python manage.py migrate

7. Create a Superuser
Create an admin user to access the Django admin panel:
python manage.py createsuperuser

8. Start the Development Server
Start the Django development server:
python manage.py runserver

The API will be accessible at:
http://127.0.0.1:8000/api/

9. (Optional) Enable WebSockets for Real-Time Notifications
