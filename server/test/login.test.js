import {login} from "../Controllers/Authentication/login";


    test("should'nt login",async()=>{
        const req = {body:{email:'',password:''}}
        const res = {json:jest.fn()}

        await login(req,res)
        expect(res.json).toHaveBeenCalledWith({ error: "Email and password both are required." })
    })

    test("should'nt login",async()=>{
        const req = {body:{email:'abcd@123.com',password:''}}
        const res = {json:jest.fn()}

        await login(req,res)
        expect(res.json).toHaveBeenCalledWith({ error: "Email and password both are required." })
    })

    test("should'nt login",async()=>{
        const req = {body:{email:'',password:'xyz'}}
        const res = {json:jest.fn()}

        await login(req,res)
        expect(res.json).toHaveBeenCalledWith({ error: "Email and password both are required." })
    })

    jest.mock('../db.js', () => ({
        connectToDb: jest.fn(() => ({
            collection: jest.fn(() => ({
                findOne: jest.fn(() => ({ // Mocking findOne to return a user object
                    email: 'rocky9@gmail.com',
                    password: '$2b$10$FmDCsXz4TKWZrG.e69AOh.pOYsjuq4Wu9b4Bl5XasbVs5jA36D7Nu', // Hashed password for "Rahul#1355"
                    _id: '123',
                    firstName: 'John',
                })),
            })),
        })),
      }));
      
      
      test('should generate token and return success message', async () => {
        const req = { 
            body: { email: "rocky9@gmail.com", password: "Rahul#1355" }, 
            session: {} // Mocking session object
        };
      
        const res = { 
            json: jest.fn(), 
            redirect: jest.fn() 
        };
      
        await login(req, res);
      
        // Expect success message
        expect(res.json).toHaveBeenCalledWith({ message: "Successfully logedIn", token: expect.any(String) });
      
        // Expect token to be set in session
        expect(req.session.token).toBeDefined();
      });
      