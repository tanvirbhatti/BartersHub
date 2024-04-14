

const handleLogout = async (user,setUser,setModalOpen, toast, navigate, setIsLoggedIn) => {
      fetch(`${process.env.REACT_APP_API_SERVER}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      })
        .then(res=>res.json())
        .then(data => {
          if (data.clearToken) {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false)
            toast.success(data.message);
            setModalOpen(false);
            navigate('/')
          } else {
            toast.error(data.error)
            setModalOpen(false)            
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            navigate('/login')
          }
        })
        .catch(error => {
          console.error("Error during logout:", error);
          toast.error('Logout failed!');
          setModalOpen(false);
        });
    setModalOpen(true);
  };

export default handleLogout;