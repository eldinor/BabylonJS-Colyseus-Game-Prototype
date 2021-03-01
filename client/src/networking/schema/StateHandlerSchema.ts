import {Schema, type, MapSchema} from '@colyseus/schema';

import {PlayerDirectionSchema, PlayerKeySchema, PlayerPositionSchema, PlayerSchema} from './PlayerSchema';

export class StateHandlerSchema extends Schema {

    @type({map: PlayerSchema})
    players = new MapSchema<PlayerSchema>();

    addPlayer(sessionId: string) {
        this.players.set(sessionId, new PlayerSchema(sessionId));
    }

    getPlayer(sessionId: string): PlayerSchema {
        return this.players.get(sessionId);
    }

    removePlayer(sessionId: string) {
        this.players.delete(sessionId);
    }

    getPosition(sessionId: string): object {
        const pos = this.getPlayer(sessionId).playerPosition;
        return {'x': pos.x, 'y': pos.y, 'z': pos.z };
    }

    getDirection(sessionId: string): object {
        return {"rotationY": this.getPlayer(sessionId).playerDirection.rotationY}
    }

    setDirection(sessionId: string, direction: PlayerDirectionSchema) {
        this.getPlayer(sessionId).playerDirection.rotationY = direction.rotationY;
    }

    setKeys(sessionId: string, keys: PlayerKeySchema) {
        this.getPlayer(sessionId).playerKey.up = keys.up;
        this.getPlayer(sessionId).playerKey.right = keys.right;
        this.getPlayer(sessionId).playerKey.down = keys.down;
        this.getPlayer(sessionId).playerKey.left = keys.left;
        this.getPlayer(sessionId).playerKey.jump = keys.jump;
        this.getPlayer(sessionId).playerKey.crouch = keys.crouch;
    }

    setPosition(sessionId: string, position: PlayerPositionSchema) {
        this.getPlayer(sessionId).playerPosition.x = position.x;
        this.getPlayer(sessionId).playerPosition.y = position.y;
        this.getPlayer(sessionId).playerPosition.z = position.z;
    }
}
