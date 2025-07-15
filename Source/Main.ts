import './Globals'
import { Age, Email, GuardianTag, PersonName, StudentTag, UserTag } from "./Components"
import { ConsoleHttpPresenter } from "./Shared"
import { UpdatedStudentPresenterSystem, UpdateStudentSystem } from "./Systems"

const world = new World
const em = world.entityManager

const studentEntity = em.createEntity("student")
const userEntity = em.createEntity("user")
const guardianEntity = em.createEntity("guardian")

em.addComponent(studentEntity, new StudentTag)
const studentChildBuffer = em.addBuffer(studentEntity, ChildReference)

studentChildBuffer.push(new ChildReference(userEntity))
studentChildBuffer.push(new ChildReference(guardianEntity))

em.addComponent(userEntity, new UserTag)
em.addComponent(userEntity, new PersonName("Gabriel Medeiros Souza"))
em.addComponent(userEntity, new Email("gabriel@mail.com"))
em.addComponent(userEntity, new Age(27))

em.addComponent(guardianEntity, new GuardianTag)
em.addComponent(guardianEntity, new PersonName("Edmar Aparecida de Oliveira Medeiros Souza"))
em.addComponent(guardianEntity, new Email("edmar@mail.com"))
em.addComponent(guardianEntity, new Age(55))

world.systemManager.addSystem(new UpdateStudentSystem)
world.systemManager.addSystem(new UpdatedStudentPresenterSystem(new ConsoleHttpPresenter))
world.systemManager.executeSystems()
