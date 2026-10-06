/* TTD Booking Seva - fixed demo authentication */
const CUSTOMER_USERS = [
{id:'TTD100001',name:'Aarav Reddy',email:'aarav1@example.com',seva:'Special Entry',date:'2026-10-01',time:'06:00 AM',status:'Confirmed',password:'TTD@100001'},
{id:'TTD100002',name:'Ananya Sharma',email:'ananya2@example.com',seva:'Sarva Darshan',date:'2026-10-02',time:'09:00 AM',status:'Confirmed',password:'TTD@100002'},
{id:'TTD100003',name:'Arjun Kumar',email:'arjun3@example.com',seva:'Divya Darshan',date:'2026-10-03',time:'11:00 AM',status:'Confirmed',password:'TTD@100003'},
{id:'TTD100004',name:'Diya Das',email:'diya4@example.com',seva:'Seva Darshan',date:'2026-10-04',time:'02:00 PM',status:'Pending',password:'TTD@100004'},
{id:'TTD100005',name:'Vivek Naidu',email:'vivek5@example.com',seva:'Special Entry',date:'2026-10-05',time:'04:00 PM',status:'Confirmed',password:'TTD@100005'},
{id:'TTD100006',name:'Kavya Rao',email:'kavya6@example.com',seva:'Sarva Darshan',date:'2026-10-06',time:'06:00 PM',status:'Confirmed',password:'TTD@100006'},
{id:'TTD100007',name:'Rahul Verma',email:'rahul7@example.com',seva:'Divya Darshan',date:'2026-10-07',time:'06:00 AM',status:'Confirmed',password:'TTD@100007'},
{id:'TTD100008',name:'Sneha Iyer',email:'sneha8@example.com',seva:'Seva Darshan',date:'2026-10-08',time:'09:00 AM',status:'Pending',password:'TTD@100008'},
{id:'TTD100009',name:'Rohan Patel',email:'rohan9@example.com',seva:'Special Entry',date:'2026-10-09',time:'11:00 AM',status:'Confirmed',password:'TTD@100009'},
{id:'TTD100010',name:'Priya Mishra',email:'priya10@example.com',seva:'Sarva Darshan',date:'2026-10-10',time:'02:00 PM',status:'Confirmed',password:'TTD@100010'},
{id:'TTD100011',name:'Aditya Reddy',email:'aditya11@example.com',seva:'Divya Darshan',date:'2026-10-11',time:'04:00 PM',status:'Confirmed',password:'TTD@100011'},
{id:'TTD100012',name:'Ishita Sharma',email:'ishita12@example.com',seva:'Seva Darshan',date:'2026-10-12',time:'06:00 PM',status:'Pending',password:'TTD@100012'},
{id:'TTD100013',name:'Kiran Kumar',email:'kiran13@example.com',seva:'Special Entry',date:'2026-10-13',time:'06:00 AM',status:'Confirmed',password:'TTD@100013'},
{id:'TTD100014',name:'Meera Das',email:'meera14@example.com',seva:'Sarva Darshan',date:'2026-10-14',time:'09:00 AM',status:'Confirmed',password:'TTD@100014'},
{id:'TTD100015',name:'Sanjay Naidu',email:'sanjay15@example.com',seva:'Divya Darshan',date:'2026-10-15',time:'11:00 AM',status:'Confirmed',password:'TTD@100015'},
{id:'TTD100016',name:'Pooja Rao',email:'pooja16@example.com',seva:'Seva Darshan',date:'2026-10-16',time:'02:00 PM',status:'Pending',password:'TTD@100016'},
{id:'TTD100017',name:'Varun Verma',email:'varun17@example.com',seva:'Special Entry',date:'2026-10-17',time:'04:00 PM',status:'Confirmed',password:'TTD@100017'},
{id:'TTD100018',name:'Nandini Iyer',email:'nandini18@example.com',seva:'Sarva Darshan',date:'2026-10-18',time:'06:00 PM',status:'Confirmed',password:'TTD@100018'},
{id:'TTD100019',name:'Harsha Patel',email:'harsha19@example.com',seva:'Divya Darshan',date:'2026-10-19',time:'06:00 AM',status:'Confirmed',password:'TTD@100019'},
{id:'TTD100020',name:'Lakshmi Mishra',email:'lakshmi20@example.com',seva:'Seva Darshan',date:'2026-10-20',time:'09:00 AM',status:'Pending',password:'TTD@100020'},
{id:'TTD100021',name:'Abhinav Reddy',email:'abhinav21@example.com',seva:'Special Entry',date:'2026-10-21',time:'11:00 AM',status:'Confirmed',password:'TTD@100021'},
{id:'TTD100022',name:'Bhavya Sharma',email:'bhavya22@example.com',seva:'Sarva Darshan',date:'2026-10-22',time:'02:00 PM',status:'Confirmed',password:'TTD@100022'},
{id:'TTD100023',name:'Chaitanya Kumar',email:'chaitanya23@example.com',seva:'Divya Darshan',date:'2026-10-23',time:'04:00 PM',status:'Confirmed',password:'TTD@100023'},
{id:'TTD100024',name:'Deepika Das',email:'deepika24@example.com',seva:'Seva Darshan',date:'2026-10-24',time:'06:00 PM',status:'Pending',password:'TTD@100024'},
{id:'TTD100025',name:'Gautham Naidu',email:'gautham25@example.com',seva:'Special Entry',date:'2026-10-25',time:'06:00 AM',status:'Confirmed',password:'TTD@100025'},
{id:'TTD100026',name:'Hema Rao',email:'hema26@example.com',seva:'Sarva Darshan',date:'2026-10-26',time:'09:00 AM',status:'Confirmed',password:'TTD@100026'},
{id:'TTD100027',name:'Jatin Verma',email:'jatin27@example.com',seva:'Divya Darshan',date:'2026-10-27',time:'11:00 AM',status:'Confirmed',password:'TTD@100027'},
{id:'TTD100028',name:'Keerthi Iyer',email:'keerthi28@example.com',seva:'Seva Darshan',date:'2026-10-28',time:'02:00 PM',status:'Pending',password:'TTD@100028'},
{id:'TTD100029',name:'Manoj Patel',email:'manoj29@example.com',seva:'Special Entry',date:'2026-10-29',time:'04:00 PM',status:'Confirmed',password:'TTD@100029'},
{id:'TTD100030',name:'Navya Mishra',email:'navya30@example.com',seva:'Sarva Darshan',date:'2026-10-30',time:'06:00 PM',status:'Confirmed',password:'TTD@100030'},
{id:'TTD100031',name:'Omkar Reddy',email:'omkar31@example.com',seva:'Divya Darshan',date:'2026-10-01',time:'06:00 AM',status:'Confirmed',password:'TTD@100031'},
{id:'TTD100032',name:'Pallavi Sharma',email:'pallavi32@example.com',seva:'Seva Darshan',date:'2026-10-02',time:'09:00 AM',status:'Pending',password:'TTD@100032'},
{id:'TTD100033',name:'Qadir Kumar',email:'qadir33@example.com',seva:'Special Entry',date:'2026-10-03',time:'11:00 AM',status:'Confirmed',password:'TTD@100033'},
{id:'TTD100034',name:'Riya Das',email:'riya34@example.com',seva:'Sarva Darshan',date:'2026-10-04',time:'02:00 PM',status:'Confirmed',password:'TTD@100034'},
{id:'TTD100035',name:'Siddharth Naidu',email:'siddharth35@example.com',seva:'Divya Darshan',date:'2026-10-05',time:'04:00 PM',status:'Confirmed',password:'TTD@100035'},
{id:'TTD100036',name:'Tanvi Rao',email:'tanvi36@example.com',seva:'Seva Darshan',date:'2026-10-06',time:'06:00 PM',status:'Pending',password:'TTD@100036'},
{id:'TTD100037',name:'Uday Verma',email:'uday37@example.com',seva:'Special Entry',date:'2026-10-07',time:'06:00 AM',status:'Confirmed',password:'TTD@100037'},
{id:'TTD100038',name:'Vaishnavi Iyer',email:'vaishnavi38@example.com',seva:'Sarva Darshan',date:'2026-10-08',time:'09:00 AM',status:'Confirmed',password:'TTD@100038'},
{id:'TTD100039',name:'Yash Patel',email:'yash39@example.com',seva:'Divya Darshan',date:'2026-10-09',time:'11:00 AM',status:'Confirmed',password:'TTD@100039'},
{id:'TTD100040',name:'Zoya Mishra',email:'zoya40@example.com',seva:'Seva Darshan',date:'2026-10-10',time:'02:00 PM',status:'Pending',password:'TTD@100040'},
{id:'TTD100041',name:'Akash Reddy',email:'akash41@example.com',seva:'Special Entry',date:'2026-10-11',time:'04:00 PM',status:'Confirmed',password:'TTD@100041'},
{id:'TTD100042',name:'Bhavana Sharma',email:'bhavana42@example.com',seva:'Sarva Darshan',date:'2026-10-12',time:'06:00 PM',status:'Confirmed',password:'TTD@100042'},
{id:'TTD100043',name:'Charan Kumar',email:'charan43@example.com',seva:'Divya Darshan',date:'2026-10-13',time:'06:00 AM',status:'Confirmed',password:'TTD@100043'},
{id:'TTD100044',name:'Divya Das',email:'divya44@example.com',seva:'Seva Darshan',date:'2026-10-14',time:'09:00 AM',status:'Pending',password:'TTD@100044'},
{id:'TTD100045',name:'Eshan Naidu',email:'eshan45@example.com',seva:'Special Entry',date:'2026-10-15',time:'11:00 AM',status:'Confirmed',password:'TTD@100045'},
{id:'TTD100046',name:'Farah Rao',email:'farah46@example.com',seva:'Sarva Darshan',date:'2026-10-16',time:'02:00 PM',status:'Confirmed',password:'TTD@100046'},
{id:'TTD100047',name:'Girish Verma',email:'girish47@example.com',seva:'Divya Darshan',date:'2026-10-17',time:'04:00 PM',status:'Confirmed',password:'TTD@100047'},
{id:'TTD100048',name:'Harini Iyer',email:'harini48@example.com',seva:'Seva Darshan',date:'2026-10-18',time:'06:00 PM',status:'Pending',password:'TTD@100048'},
{id:'TTD100049',name:'Imran Patel',email:'imran49@example.com',seva:'Special Entry',date:'2026-10-19',time:'06:00 AM',status:'Confirmed',password:'TTD@100049'},
{id:'TTD100050',name:'Uma Mishra',email:'uma50@example.com',seva:'Sarva Darshan',date:'2026-10-20',time:'09:00 AM',status:'Confirmed',password:'TTD@100050'}
];

const OWNER_USER = {
  email: "owner@ttdseva.demo",
  password: "Owner@123"
};

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function customerLogin(event) {
  if (event) event.preventDefault();

  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const messageEl = document.getElementById("loginMessage");

  const email = normalize(emailEl.value);
  const password = String(passwordEl.value ?? "").trim();

  const user = CUSTOMER_USERS.find(
    u => normalize(u.email) === email && u.password === password
  );

  if (!user) {
    messageEl.textContent = "Invalid email or password.";
    messageEl.className = "message error";
    return false;
  }

  localStorage.setItem("ttdRole", "customer");
  localStorage.setItem("ttdUser", JSON.stringify(user));
  window.location.href = "customer-dashboard.html";
  return false;
}

function ownerLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("loginMessage");

    /*
      Replace these with your actual owner credentials.
      Do NOT display them on the login page.
    */
    const OWNER_EMAIL = "owner@ttdseva.com";
    const OWNER_PASSWORD = "TTD@2026";

    if (email === OWNER_EMAIL && password === OWNER_PASSWORD) {

        localStorage.setItem("ttdOwnerLoggedIn", "true");

        message.textContent = "Login successful. Opening dashboard...";
        message.style.color = "#d4af37";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 700);

    } else {

        message.textContent = "Invalid email or password.";
        message.style.color = "#ff6b6b";
    }

    return false;
}

function ownerLogout() {
    localStorage.removeItem("ttdOwnerLoggedIn");
    window.location.href = "login.html";
}