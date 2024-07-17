from fastapi import FastAPI, Query
from typing import List, Optional
from pydantic import BaseModel, Field
from fastapi.staticfiles import StaticFiles
from datetime import datetime

app = FastAPI()

class Memo(BaseModel):
    id: int
    content: str

app.mount("/static", StaticFiles(directory="static", html=True), name="static")

memos = []

@app.post("/memo")
def create_memo(memo: Memo):
    memos.append(memo)
    return "메모를 저장했습니다."

@app.get("/memo", response_model=List[Memo])
def read_memos(sorted: Optional[str] = Query(None, enum=['ASC', 'DESC', 'TIME_ASC', 'TIME_DESC'])):
    if sorted == 'ASC':
        return sorted(memos, key=lambda x: x.content)
    elif sorted == 'DESC':
        return sorted(memos, key=lambda x: x.content, reverse=True)
    elif sorted == 'TIME_ASC':
        return sorted(memos, key=lambda x: x.created_at)
    elif sorted == 'TIME_DESC':
        return sorted(memos, key=lambda x: x.created_at, reverse=True)
    else:
        return memos  # 정렬 옵션이 없거나 잘못된 경우 기본 순서 반환